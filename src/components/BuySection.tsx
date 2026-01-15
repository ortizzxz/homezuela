import { useState } from "react";
import ListingCard from "./ListingCard";
import { fakeListings } from "../const/FakeListings";
import SearchFilters from "./SearchFilters";

export default function BuySection() {
  const [filteredListings, setFilteredListings] = useState(fakeListings);

  const handleSearch = (filters: any) => {
  let results = fakeListings;

  if (filters.type) {
    results = results.filter((l) => l.type === filters.type);
  }

  if (filters.beds) {
    const minBeds = parseInt(filters.beds);
    results = results.filter((l) => l.beds >= minBeds);
  }

  if (filters.price) {
    const [min, max] = filters.price.split("-").map(Number);
    results = results.filter((l) => {
      const price = l.price
      return price >= min && price <= max;
    });
  }

  if (filters.location) {
    const search = filters.location.toLowerCase();
    results = results.filter(
      (l) =>
        l.city.toLowerCase().includes(search) ||
        l.neighborhood.toLowerCase().includes(search)
    );
  }

  setFilteredListings(results);
};


  return (
    <section className="w-full bg-gray-50">
      <div className="mx-auto">
        {/* Filters Component */}
        <SearchFilters onSearch={handleSearch} />

        {/* Results Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-2 mb-4 gap-4 px-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">{filteredListings.length} homes</p>
            <p className="text-sm text-gray-600">Matching your search in Venezuela</p>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 px-8 py-3 rounded-xl text-lg font-semibold text-gray-900 hover:shadow-lg hover:border-gray-300 transition-all">
            Load more homes
          </button>
        </div>
      </div>
    </section>
  );
}
