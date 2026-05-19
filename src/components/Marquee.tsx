"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  "Stone", "Porcelain", "Sintered Stone", "Natural Slabs", "Metals",
  "Lacquers", "Textures", "Patinas", "Modular Systems", "Architectural Hardware",
  "Integrated Components", "Custom Solutions", "Bespoke Materials",
];

export default function Marquee() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = section.current?.querySelector(".marquee-track");
      if (!track) return;

      gsap.to(track, {
        xPercent: -50,
        duration: 60,
        ease: "none",
        repeat: -1,
      });

      // Speed up on scroll
      ScrollTrigger.create({
        trigger: section.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          gsap.to(track, {
            duration: 0.3,
            ease: "power2.out",
            x: `+=${self.getVelocity() / 300}`,
          });
        },
      });
    });
  }, { scope: section });

  return (
    <section ref={section} className="relative bg-bg-2 overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vw, 6rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="divider" />
      <div className="overflow-hidden">
        <div className="marquee-track flex items-center" style={{ gap: "clamp(3rem, 6vw, 5rem)" }}>
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-6 shrink-0">
              <span className="t-h3 text-text/20 whitespace-nowrap">{item}</span>
              <span className="w-2 h-2 rounded-full bg-accent/30 shrink-0" />
            </div>
          ))}
        </div>
      </div>
      <div className="divider" />
    </section>
  );
}
