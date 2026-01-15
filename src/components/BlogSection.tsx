import { useState } from "react";
import BlogCard from "./BlogCard";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Categories
  const categories = [
    { id: "all", label: "All Articles" },
    { id: "buying", label: "Buying" },
    { id: "selling", label: "Selling" },
    { id: "renting", label: "Renting" },
    { id: "investment", label: "Investment" },
    { id: "market", label: "Market Updates" },
  ];

  const caracasImage =
    "https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Collections/Production%20Library/30-12-2025_Wiki_Caracas.jpg/image1170x530cropped.jpg";

  // Sample articles with categories
  const allArticles = [
    { id: 1, title: "Buying Guide for Caracas", category: "buying" },
    { id: 2, title: "Investment Opportunities", category: "investment" },
    { id: 3, title: "Renting Tips", category: "renting" },
    { id: 4, title: "Caracas Market Overview", category: "market" },
  ];

  // Filter articles based on selected category
  const filteredArticles =
    selectedCategory === "all"
      ? allArticles
      : allArticles.filter((a) => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Slim Hero Banner */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="lg:w-1/2">
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl mb-2">
                Venezuela Real Estate Blog
              </h1>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">
                The biggest Venezuelan real estate magazine
              </p>
              <p className="text-lg text-gray-600 max-w-lg">
                Market insights and expert advice for buyers, sellers, and investors
              </p>
            </div>
            
            {/* Slim search */}
            <div className="lg:w-1/2">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="flex-1 bg-white px-4 py-3 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
                <button className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-black transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Content */}
          <main className="lg:col-span-8">
            
            {/* Category Filters */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      selectedCategory === category.id
                        ? "border-gray-900 text-gray-900 bg-gray-900/5 shadow-sm"
                        : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Article */}
            {filteredArticles[0] && (
              <article className="mb-8 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={caracasImage}
                    alt="Featured"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                      Featured
                    </span>
                    <h2 className="text-xl font-bold text-white mb-2 leading-tight">
                      {filteredArticles[0].title}
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <span>Maria Gonzalez</span>
                      <span>•</span>
                      <span>Jan 15, 2026</span>
                      <span>•</span>
                      <span>8 min read</span>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Article Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {filteredArticles.slice(1).map((article, i) => (
                <BlogCard
                  key={i}
                  post={{
                    id: article.id,
                    title: article.title,
                    excerpt: "Latest insights from Venezuela's capital real estate market...",
                    author: "Maria Gonzalez",
                    date: "Jan 12, 2026",
                    readTime: "5 min read",
                    imageUrl: caracasImage,
                  }}
                />
              ))}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Newsletter Signup */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h3>
              <p className="text-sm text-gray-600 mb-4">
                Weekly market insights in your inbox
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
                <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-black transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular</h3>
              <div className="space-y-3">
                {filteredArticles.slice(1).map((article, i) => (
                  <div key={i} className="flex gap-3 p-2 -m-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-16 h-12 flex-shrink-0 rounded overflow-hidden">
                      <img src={caracasImage} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-500">Jan 12 • 5 min</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
