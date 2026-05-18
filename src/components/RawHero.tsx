"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RawHero() {
  const section = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".hero-reveal", {
      y: "120%",
      duration: 1.8,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.4,
    });

    gsap.from(".hero-fade", {
      opacity: 0,
      y: 30,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
      delay: 1.4,
    });

    gsap.to(bgRef.current, {
      scrollTrigger: {
        trigger: section.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.4,
      },
      yPercent: 10,
      scale: 1.04,
      ease: "none",
    });

    gsap.to(textRef.current, {
      scrollTrigger: {
        trigger: section.current,
        start: "top top",
        end: "100% top",
        scrub: 0.4,
      },
      yPercent: -20,
      opacity: 0,
      ease: "none",
    });

    gsap.to(overlayRef.current, {
      scrollTrigger: {
        trigger: section.current,
        start: "top top",
        end: "50% top",
        scrub: 0.4,
      },
      opacity: 0.6,
      ease: "none",
    });
  }, { scope: section });

  return (
    <section ref={section} className="relative h-screen w-full overflow-hidden bg-dark">
      <div className="absolute inset-0 z-0">
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop")',
          }}
        />
        <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-t from-dark via-dark/25 to-dark/5 z-[1]" />
      </div>

      <div ref={textRef} className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 lg:pb-32">
        <div className="container">
          <div className="overflow-hidden mb-6">
            <p className="hero-fade text-label text-accent">
              Curated Products. Amplified Experience.
            </p>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-reveal text-display text-light">The Raw</h1>
          </div>
          <div className="overflow-hidden -mt-[0.4em] md:-mt-[0.5em]">
            <h1 className="hero-reveal text-display text-light">Select</h1>
          </div>

          <div className="hero-fade mt-10 md:mt-14 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12">
            <p className="text-body-lg text-light/60 text-balance max-w-xl">
              Clarity over excess. Materials and design solutions curated for
              visionary architects and designers.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-cap text-light/30">Scroll</span>
              <div className="w-8 h-[2px] bg-light/15 relative overflow-hidden rounded">
                <div className="absolute inset-0 w-1/3 h-full bg-accent rounded animate-[scrollLine_1.5s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `@keyframes scrollLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }`
      }} />
    </section>
  );
}
