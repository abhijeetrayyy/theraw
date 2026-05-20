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

const itemsRow2 = [
  "Curated", "Selected", "Tested", "Approved", "Specified", "Delivered", "Installed", "Elevated",
];

const itemsRow3 = [
  "Precision", "Intention", "Quality", "Performance", "Durability", "Aesthetic", "Craft", "Detail",
];

export default function Marquee() {
  const section = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const track3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Entrance animation
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
      },
    });

    entranceTl.fromTo(".marquee-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0);
    entranceTl.fromTo(".marquee-heading", { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, 0.2);
    entranceTl.fromTo(".marquee-track, .marquee-track-2, .marquee-track-3", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.4);

    mm.add("(min-width: 1024px)", () => {
      // Row 1 - forward
      if (trackRef.current) {
        const track = trackRef.current;
        gsap.to(track, {
          xPercent: -50,
          duration: 50,
          ease: "none",
          repeat: -1,
        });

        ScrollTrigger.create({
          trigger: section.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());
            const speedBoost = velocity / 200;
            gsap.to(track, {
              duration: 0.3,
              ease: "power2.out",
              x: `+=${speedBoost}`,
            });
            const opacityBoost = Math.min(0.6, velocity / 400);
            gsap.to(track.querySelectorAll("span"), {
              color: `rgba(26, 26, 26, ${0.15 + opacityBoost})`,
              duration: 0.3,
            });
          },
        });

        track.querySelectorAll("span").forEach((word) => {
          word.addEventListener("mouseenter", () => {
            gsap.to(word, { color: "var(--color-accent)", scale: 1.05, duration: 0.3 });
          });
          word.addEventListener("mouseleave", () => {
            gsap.to(word, { color: "rgba(26, 26, 26, 0.15)", scale: 1, duration: 0.3 });
          });
        });
      }

      // Row 2 - reverse
      if (track2Ref.current) {
        gsap.set(track2Ref.current, { xPercent: -50 });
        gsap.to(track2Ref.current, {
          xPercent: 0,
          duration: 65,
          ease: "none",
          repeat: -1,
        });

        track2Ref.current.querySelectorAll("span").forEach((word) => {
          word.addEventListener("mouseenter", () => {
            gsap.to(word, { color: "var(--color-accent)", scale: 1.08, duration: 0.3 });
          });
          word.addEventListener("mouseleave", () => {
            gsap.to(word, { color: "rgba(26, 26, 26, 0.08)", scale: 1, duration: 0.3 });
          });
        });
      }

      // Row 3 - forward, subtle
      if (track3Ref.current) {
        gsap.to(track3Ref.current, {
          xPercent: -50,
          duration: 80,
          ease: "none",
          repeat: -1,
        });
      }

      // Section exit
      gsap.to(section.current, {
        opacity: 0.3,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "bottom 10%",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          xPercent: -50,
          duration: 40,
          ease: "none",
          repeat: -1,
        });
      }

      if (track2Ref.current) {
        gsap.set(track2Ref.current, { xPercent: -50 });
        gsap.to(track2Ref.current, {
          xPercent: 0,
          duration: 50,
          ease: "none",
          repeat: -1,
        });
      }

      if (track3Ref.current) {
        gsap.to(track3Ref.current, {
          xPercent: -50,
          duration: 60,
          ease: "none",
          repeat: -1,
        });
      }

      let scrollTimeout: ReturnType<typeof setTimeout> | undefined;
      let lastScrollY = 0;

      const onScroll = () => {
        const currentY = window.scrollY;
        const velocity = Math.abs(currentY - lastScrollY);
        lastScrollY = currentY;

        if (trackRef.current) {
          const speed = Math.max(20, 40 - velocity * 0.3);
          trackRef.current.style.animationDuration = `${speed}s`;
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (trackRef.current) trackRef.current.style.animationDuration = "40s";
        }, 500);
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
        clearTimeout(scrollTimeout);
      };
    });
  }, { scope: section });

  return (
    <section ref={section} className="relative bg-bg-2 overflow-hidden" style={{ paddingTop: "clamp(5rem, 10vw, 8rem)", paddingBottom: "clamp(5rem, 10vw, 8rem)" }}>
      <div className="divider" />

      {/* Header */}
      <div className="wrap mb-8 md:mb-12">
        <p className="marquee-label t-label text-accent tracking-[0.35em] mb-3 md:mb-4" style={{ opacity: 0 }}>Material Library</p>
        <h2 className="marquee-heading t-h2 text-text/80 italic" style={{ opacity: 0 }}>Everything we specify.</h2>
      </div>

      {/* Row 1 - Main materials */}
      <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)" }}>
        <div ref={trackRef} className="marquee-track flex items-center" style={{ gap: "clamp(3rem, 6vw, 5rem)", opacity: 0 }}>
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-6 shrink-0">
              <span className="t-h3 whitespace-nowrap transition-all duration-300" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1, color: "rgba(26, 26, 26, 0.15)" }}>{item}</span>
              <span className="w-2 h-2 rounded-full bg-accent/40 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Process words (reverse) */}
      <div className="overflow-hidden" style={{ marginTop: "clamp(0.5rem, 1.5vw, 1rem)", maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
        <div ref={track2Ref} className="marquee-track-2 flex items-center" style={{ gap: "clamp(4rem, 8vw, 6rem)", width: "max-content", opacity: 0 }}>
          {[...itemsRow2, ...itemsRow2].map((item, i) => (
            <div key={`r2-${i}`} className="flex items-center gap-4 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/25 shrink-0" />
              <span className="whitespace-nowrap transition-all duration-300" style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", color: "rgba(26, 26, 26, 0.08)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 - Values (subtle, smaller) */}
      <div className="overflow-hidden" style={{ marginTop: "clamp(0.5rem, 1.5vw, 1rem)", maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
        <div ref={track3Ref} className="marquee-track-3 flex items-center" style={{ gap: "clamp(3rem, 6vw, 5rem)", width: "max-content", opacity: 0 }}>
          {[...itemsRow3, ...itemsRow3].map((item, i) => (
            <div key={`r3-${i}`} className="flex items-center gap-3 shrink-0">
              <span className="w-1 h-1 rounded-full bg-text/15 shrink-0" />
              <span className="t-label whitespace-nowrap" style={{ color: "rgba(26, 26, 26, 0.1)", letterSpacing: "0.2em" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />
    </section>
  );
}
