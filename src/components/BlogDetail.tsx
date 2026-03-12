import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronLeft, Calendar, User, Share2, Clock } from "lucide-react";

export default function BlogDetail() {
    const { slug } = useParams();
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const [content] = useState("");
    const lang = i18n.resolvedLanguage?.substring(0, 2) || "en";
    const [title, setTitle] = useState<string | null>(null);
    const [body, setBody] = useState("");
    const [meta, setMeta] = useState<any>(null);

    // Scroll Progress Bar Logic
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Fetch manifest first
                const manifestPath = `/content/blog/${lang}/manifest.json`;
                const metaRes = await fetch(manifestPath);
                if (metaRes.ok) {
                    const manifest: any[] = await metaRes.json();
                    const postMeta = manifest.find((p: any) => p.slug === slug);
                    if (postMeta) setMeta(postMeta);
                }

                // Fetch MD content
                const mdRes = await fetch(`/content/blog/${lang}/${slug}.md`);
                if (!mdRes.ok) throw new Error("Post not found");
                const text = await mdRes.text();

                const lines = text.split("\n");
                if (lines[0]?.startsWith("# ")) {
                    setTitle(lines[0].replace(/^# /, "").trim());
                    setBody(lines.slice(1).join("\n").trim());
                } else {
                    setTitle(null);
                    setBody(text);
                }
            } catch (err) {
                navigate("/blog");
            }
            window.scrollTo(0, 0);
        };

        fetchPost();
    }, [slug, lang, navigate]);

    useEffect(() => {
        if (body || content) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [body, content]);

    const components = {
        h1: ({ node, ...props }: any) => (
            <h1
                className="
                    text-4xl md:text-5xl font-black tracking-tight text-gray-900
                    mb-6 md:mb-8
                "
                {...props}
            />
        ),
        h2: ({ node, ...props }: any) => (
            <h2
                className="
                    text-2xl md:text-3xl font-semibold tracking-tight text-gray-900
                    mt-10 mb-4
                "
                {...props}
            />
        ),
        h3: ({ node, ...props }: any) => (
            <h3
                className="
                    text-xl md:text-2xl font-bold tracking-tight text-gray-900
                    mt-8 mb-4
                "
                {...props}
            />
        ),
        p: ({ node, ...props }: any) => (
            <p className="text-lg"
                {...props}
            />
        ),
        blockquote: ({ node, ...props }: any) => (
            <blockquote
                className="
                    border-l-4 border-black/90 pl-6 py-4 my-8
                    text-gray-900 text-lg md:text-xl font-medium
                    bg-linear-to-r from-black/2 to-transparent
                    rounded-r-2xl shadow-sm
                "
                {...props}
            />
        ),
        code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            if (!inline && match) {
                return (
                    <pre
                        className="
                            rounded-2xl bg-slate-950/95 text-slate-100 px-6 py-4
                            overflow-x-auto text-sm leading-relaxed
                            border border-slate-800/50 shadow-2xl
                            backdrop-blur-sm
                        "
                    >
                        <code className="font-mono block" {...props}>
                            {children}
                        </code>
                    </pre>
                );
            }
            return (
                <code
                    className="
                        bg-gray-100/80 rounded-lg px-2 py-1 text-sm font-mono
                        border border-gray-200
                    "
                    {...props}
                >
                    {children}
                </code>
            );
        },
        table: ({ node, ...props }: any) => (
            <div className="overflow-x-auto">
                <table
                    className="
                        w-full border-collapse bg-white rounded-2xl
                        shadow-xl border border-gray-200
                    "
                    {...props}
                />
            </div>
        ),
        th: ({ node, ...props }: any) => (
            <th className="border border-gray-200 bg-gray-50 px-4 py-3 text-left font-bold text-gray-900" {...props} />
        ),
        td: ({ node, ...props }: any) => (
            <td className="border border-gray-200 px-4 py-3 text-gray-700" {...props} />
        ),
        a: ({ node, ...props }: any) => (
            <a
                className="
                    font-semibold text-gray-900 underline decoration-gray-300
                    underline-offset-4 decoration-2 hover:text-black 
                    hover:decoration-black transition-all duration-200
                "
                {...props}
            />
        ),
        img: ({ node, ...props }: any) => (
            <img
                className="
                    rounded-3xl shadow-2xl border-4 border-white
                    hover:shadow-3xl transition-shadow duration-300
                    max-w-full h-auto mx-auto block
                "
                {...props}
            />
        ),
        ul: ({ node, ...props }: any) => (
            <ul
                className="
                list-disc pl-6 my-6 space-y-2
                text-lg text-gray-800
                marker:text-gray-500
                "
                {...props}
            />
        ),
        ol: ({ node, ...props }: any) => (
            <ol
                className="
                list-decimal pl-6 my-6 space-y-2
                text-lg text-gray-800
                marker:text-gray-500
                "
                {...props}
            />
        ),
        li: ({ node, ...props }: any) => (
            <li
                className="
                leading-relaxed
                pl-1
                "
                {...props}
            />
        )
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-[#fafafa] to-[#f0f0f0]">
            {/* Sticky Progress Bar & Top Nav */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-linear-to-r from-gray-900 to-black origin-left z-50 shadow-lg"
                style={{ scaleX }}
            />

            <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100/50 px-6 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <button
                        onClick={() => navigate("/blog")}
                        className="group flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-tighter hover:text-black transition-colors cursor-pointer"
                    >
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
                        {t('blog.back_to_magazine')}
                    </button>
                </div>
            </nav>

            {/* cinematic Hero Section */}
            <header className="pt-4 px-6">
                <div className="max-w-5xl mx-auto">
                    {meta?.imageUrl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="mx-auto mb-12 overflow-hidden rounded-3xl shadow-2xl max-w-4xl w-full aspect-3/1"
                        >
                            <img
                                src={meta.imageUrl}
                                alt={title || ""}
                                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                            />
                        </motion.div>
                    )}

                    <div className="text-center">
                        {meta && (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-wrap justify-center items-center gap-6 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-8"
                            >
                                <span className="flex items-center gap-2">
                                    <User size={14} className="text-gray-900" />
                                    {meta.author}
                                </span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                <span className="flex items-center gap-2">
                                    <Calendar size={14} className="text-gray-900" />
                                    {meta.date}
                                </span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                <span className="flex items-center gap-2">
                                    <Clock size={14} className="text-gray-900" />
                                    {meta.readTime}
                                </span>
                            </motion.div>
                        )}

                        {title && (
                            <div
                                className="text-2xl md:text-6xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-4
                                leading-[0.9] md:leading-[0.88] bg-linear-to-r from-gray-900 to-black bg-clip-text"
                            >
                                {title}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* 3. Main Content Area */}
            <main className="max-w-5xl mx-auto px-6 pb-32">
                <div className="relative">
                    {/* Enhanced background card */}
                    <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_50px_140px_rgba(15,23,42,0.15)]" />

                    <article>
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                            {body || content}
                        </ReactMarkdown>
                    </article>
                </div>
            </main>

            {/*  Related Posts Section Placeholder */}
            {/* <section className="max-w-7xl mx-auto px-6 pb-24 text-center">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400 mb-16">
                    Continue Reading
                </h3>
            </section> */}
        </div>
    );
}
