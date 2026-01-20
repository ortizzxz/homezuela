import { Inbox } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function NewsletterCard() {
  const { t } = useTranslation();
  return (
    <div className="h-full bg-gray-900 rounded-[32px] p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Inbox className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-medium font-black leading-tight mb-4">
          {t("blog.newsletter_title")}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          {t("blog.newsletter_desc")}
        </p>
      </div>

      <div className="relative z-10 space-y-3">
        <input
          type="email"
          placeholder="email@example.com"
          className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-2xl outline-none focus:ring-2 focus:ring-white/30 transition-all placeholder:text-gray-500"
        />
        <button className="w-full bg-white text-gray-900 py-4 rounded-2xl font-black hover:bg-gray-100 active:scale-[0.98] transition-all">
          {t("blog.subscribe")}
        </button>
      </div>

      {/* Decorative background flare */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
    </div>
  );
}