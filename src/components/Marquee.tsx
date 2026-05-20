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

const itemsRow3 = [
  "Curated", "Selected", "Tested", "Approved", "Specified", "Delivered", "Installed", "Elevated",
];

export default function Marquee() {
  const section = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reverseTrackRef = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = section.current?.querySelector(".marquee-track");
      const row3 = row3Ref.current;

      if (track) {
        const tween = gsap.to(track, {
          xPercent: -50,
          duration: 60,
          ease: "none",
          repeat: -1,
        });

        ScrollTrigger.create({
          trigger: section.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());
            const speedBoost = velocity / 300;
            gsap.to(track, {
              duration: 0.3,
              ease: "power2.out",
              x: `+=${speedBoost}`,
            });
            // Opacity shift based on velocity
            const opacityBoost = Math.min(0.5, velocity / 500);
            gsap.to(track.querySelectorAll("span"), {
              color: `rgba(26, 26, 26, ${0.2 + opacityBoost})`,
              duration: 0.3,
            });
          },
        });

        // Word hover highlight
        track.querySelectorAll("span").forEach((word) => {
          word.addEventListener("mouseenter", () => {
            gsap.to(word, { color: "var(--color-accent)", duration: 0.3 });
          });
          word.addEventListener("mouseleave", () => {
            gsap.to(word, { color: "rgba(26, 26, 26, 0.2)", duration: 0.3 });
          });
        });
      }

      if (row3) {
        gsap.to(row3, {
          xPercent: -50,
          duration: 90,
          ease: "none",
          repeat: -1,
        });

        row3.querySelectorAll("span").forEach((word) => {
          word.addEventListener("mouseenter", () => {
            gsap.to(word, { color: "var(--color-accent)", duration: 0.3 });
          });
          word.addEventListener("mouseleave", () => {
            gsap.to(word, { color: "rgba(26, 26, 26, 0.12)", duration: 0.3 });
          });
        });
      }
    });

    mm.add("(max-width: 1023px)", () => {
      const track = trackRef.current;
      const reverseTrack = reverseTrackRef.current;

      if (track) {
        track.addEventListener("touchstart", () => {
          if (navigator.vibrate) navigator.vibrate(3);
          track.style.animationPlayState = "paused";
        }, { passive: true });
        track.addEventListener("touchend", () => {
          track.style.animationPlayState = "running";
        }, { passive: true });
      }

      if (reverseTrack) {
        reverseTrack.addEventListener("touchstart", () => {
          if (navigator.vibrate) navigator.vibrate(3);
          reverseTrack.style.animationPlayState = "paused";
        }, { passive: true });
        reverseTrack.addEventListener("touchend", () => {
          reverseTrack.style.animationPlayState = "running";
        }, { passive: true });
      }

      let scrollTimeout: ReturnType<typeof setTimeout> | undefined;
      let velocityTimeout: ReturnType<typeof setTimeout> | undefined;
      let lastScrollY = 0;
      let scrollVelocity = 0;

      const onScroll = () => {
        const currentY = window.scrollY;
        scrollVelocity = Math.abs(currentY - lastScrollY);
        lastScrollY = currentY;

        if (track) {
          const speed = Math.max(15, 60 - scrollVelocity * 0.5);
          track.style.animationDuration = `${speed}s`;
        }
        if (reverseTrack) {
          const speed = Math.max(20, 70 - scrollVelocity * 0.5);
          reverseTrack.style.animationDuration = `${speed}s`;
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (track) track.style.animationDuration = "60s";
          if (reverseTrack) reverseTrack.style.animationDuration = "70s";
        }, 500);
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
        clearTimeout(scrollTimeout);
        clearTimeout(velocityTimeout);
      };
    });
  }, { scope: section });

  return (
    <section ref={section} className="relative bg-bg-2 overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vw, 6rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="divider" />

      {/* Gradient mask on edges */}
      <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
        <div ref={trackRef} className="marquee-track flex items-center" style={{ gap: "clamp(3rem, 6vw, 5rem)" }}>
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-6 shrink-0">
              <span className="t-h3 text-text/20 whitespace-nowrap transition-colors duration-300">{item}</span>
              <span className="w-2 h-2 rounded-full bg-accent/30 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Third row (desktop only) */}
      <div ref={row3Ref} className="hidden md:block overflow-hidden" style={{ marginTop: "clamp(1rem, 2vw, 1.5rem)", maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
        <div className="flex items-center" style={{ gap: "clamp(4rem, 8vw, 6rem)", width: "max-content" }}>
          {[...itemsRow3, ...itemsRow3].map((item, i) => (
            <div key={`r3-${i}`} className="flex items-center gap-4 shrink-0">
              <span className="w-1 h-1 rounded-full bg-accent/20 shrink-0" />
              <span className="t-h3 whitespace-nowrap transition-colors duration-300" style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: "rgba(26, 26, 26, 0.12)" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden md:hidden" style={{ marginTop: "clamp(1.5rem, 3vw, 2.5rem)", maskImage: "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)" }}>
        <div ref={reverseTrackRef} className="marquee-track-reverse flex items-center" style={{ gap: "clamp(2rem, 4vw, 4rem)" }}>
          {[...items.slice().reverse(), ...items.slice().reverse()].map((item, i) => (
            <div key={`r-${i}`} className="flex items-center gap-4 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/20 shrink-0" />
              <span className="t-h3 text-text/15 whitespace-nowrap" style={{ fontSize: "clamp(1rem, 3.5vw, 1.5rem)" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="divider" />
    </section>
  );
}
