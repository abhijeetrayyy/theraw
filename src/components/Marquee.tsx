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
  const trackRef = useRef<HTMLDivElement>(null);
  const reverseTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = section.current?.querySelector(".marquee-track");
      if (!track) return;

      gsap.to(track, {
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
          gsap.to(track, {
            duration: 0.3,
            ease: "power2.out",
            x: `+=${self.getVelocity() / 300}`,
          });
        },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      const track = trackRef.current;
      const reverseTrack = reverseTrackRef.current;

      if (track) {
        track.addEventListener("touchstart", () => {
          track.style.animationPlayState = "paused";
        }, { passive: true });
        track.addEventListener("touchend", () => {
          track.style.animationPlayState = "running";
        }, { passive: true });
      }

      if (reverseTrack) {
        reverseTrack.addEventListener("touchstart", () => {
          reverseTrack.style.animationPlayState = "paused";
        }, { passive: true });
        reverseTrack.addEventListener("touchend", () => {
          reverseTrack.style.animationPlayState = "running";
        }, { passive: true });
      }

      let scrollTimeout: ReturnType<typeof setTimeout>;
      const onScroll = () => {
        if (track) {
          track.style.animationDuration = "20s";
        }
        if (reverseTrack) {
          reverseTrack.style.animationDuration = "25s";
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
      };
    });
  }, { scope: section });

  return (
    <section ref={section} className="relative bg-bg-2 overflow-hidden" style={{ paddingTop: "clamp(4rem, 8vw, 6rem)", paddingBottom: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="divider" />
      <div className="overflow-hidden">
        <div ref={trackRef} className="marquee-track flex items-center" style={{ gap: "clamp(3rem, 6vw, 5rem)" }}>
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-6 shrink-0">
              <span className="t-h3 text-text/20 whitespace-nowrap">{item}</span>
              <span className="w-2 h-2 rounded-full bg-accent/30 shrink-0" />
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden md:hidden" style={{ marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}>
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
