import { fakeListings } from "../const/FakeListings";
import ListingCard from "./ListingCard";

function RecentListings() {
  return (
    <section className="w-full bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              New listings
            </h2>
            <p className="text-sm text-gray-600">
              Fresh homes recently added to Homezuela.com
            </p>
          </div>
          <button className="hidden text-sm font-medium text-blue-700 hover:underline md:inline">
            View all
          </button>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fakeListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* Mobile "View all" */}
        <div className="mt-4 flex justify-center md:hidden">
          <button className="text-sm font-medium text-blue-700 hover:underline">
            View all
          </button>
        </div>
      </div>
    </section>
  );
}


export default RecentListings;