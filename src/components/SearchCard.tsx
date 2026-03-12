import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SearchCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!city.trim()) return;

    navigate(`/buy?city=${encodeURIComponent(city)}`);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-5">
      <form
        className="flex flex-col gap-2 md:flex-row"
        onSubmit={handleSubmit}
      >
        <div className="flex-1">
          <label
            htmlFor="hero-search"
            className="mb-1 block text-xs font-medium text-gray-600"
          >
            {t("search_card.search_bar_placeholder")}
          </label>

          <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2">
            <input
              id="hero-search"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Caracas, Valencia, Maracaibo..."
              className="w-full border-none bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        <div className="flex items-end md:pl-2">
          <button
            type="submit"
            className="mt-1 inline-flex w-full items-center justify-center rounded-sm bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 hover:cursor-pointer md:mt-0 md:w-auto md:min-w-[120px]"
          >
            {t("search_card.find_properties")}
          </button>
        </div>
      </form>

      <p className="mt-2 text-[11px] text-gray-500">
        {t("search_card.search_tip")}
      </p>
    </div>
  );
}

export default SearchCard;