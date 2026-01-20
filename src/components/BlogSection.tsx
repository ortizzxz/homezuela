import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Inbox } from "lucide-react";
import BlogCard from "./BlogCard";
import type { Post } from "../types/blog";
import NewsletterCard from "./NewsletterCard";

export default function BlogPage() {
  const { i18n, t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const lang = i18n.resolvedLanguage?.substring(0, 2) || "en";

  // Categories with translated labels
  const categories = [
    { id: "all", label: t("blog.categories.all") },
    { id: "buying", label: t("blog.categories.buying") },
    { id: "selling", label: t("blog.categories.selling") },
    { id: "renting", label: t("blog.categories.renting") },
    { id: "investment", label: t("blog.categories.investment") },
    { id: "market", label: t("blog.categories.market_updates") },
  ];

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const response = await fetch(`/content/blog/${lang}/manifest.json`);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Error loading blog manifest:", err);
        setPosts([]);
      }
    };
    loadBlogData();
  }, [lang]);

  // Combined Filtering Logic
  const filteredArticles = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-5xl font-black text-gray-900 font-medium mb-4">
            {t("blog.hero_title")}
          </h1>
          <p className="ttext-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
            {t("blog.hero_subtitle")}
          </p>
        </div>
      </section>

      <div className="mx-auto px-4 py-8 lg:px-8">
        {/* Search and Filters Bar (Centered) */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-7xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t("blog.search_placeholder")}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-gray-900 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat.id
                    ? "bg-gray-900 text-white shadow-lg scale-105"
                    : "bg-white text-gray-500 border border-gray-200 hover:border-gray-400"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <motion.div
              key={selectedCategory + searchQuery + lang}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* --- INJECTED NEWSLETTER CARD --- */}
              <div className="md:col-span-1 lg:col-span-1">
                <NewsletterCard />
              </div>

              {/* --- ACTUAL BLOG POSTS --- */}
              {filteredArticles.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-gray-200"
            >
              <Inbox className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 text-xl font-medium">{t("blog.no_articles_found")}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

