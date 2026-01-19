import { useState } from "react";
import { DollarSign, Home, BedDouble, Bath, MapPin, Image as ImageIcon, Sparkles } from "lucide-react";
import type { Listing } from "../const/FakeListings";

interface CreateListingFormProps {
  onSubmit: (data: Omit<Listing, "id" | "isNew"> & { imageFiles?: File[] }) => Promise<void> | void;
}

const PROPERTY_TYPES = ["house", "flat", "land/terrain", "other"];

export function CreateListingForm({ onSubmit }: CreateListingFormProps) {
  const [form, setForm] = useState<Omit<Listing, "id" | "isNew"> & { imageFiles: File[] }>({
    title: "",
    price: 0,
    beds: 0,
    baths: 0,
    sqft: 0,
    city: "",
    neighborhood: "",
    imageFiles: [],
    type: "house",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = <K extends keyof typeof form>(key: K, value: typeof form[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSuccess(false);
    setError(null);
  };

  const handleNumberChange = (key: "price" | "beds" | "baths" | "sqft", value: string) => {
    const numeric = Number(value.replace(/[^\d]/g, ""));
    handleChange(key, isNaN(numeric) ? 0 : (numeric as any));
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleChange("imageFiles", files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!form.title.trim()) return setError("Please add a clear title for your listing.");
    if (!form.city.trim()) return setError("City is required.");
    if (!form.price || form.price <= 0) return setError("Price must be greater than 0.");
    if (form.imageFiles.length === 0) return setError("Please upload at least one image.");

    try {
      setIsSubmitting(true);
      await onSubmit(form);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Could not publish your property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-10 px-4 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1 rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-medium tracking-[0.16em] uppercase text-white">
              <Sparkles className="w-3 h-3" />
              Advertise your property
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-semibold text-slate-900">
              Publish your listing in a few steps
            </h1>
            <p className="mt-1.5 text-sm text-slate-500 max-w-xl">
              Add your property details and reach buyers instantly. You can always edit your listing later.
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end text-xs text-slate-500">
            <span>Average completion time: 2–3 minutes</span>
            <span className="text-emerald-600 font-medium">No payment required to publish</span>
          </div>
        </div>

        {/* Card */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-3xl blur-2xl opacity-60 pointer-events-none" />
          <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/70 px-5 py-6 sm:px-7 sm:py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic info */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Listing title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/60"
                    placeholder="Bright 3-bedroom apartment with balcony"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Type
                  </label>
                  <div className="flex flex-wrap gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1">
                    {PROPERTY_TYPES.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => handleChange("type", t)}
                        className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm transition whitespace-nowrap flex items-center gap-1 ${
                          form.type === t
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        <Home className="w-3.5 h-3.5" />
                        {t === "land/terrain" ? "Land / Terrain" : t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Price
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                    <DollarSign className="w-4 h-4 text-slate-400 mr-1.5" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={form.price ? form.price.toString() : ""}
                      onChange={(e) => handleNumberChange("price", e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                      placeholder="e.g. 350000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Square feet
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.sqft ? form.sqft.toString() : ""}
                    onChange={(e) => handleNumberChange("sqft", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/60"
                    placeholder="e.g. 120"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Bedrooms
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                    <BedDouble className="w-4 h-4 text-slate-400 mr-1.5" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={form.beds ? form.beds.toString() : ""}
                      onChange={(e) => handleNumberChange("beds", e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                      placeholder="e.g. 3"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Bathrooms
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                    <Bath className="w-4 h-4 text-slate-400 mr-1.5" />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={form.baths ? form.baths.toString() : ""}
                      onChange={(e) => handleNumberChange("baths", e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                      placeholder="e.g. 2"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="sm:col-span-3">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Upload Images
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                    <ImageIcon className="w-4 h-4 text-slate-400 mr-1.5" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFilesChange}
                      className="w-full text-sm text-slate-900 outline-none"
                    />
                  </div>
                  {form.imageFiles.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {form.imageFiles.map((file, idx) => (
                        <img
                          key={idx}
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${idx + 1}`}
                          className="w-24 h-24 object-cover rounded-xl border border-slate-200"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    City
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                    <MapPin className="w-4 h-4 text-slate-400 mr-1.5" />
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                      placeholder="Berlin"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Neighborhood
                  </label>
                  <input
                    type="text"
                    value={form.neighborhood}
                    onChange={(e) => handleChange("neighborhood", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/60"
                    placeholder="e.g. Mitte"
                  />
                </div>
              </div>

              {/* Messages */}
              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
                  Your property has been submitted. You can now review it in your dashboard.
                </p>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                <p className="text-xs text-slate-500">
                  By publishing, you confirm that you own the rights to this property and the information is accurate.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black disabled:opacity-70 disabled:cursor-not-allowed transition"
                >
                  {isSubmitting ? "Publishing..." : "Publish listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
