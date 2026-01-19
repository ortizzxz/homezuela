import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSwitcher() {
  // 1. Destructure i18n from the hook
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 2. Force a re-render when language changes
  // This ensures that "currentLangCode" is always fresh
  const currentLangCode = i18n.resolvedLanguage?.substring(0, 2).toLowerCase() || "en";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 group ${
          isOpen ? "bg-gray-100 shadow-inner" : "hover:bg-gray-50"
        }`}
      >
        <Globe
          size={16}
          className={`transition-colors duration-200 ${
            isOpen ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"
          }`}
        />
        {/* Changed logic here to use resolvedLanguage */}
        <span className="text-sm font-bold text-gray-800 tracking-tight uppercase">
          {currentLangCode}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform duration-300 ease-out ${
            isOpen ? "rotate-180 text-gray-900" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 origin-top-right overflow-hidden"
          >
            <div className="px-4 py-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Select Language
              </span>
            </div>

            {languages.map((lang) => {
              const isSelected = currentLangCode === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={async () => {
                    await i18n.changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all ${
                    isSelected
                      ? "bg-gray-50 text-gray-900 font-black" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
                  }`}
                >
                  <span className="tracking-tight">{lang.label}</span>
                  {isSelected && (
                    <motion.div layoutId="activeCheck">
                      <Check size={16} strokeWidth={3} className="text-gray-900" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}