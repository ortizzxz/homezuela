export default {
    theme: {
        extend: {
            fontFamily: {
                galano: ["Galano", "sans-serif"],
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: "65ch",
                        color: "#111827",
                        a: {
                            color: "#393d47",
                            fontWeight: "600",
                            textDecoration: "none",
                            borderBottom: "1px solid rgba(17,24,39,0.15)",
                            transition: "border-color 150ms, color 150ms",
                            "&:hover": {
                                color: "#000000",
                                borderBottomColor: "#111827",
                            },
                        },
                        h1: {
                            fontWeight: "900",
                            letterSpacing: "-0.04em",
                        },
                        h2: {
                            fontWeight: "800",
                            letterSpacing: "-0.03em",
                        },
                        code: {
                            backgroundColor: "#f3f4f6",
                            padding: "0.15rem 0.35rem",
                            borderRadius: "0.375rem",
                            fontSize: "0.9em",
                        },
                        "pre code": {
                            backgroundColor: "transparent",
                            padding: "0",
                            borderRadius: "0",
                        },
                        pre: {
                            backgroundColor: "#0f172a",
                            color: "#e5e7eb",
                            borderRadius: "0.75rem",
                            padding: "1rem 1.25rem",
                            boxShadow: "0 18px 45px rgba(15,23,42,0.45)",
                        },
                        blockquote: {
                            borderLeftColor: "#000000",
                            fontStyle: "normal",
                            fontWeight: "500",
                        },
                        "ul > li::marker": {
                            color: "#111827",
                        },
                        "ol > li::marker": {
                            color: "#111827",
                        },
                        img: {
                            borderRadius: "1.5rem",
                            boxShadow: "0 24px 80px rgba(15,23,42,0.35)",
                        },
                    },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
