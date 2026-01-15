function BlogCard({ post }) {
  return (
    <article className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors">
          Read article →
        </button>
      </div>
    </article>
  );
}

export default BlogCard;
