"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RawFooter() {
  const section = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(bgRef.current, {
      scrollTrigger: {
        trigger: section.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.4,
      },
      yPercent: -8,
      ease: "none",
    });

    gsap.from(".f-reveal", {
      scrollTrigger: { trigger: section.current, start: "top 90%" },
      y: 16,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power2.out",
    });
  }, { scope: section });

  return (
    <footer ref={section} className="relative py-12 md:py-16 bg-dark border-t border-border-strong overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-[0.03]">
        <div
          className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop")' }}
        />
      </div>

      <div className="container relative z-10">
        <div className="f-reveal flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <a href="#" className="font-serif text-lg tracking-tight text-light">
            Raw<span className="text-accent">.</span>Select
          </a>

          <nav className="flex flex-wrap gap-8">
            {["Collection", "About", "Process", "Projects"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-cap text-muted/70 hover:text-light transition-colors duration-300"
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="flex gap-6">
            {["Instagram", "LinkedIn", "Pinterest"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-cap text-muted/60 hover:text-accent transition-colors duration-300"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="f-reveal mt-8 pt-8 border-t border-border-strong flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cap text-muted/60">
            &copy; 2026 Raw Select. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-cap text-muted/60 hover:text-muted transition-colors duration-300">
              Privacy
            </a>
            <a href="#" className="text-cap text-muted/60 hover:text-muted transition-colors duration-300">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
