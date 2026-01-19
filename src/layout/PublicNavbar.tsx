import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function PublicNavbar() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const [open, setOpen] = useState(false);
  const navItems = [
    { name: "Buy", path: "/buy" },
    { name: "Rent", path: "/rent" },
    { name: "Sell", path: "/sell" },
    { name: "Find Realtors", path: "/realtors" },
    { name: "Blog", path: "/blog" },
  ];


  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => setCurrentLang(lng);
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);


  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <span className="text-2xl font-semibold tracking-tight">
            Home<span className="bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 bg-clip-text text-transparent">zuela</span>.com
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex h-full items-stretch text-sm font-medium text-gray-600 ml-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative px-4 flex items-center hover:text-black transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop right buttons */}
        <div className="hidden md:flex h-full items-center gap-2">
          <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors">
            Log in
          </Link>
          <Link to="/advertise" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors">
            Advertise
          </Link>

          {/* Divider */}
          <div className="h-4 w-[1px] bg-gray-300 mx-2" />

          {/* Language Dropdown */}
          <div className="relative ml-2">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile hamburger button area */}
        <div className="flex md:hidden items-center gap-4">
          {/* Mobile Lang Shortcut: Toggles between EN and ES */}
          <button
            onClick={() =>
              i18n.changeLanguage(currentLang.startsWith("en") ? "es" : "en")
            }
            className="text-[10px] font-bold text-gray-600 border border-gray-300 rounded-md px-2 py-1 uppercase tracking-wider active:bg-gray-100"
          >
            {currentLang.startsWith("es") ? "EN" : "ES"}
          </button>

          <button
            className="h-8 w-8 flex items-center justify-center text-gray-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden border-t border-gray-200 bg-white transition-all overflow-hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col gap-1 px-4 py-3 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-gray-100"
            >
              {item.name}
            </Link>
          ))}

          <div className="h-[1px] bg-gray-100 my-2" />

          {/* Language Selection Row */}
          <div className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-gray-400" />
              <span className="text-gray-500 uppercase text-[10px] font-bold tracking-widest">Language</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-3 py-1 rounded-md text-xs transition-all ${i18n.language.startsWith('en') ? "bg-gray-900 text-white font-bold" : "text-gray-400 font-medium"}`}
              >
                English
              </button>
              <button
                onClick={() => i18n.changeLanguage('es')}
                className={`px-3 py-1 rounded-md text-xs transition-all ${i18n.language.startsWith('es') ? "bg-gray-900 text-white font-bold" : "text-gray-400 font-medium"}`}
              >
                Español
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}