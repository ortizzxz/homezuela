import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Globe, ChevronDown } from "lucide-react"; // Added icons

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const langRef = useRef<HTMLDivElement>(null);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Buy", path: "/buy" },
    { name: "Rent", path: "/rent" },
    { name: "Sell", path: "/sell" },
    { name: "Find Realtors", path: "/realtors" },
    { name: "Blog", path: "/blog" },
  ];

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
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-sm font-medium text-gray-700 transition-all"
            >
              <Globe className="w-4 h-4 text-gray-500" />
              <span>{language === "EN" ? "English" : "Español"}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl border border-gray-200 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <button
                  onClick={() => { setLanguage("EN"); setLangOpen(false); }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${language === "EN" ? "text-blue-600 font-bold" : "text-gray-700"}`}
                >
                  English
                </button>
                <button
                  onClick={() => { setLanguage("ES"); setLangOpen(false); }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${language === "ES" ? "text-blue-600 font-bold" : "text-gray-700"}`}
                >
                  Español
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger button */}
        <div className="flex md:hidden items-center gap-4">
           {/* Mobile Lang Shortcut */}
           <button 
            onClick={() => setLanguage(language === "EN" ? "ES" : "EN")}
            className="text-xs font-bold text-gray-500 border border-gray-300 rounded px-2 py-1"
          >
            {language}
          </button>
          
          <button className="h-8 w-8 flex items-center justify-center" onClick={() => setOpen(!open)}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden border-t border-gray-200 bg-white transition-all overflow-hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col gap-1 px-4 py-3 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.name} to={item.path} className="rounded-lg px-3 py-2 hover:bg-gray-100">{item.name}</Link>
          ))}
          <div className="h-[1px] bg-gray-100 my-2" />
          <div className="flex justify-between items-center px-3 py-2">
            <span className="text-gray-500 uppercase text-[10px] font-bold">Language</span>
            <div className="flex gap-4">
               <button onClick={() => setLanguage("EN")} className={language === "EN" ? "text-blue-600 font-bold" : "text-gray-400"}>EN</button>
               <button onClick={() => setLanguage("ES")} className={language === "ES" ? "text-blue-600 font-bold" : "text-gray-400"}>ES</button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}