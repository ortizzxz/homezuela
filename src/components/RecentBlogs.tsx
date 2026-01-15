import BlogCard from "./BlogCard";

const fakeBlogPosts = [
  {
    id: 1,
    title: "Caracas real estate market update 2026",
    excerpt: "Prices stabilizing in Altamira and La Castellana after last year's volatility...",
    author: "Maria Gonzalez",
    date: "Jan 10, 2026",
    readTime: "5 min read",
    imageUrl: "https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Collections/Production%20Library/30-12-2025_Wiki_Caracas.jpg/image1170x530cropped.jpg",
  },
  {
    id: 2,
    title: "Top 5 neighborhoods for first-time buyers in Valencia",
    excerpt: "Discover affordable family homes in El Viñedo and nearby areas...",
    author: "Carlos Rivera",
    date: "Jan 8, 2026",
    readTime: "4 min read",
    imageUrl: "https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Collections/Production%20Library/30-12-2025_Wiki_Caracas.jpg/image1170x530cropped.jpg",
  },
  {
    id: 3,
    title: "Investment opportunities in Maracaibo rentals",
    excerpt: "High rental yields in Bella Vista make it perfect for passive income...",
    author: "Ana Morales",
    date: "Jan 5, 2026",
    readTime: "6 min read",
    imageUrl: "https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Collections/Production%20Library/30-12-2025_Wiki_Caracas.jpg/image1170x530cropped.jpg",
  },
];

function RecentBlogs() {
  return (
    <section className="w-full bg-white py-12 border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            Latest from our blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Market insights, buying tips, and neighborhood guides from Venezuela's 
            top real estate experts.
          </p>
        </div>

        {/* Blog grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {fakeBlogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            View all articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default RecentBlogs;