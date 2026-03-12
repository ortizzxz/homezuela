import { useNavigate } from "react-router-dom";
import { fakeBlogPosts } from "../const/FakeBlogPosts";
import BlogCard from "./BlogCard";




function RecentBlogs() {
  const navigate = useNavigate();

  function handleArticlesClick() {
    navigate('/blog');
  }

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
        <div className="flex justify-center mt-4">
          <button className="inline-flex items-center gap-2 bg-gray-100 px-8 py-3 rounded-sm text-sm border border-gray-200 hover:bg-gray-200 hover:border-gray-300 transition cursor-pointer"
            onClick={handleArticlesClick}
          >
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