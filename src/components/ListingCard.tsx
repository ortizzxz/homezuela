import { useTranslation } from "react-i18next";
import type { Listing } from "../const/FakeListings";

interface ListingProps {
  listing: Listing;
}

function ListingCard({ listing }: ListingProps) {
  const { t } = useTranslation();

  const typeTranslations: Record<string, string> = {
    SFH: "listing_card.sfh",
    Apartment: "listing_card.apartment",
    Condo: "listing_card.condo",
  };

  const translationKey = typeTranslations[listing.type] || listing.type;

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {listing.isNew && (
          <span className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-white">
            New
          </span>
        )}
      </div>

      {/* Property type */}
      <div className="mt-1 flex items-center gap-2 p-2">
        {/* Blue dot */}
        <span className="h-2 w-2 rounded-full bg-blue-500 inline-block"></span>
        {/* Text */}
        <span className="text-sm text-gray-700">{t(translationKey)}</span>
      </div>

      {/* Content */}
      <div className="space-y-1 p-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-2xl text-gray-900">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(listing.price)}
          </p>
          <p className="text-[14px] text-gray-800">
            {listing.city}
          </p>
        </div>

        <p className="truncate text-sm text-gray-800">
          {listing.neighborhood}
        </p>

        <div className="mt-1 flex flex-wrap gap-3 text-md text-gray-900">
          <span>
            <span className="font-semibold text-lg text-black">{listing.beds}</span> bd
          </span>
          <span>
            <span className="font-semibold text-lg text-black">{listing.baths}</span> ba
          </span>
          <span>
            <span className="font-semibold text-lg text-black">{listing.sqft}</span> m²
          </span>
        </div>
      </div>
    </article>
  );
}

export default ListingCard;
