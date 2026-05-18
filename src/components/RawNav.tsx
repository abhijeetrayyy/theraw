"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Collection", href: "#collection" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
];

export default function RawNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-dark/85 backdrop-blur-xl border-b border-border"
            : "py-6 md:py-8 bg-gradient-to-b from-dark/50 to-transparent"
        }`}
      >
        <div className="container flex items-center justify-between">
          <a href="#" className="font-serif text-lg md:text-xl tracking-tight text-light">
            Raw<span className="text-accent">.</span>Select
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-cap text-muted/80 hover:text-light transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 border border-border-strong text-cap text-accent hover:bg-accent hover:text-dark transition-all duration-300"
          >
            Get in Touch
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center"
            aria-label="Menu"
          >
            <span className={`block w-5 h-[1.5px] bg-light rounded transition-all duration-300 absolute ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`block w-5 h-[1.5px] bg-light rounded transition-all duration-300 absolute ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-dark/95 backdrop-blur-xl transition-all duration-500 md:hidden flex items-center justify-center ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-10">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-serif text-3xl text-light/70 hover:text-light transition-all duration-500"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(24px)",
                transitionDelay: open ? `${i * 80 + 100}ms` : "0ms",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 px-6 py-3 border border-border-strong text-cap text-accent hover:bg-accent hover:text-dark transition-all duration-300"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(24px)",
              transitionDelay: open ? `${links.length * 80 + 140}ms` : "0ms",
            }}
          >
            Get in Touch
          </a>
        </nav>
      </div>
    </>
  );
}
