import { useState } from "react";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Buy", path: "/buy" },
    { name: "Sell", path: "/sell" },
    { name: "Rent", path: "/rent" },
    { name: "Mortgage", path: "/mortgage" },
    { name: "Home Values", path: "/home-values" },
    { name: "Find Realtors", path: "/realtors" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header className="w-full border-b border-gray-200">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-2">
            <span className="text-2xl tracking-tight">
              Home
              <span className="bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 bg-clip-text text-transparent">
                zuela
              </span>
              .com
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex h-full items-stretch text-sm font-medium text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative h-full px-4 flex items-center hover:text-black transition-colors
                         after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
                         after:bg-black after:transition-all after:duration-200
                         hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop right buttons */}
        <div className="hidden md:flex h-full items-center gap-4">
          <Link
            to="/login"
            className="relative h-full px-4 flex items-center text-sm font-medium text-gray-700 hover:text-black transition-colors
                       after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
                       after:bg-black after:transition-all after:duration-200
                       hover:after:w-full"
          >
            Log in
          </Link>
          <Link
            to="/advertise"
            className="relative h-full px-4 flex items-center text-sm font-medium text-gray-800 hover:text-black transition-colors
                       after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
                       after:bg-black after:transition-all after:duration-200
                       hover:after:w-full"
          >
            Advertise
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <div className="flex md:hidden">
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded"
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle menu</span>
            {open ? (
              <svg
                className="h-5 w-5 text-gray-800"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-800"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden border-t border-gray-200 bg-white transition-[max-height,opacity] duration-200 
                    ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <nav className="flex flex-col gap-1 px-4 py-3 text-sm font-medium text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className="w-full rounded-lg px-3 py-2 text-left hover:bg-gray-100 hover:text-black transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="w-full rounded-lg px-3 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/advertise"
            onClick={() => setOpen(false)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-800 hover:bg-gray-100 transition-colors"
          >
            Advertise
          </Link>
        </nav>
      </div>
    </header>
  );
}
