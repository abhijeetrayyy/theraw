"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/photo-1583847268964-b28dc8f51f92.avif",
  "/photo-1564078516393-cf04bd966897.avif",
  "/photo-1618221195710-dd6b41faaea6.avif",
  "/photo-1567016376408-0226e4d0c1ea.avif",
  "/photo-1616046229478-9901c5536a45.avif",
];

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const pinContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Entrance timeline (before scrolling)
    const entranceTl = gsap.timeline({ delay: 2.4 });
    entranceTl.fromTo(".hero-entrance-img",
      { clipPath: "circle(0% at 50% 50%)", scale: 1.3, filter: "blur(30px)" },
      { clipPath: "circle(75% at 50% 50%)", scale: 1, filter: "blur(0px)", duration: 3, ease: "power4.inOut" }, 0
    );
    entranceTl.fromTo(".hero-entrance-overlay", { opacity: 0 }, { opacity: 1, duration: 2.5 }, 0.5);
    entranceTl.fromTo(".hero-entrance-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 1.2);
    entranceTl.fromTo(".hero-entrance-label", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 1.4);
    entranceTl.fromTo(".hero-entrance-title", { y: 80, opacity: 0, rotateX: -15 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.6, ease: "power4.out" }, 1.6);
    entranceTl.fromTo(".hero-entrance-scroll", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 2.2);

    // Scroll-driven pinned animation
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // === SCENE 1 → SCENE 2: Title splits, images reveal ===
      // Title fades up and out
      tl.to(".hero-entrance-title", { y: -100, opacity: 0, duration: 0.15, ease: "power2.in" }, 0);
      tl.to(".hero-entrance-label", { y: -50, opacity: 0, duration: 0.12 }, 0);
      tl.to(".hero-entrance-line", { scaleX: 0, duration: 0.1 }, 0);
      tl.to(".hero-entrance-scroll", { opacity: 0, duration: 0.08 }, 0);

      // Main image zooms and shifts right
      tl.to(".hero-entrance-img", { scale: 1.1, clipPath: "inset(0 0 0 40%)", duration: 0.2 }, 0);

      // Scene 2 images slide in from left
      tl.fromTo(".hero-s2-img-1",
        { x: "-100%", opacity: 0, rotateY: 15 },
        { x: "0%", opacity: 1, rotateY: 0, duration: 0.15, ease: "power3.out" }, 0.05
      );
      tl.fromTo(".hero-s2-img-2",
        { y: "100%", opacity: 0, scale: 0.8 },
        { y: "0%", opacity: 1, scale: 1, duration: 0.15, ease: "power3.out" }, 0.1
      );
      tl.fromTo(".hero-s2-img-3",
        { x: "100%", opacity: 0, rotateY: -15 },
        { x: "0%", opacity: 1, rotateY: 0, duration: 0.15, ease: "power3.out" }, 0.12
      );

      // Scene 2 text fades in
      tl.fromTo(".hero-s2-text", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.12 }, 0.15);

      // === SCENE 2 → SCENE 3: Images merge, text transforms ===
      // Scene 2 images scale up and merge
      tl.to(".hero-s2-img-1", { scale: 1.05, x: "-5%", duration: 0.15 }, 0.3);
      tl.to(".hero-s2-img-2", { scale: 1.05, y: "-5%", duration: 0.15 }, 0.3);
      tl.to(".hero-s2-img-3", { scale: 1.05, x: "5%", duration: 0.15 }, 0.3);
      tl.to(".hero-s2-text", { y: -30, opacity: 0, duration: 0.1 }, 0.3);

      // Scene 3: Full image wipe
      tl.fromTo(".hero-s3-img",
        { clipPath: "inset(0 100% 0 0)", scale: 1.2 },
        { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 0.2, ease: "power3.inOut" }, 0.35
      );

      // Scene 3 text reveals
      tl.fromTo(".hero-s3-label", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1 }, 0.45);
      tl.fromTo(".hero-s3-heading-word", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.05, duration: 0.12 }, 0.5);
      tl.fromTo(".hero-s3-body", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1 }, 0.6);

      // Scene 3 accent elements
      tl.fromTo(".hero-s3-accent", { scaleX: 0 }, { scaleX: 1, duration: 0.1 }, 0.55);
      tl.fromTo(".hero-s3-stat", { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.1 }, 0.65);
      tl.fromTo(".hero-s3-img-accent", { clipPath: "inset(0 100% 0 0)", scale: 1.1 }, { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 0.15, ease: "power3.inOut" }, 0.7);

      // === SCENE 3 → SCENE 4: Final transition ===
      tl.to(".hero-s3-img", { clipPath: "inset(0 0 100% 0)", duration: 0.15 }, 0.8);
      tl.to(".hero-s3-label, .hero-s3-heading-word, .hero-s3-body, .hero-s3-accent, .hero-s3-stat", { y: -40, opacity: 0, duration: 0.1 }, 0.8);

      // Scene 4: Clean statement
      tl.fromTo(".hero-s4-bg", { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.85);
      tl.fromTo(".hero-s4-line", { scaleX: 0 }, { scaleX: 1, duration: 0.12, ease: "power2.inOut" }, 0.9);
      tl.fromTo(".hero-s4-word", { y: "120%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.06, duration: 0.15, ease: "power4.out" }, 0.95);
      tl.fromTo(".hero-s4-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1 }, 1.05);
      tl.fromTo(".hero-s4-cta", { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.1 }, 1.1);
    });
  }, { scope: section });

  return (
    <section id="hero" ref={section} className="relative bg-bg">
      <div className="divider" />
      <div ref={pinContainer} className="relative" style={{ height: "100vh" }}>
        {/* ====== SCENE 1: Opening ====== */}
        <div className="hero-entrance absolute inset-0 overflow-hidden">
          <div className="hero-entrance-img absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${images[0]}")` }} />
          <div className="hero-entrance-overlay absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" style={{ opacity: 0 }} />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div className="hero-entrance-line w-16 h-[1px] bg-accent mx-auto" style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)", transform: "scaleX(0)" }} />
            <p className="hero-entrance-label t-label text-accent tracking-[0.35em]" style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)", opacity: 0 }}>Curated Materials & Design</p>
            <h1 className="hero-entrance-title t-giant text-text" style={{ opacity: 0 }}>
              The Raw <span className="text-accent italic">Select</span>
            </h1>
            <div className="hero-entrance-scroll absolute bottom-12 flex items-center gap-4" style={{ opacity: 0 }}>
              <div className="scroll-line" />
              <span className="t-caption text-text-30">Scroll</span>
            </div>
          </div>
        </div>

        {/* ====== SCENE 2: Image Gallery ====== */}
        <div className="hero-s2 absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-s2-img-1 absolute top-[10%] left-[5%] w-[35%] aspect-[3/4] overflow-hidden rounded-lg shadow-2xl" style={{ opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[1]}")` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/20 to-transparent" />
          </div>
          <div className="hero-s2-img-2 absolute bottom-[10%] left-[30%] w-[28%] aspect-square overflow-hidden rounded-full shadow-2xl" style={{ opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[2]}")` }} />
          </div>
          <div className="hero-s2-img-3 absolute top-[15%] right-[8%] w-[30%] aspect-[4/5] overflow-hidden rounded-lg shadow-2xl" style={{ opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[3]}")` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/20 to-transparent" />
          </div>

          <div className="hero-s2-text absolute bottom-[15%] left-[5%] max-w-md" style={{ opacity: 0 }}>
            <p className="t-h2 text-text/80 italic">Every material tells a story.</p>
            <p className="t-body-lg mt-4">We curate only those that speak with clarity, purpose, and enduring quality.</p>
          </div>
        </div>

        {/* ====== SCENE 3: Full Image + Story ====== */}
        <div className="hero-s3 absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-s3-img absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${images[4]}")` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/50 via-bg/20 to-transparent" />

          <div className="relative z-10 h-full flex items-center">
            <div className="wrap" style={{ maxWidth: "1440px", marginInline: "auto", paddingInline: "clamp(1.5rem, 5vw, 6rem)" }}>
              <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(3rem, 6vw, 6rem)" }}>
                <div className="lg:col-span-6">
                  <div className="hero-s3-accent w-14 h-[1px] bg-accent origin-left" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)", transform: "scaleX(0)" }} />
                  <p className="hero-s3-label t-label text-accent tracking-[0.35em]" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)", opacity: 0 }}>Our Philosophy</p>
                  <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
                    <div className="overflow-hidden" style={{ marginBottom: "0.2rem" }}>
                      <h2 className="hero-s3-heading-word t-h1 text-text">Design with</h2>
                    </div>
                    <div className="overflow-hidden">
                      <h2 className="hero-s3-heading-word t-h1 text-accent italic">intention.</h2>
                    </div>
                  </div>
                  <p className="hero-s3-body t-body-lg max-w-md" style={{ opacity: 0 }}>In an industry overwhelmed by endless choices, true quality comes from refined selection — not abundance.</p>

                  <div className="flex items-center gap-8 mt-12">
                    <div className="hero-s3-stat" style={{ opacity: 0 }}>
                      <p className="t-stat text-text">500+</p>
                      <p className="t-label text-text-30 mt-1">Materials</p>
                    </div>
                    <div className="w-[1px] h-12 bg-text-08" />
                    <div className="hero-s3-stat" style={{ opacity: 0 }}>
                      <p className="t-stat text-text">120+</p>
                      <p className="t-label text-text-30 mt-1">Projects</p>
                    </div>
                    <div className="w-[1px] h-12 bg-text-08" />
                    <div className="hero-s3-stat" style={{ opacity: 0 }}>
                      <p className="t-stat text-text">98%</p>
                      <p className="t-label text-text-30 mt-1">Retention</p>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block lg:col-span-5 lg:col-start-8">
                  <div className="hero-s3-img-accent relative w-full aspect-[3/4] overflow-hidden rounded-lg" style={{ opacity: 0 }}>
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${images[3]}")` }} />
                    <div className="absolute inset-0 border border-text/10" style={{ margin: "clamp(1rem, 2vw, 1.5rem)" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====== SCENE 4: Final Statement ====== */}
        <div className="hero-s4 absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-s4-bg absolute inset-0 bg-bg" style={{ opacity: 0 }} />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div className="hero-s4-line w-20 h-[1px] bg-accent mx-auto" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)", transform: "scaleX(0)" }} />
            <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
              <div className="overflow-hidden" style={{ marginBottom: "0.2rem" }}>
                <h2 className="hero-s4-word t-display text-text">Ready to</h2>
              </div>
              <div className="overflow-hidden" style={{ marginBottom: "0.2rem" }}>
                <h2 className="hero-s4-word t-display text-text">specify</h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="hero-s4-word t-display text-accent italic">with intent?</h2>
              </div>
            </div>
            <p className="hero-s4-sub t-body-lg max-w-lg mx-auto" style={{ opacity: 0, marginBottom: "clamp(3rem, 6vw, 4rem)", color: "var(--color-text-50)" }}>
              Tell us about your project. We&apos;ll respond with a curated material selection tailored to your brief.
            </p>
            <a href="/contact" className="hero-s4-cta inline-flex items-center gap-3 text-sm font-medium text-accent hover:text-text transition-colors duration-400 group" style={{ opacity: 0 }}>
              <span>Start a Project</span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-accent/30 group-hover:border-text/30 transition-colors duration-400">
                <svg className="w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
