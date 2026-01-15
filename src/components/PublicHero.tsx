import SearchCard from "./SearchCard";

function PublicHero() {
  return (
    <section className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:py-14">
        {/* Left: text */}
        <div className="flex-1 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
            #1 trusted Venezuelan real estate market
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Find your next home in{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 bg-clip-text text-transparent">
              Venezuela
            </span>
            .
          </h1>
          <p className="max-w-xl text-sm text-gray-600 md:text-base">
            Discover apartments, houses, and investments across all major
            Venezuelan cities, backed by verified listings and local experts.
          </p>
        </div>

        {/* Right: search card */}
        <div className="flex-1">
          <SearchCard /> 
        </div>
      </div>
    </section>
  );
}

export default PublicHero;
