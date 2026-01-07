"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"fun" | "boring">("boring");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("site-mode");
    const initial = saved === "fun" ? "fun" : "boring";
    setMode(initial);
    document.documentElement.dataset.mode = initial;
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "fun" ? "boring" : "fun";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("site-mode", next);
        document.documentElement.dataset.mode = next;
      }
      return next;
    });
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-transparent border-b border-transparent">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold gradient-text">
            Portfolio
          </Link>

          {/* Desktop Navigation + Mode Toggle */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={toggleMode}
              className="text-sm font-medium text-slate-100 hover:text-blue-300 transition-colors"
            >
              {mode === "fun" ? "Fun Mode" : "Boring Mode"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-0.5 bg-slate-900 dark:bg-slate-100"></div>
            <div className="w-6 h-0.5 bg-slate-900 dark:bg-slate-100"></div>
            <div className="w-6 h-0.5 bg-slate-900 dark:bg-slate-100"></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleMode}
              className="mt-2 text-sm font-medium text-slate-100 hover:text-blue-300 transition-colors"
            >
              {mode === "fun" ? "Fun Mode" : "Boring Mode"}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
