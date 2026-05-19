"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Collection", href: "#collection" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Cookie Settings", href: "#" },
];

export default function Footer() {
  const footer = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Floating accents
    gsap.utils.toArray(".foot-float").forEach((f, i) => {
      gsap.to(f as Element, { y: `random(-30, 30)`, x: `random(-15, 15)`, rotation: `random(-10, 10)`, duration: `random(4, 7)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.5 });
    });

    // Entrance timeline
    const tl = gsap.timeline({ scrollTrigger: { trigger: footer.current, start: "top 85%" } });

    // Divider line draws
    tl.fromTo(".foot-divider", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut", transformOrigin: "left" }, 0);

    // Brand letters animate in one by one
    tl.fromTo(".foot-brand-letter", { y: "100%", opacity: 0, rotateX: -60 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.04, duration: 0.9, ease: "power3.out" }, 0.1);

    // Tagline fades up
    tl.fromTo(".foot-tagline", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.4);

    // Nav columns stagger in
    tl.fromTo(".foot-col", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out" }, 0.3);

    // Nav links stagger within each column
    gsap.utils.toArray(".foot-link").forEach((link) => {
      gsap.fromTo(link as Element, { x: -15, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out", scrollTrigger: { trigger: link as Element, start: "top 90%" } });
    });

    // Bottom bar
    tl.fromTo(".foot-bottom", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.8);

    // Hover effects on nav links
    gsap.utils.toArray(".foot-link").forEach((link) => {
      const el = link as HTMLElement;
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { x: 6, duration: 0.3, ease: "power2.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, duration: 0.3, ease: "power2.out" });
      });
    });
  }, { scope: footer });

  return (
    <footer id="contact" ref={footer} className="relative bg-bg-2 overflow-hidden">
      {/* Floating accents */}
      <div className="foot-float absolute top-[15%] right-[10%] w-16 h-16 rounded-full border border-accent/10 pointer-events-none" />
      <div className="foot-float absolute bottom-[20%] left-[8%] w-12 h-12 rounded-full bg-accent-dim pointer-events-none" />

      <div style={{ paddingTop: "clamp(6rem, 12vw, 12rem)" }}>
        <div className="wrap">
          {/* Top divider */}
          <div className="foot-divider w-full h-[1px] bg-text-08 origin-left" style={{ marginBottom: "clamp(6rem, 12vw, 12rem)" }} />

          {/* Brand section */}
          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(4rem, 8vw, 8rem)", marginBottom: "clamp(6rem, 12vw, 12rem)" }}>
            <div className="lg:col-span-5">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-text leading-tight" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
                {"RAW SELECT".split("").map((l, i) => (<span key={i} className="foot-brand-letter inline-block">{l === " " ? "\u00A0" : l}</span>))}
              </h2>
              <p className="foot-tagline t-body-lg text-text-30 max-w-sm">Curated materials for architects and designers who refuse to compromise.</p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(3rem, 6vw, 4rem)" }}>
              {/* Navigation */}
              <div className="foot-col">
                <span className="t-label text-accent block" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>Navigate</span>
                <div className="space-y-4">
                  {navLinks.map((link, i) => (
                    <a key={i} href={link.href} className="foot-link block text-text-50 hover:text-text transition-colors duration-300 text-sm">{link.label}</a>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="foot-col">
                <span className="t-label text-accent block" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>Contact</span>
                <div className="space-y-4 text-sm text-text-50">
                  <p>hello@rawselect.com</p>
                  <p>+45 12 34 56 78</p>
                  <p>Copenhagen, Denmark</p>
                </div>
              </div>

              {/* Social */}
              <div className="foot-col">
                <span className="t-label text-accent block" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>Follow</span>
                <div className="space-y-4">
                  {["Instagram", "LinkedIn", "Pinterest"].map((s, i) => (
                    <a key={i} href="#" className="foot-link block text-text-50 hover:text-text transition-colors duration-300 text-sm">{s}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="foot-bottom flex flex-col md:flex-row justify-between items-center" style={{ paddingTop: "clamp(3rem, 6vw, 4rem)", borderTop: "1px solid var(--color-text-08)" }}>
            <p className="text-xs text-text-30">&copy; {new Date().getFullYear()} Raw Select. All rights reserved.</p>
            <div className="flex items-center" style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)", marginTop: "clamp(1rem, 2vw, 1.5rem)" }}>
              {legalLinks.map((link, i) => (
                <a key={i} href={link.href} className="foot-link text-xs text-text-30 hover:text-text transition-colors duration-300">{link.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
