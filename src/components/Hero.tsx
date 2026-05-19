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

const heroParticles = Array.from({ length: 15 }, (_, i) => ({
  size: (i % 3) * 2 + 2,
  left: `${(i * 6.7) % 100}%`,
  top: `${(i * 11.3) % 100}%`,
  opacity: 0.08 + (i % 4) * 0.04,
  delay: i * 0.3,
}));

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const pinContainer = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    const mm = gsap.matchMedia();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // LAYER 1: Ambient particles
    gsap.utils.toArray(".hero-particle").forEach((p, i) => {
      gsap.to(p as Element, {
        y: `random(-80, 80)`,
        x: `random(-50, 50)`,
        opacity: `random(0.05, 0.2)`,
        scale: `random(0.8, 1.5)`,
        duration: `random(6, 12)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (i as number) * 0.4,
      });
    });

    // LAYER 2: Geometric accent lines
    gsap.utils.toArray(".hero-accent-line").forEach((line, i) => {
      gsap.to(line as Element, {
        scaleY: `random(0.6, 1.4)`,
        opacity: `random(0.03, 0.08)`,
        rotation: `random(-5, 5)`,
        duration: `random(8, 15)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (i as number) * 0.5,
      });
    });

    // ENTRANCE: Layered reveal sequence
    const entranceTl = gsap.timeline({ delay: 2.4 });

    // Layer 1: Background image emerges from darkness
    entranceTl.fromTo(".hero-entrance-img",
      { clipPath: "circle(0% at 50% 50%)", scale: 1.4, filter: "blur(40px) brightness(0.3)" },
      { clipPath: "circle(75% at 50% 50%)", scale: 1, filter: "blur(0px) brightness(1)", duration: 3.2, ease: "power4.inOut" }, 0
    );

    // Layer 2: Overlay gradient fades in to create depth
    entranceTl.fromTo(".hero-entrance-overlay", { opacity: 0 }, { opacity: 1, duration: 2.8 }, 0.6);

    // Layer 3: Grain texture emerges
    entranceTl.fromTo(".hero-grain", { opacity: 0 }, { opacity: 0.04, duration: 2 }, 1);

    // Layer 4: Horizontal line draws across
    entranceTl.fromTo(".hero-entrance-line", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.4, ease: "power2.inOut" }, 1.2);

    // Layer 5: Label fades up
    entranceTl.fromTo(".hero-entrance-label", { y: 40, opacity: 0, letterSpacing: "0.5em" }, { y: 0, opacity: 1, letterSpacing: "0.35em", duration: 1, ease: "power3.out" }, 1.5);

    // Layer 6: Title words rise with staggered 3D rotation
    entranceTl.fromTo(".hero-entrance-title-word",
      { y: 120, opacity: 0, rotateX: -45, skewY: 8 },
      { y: 0, opacity: 1, rotateX: 0, skewY: 0, stagger: 0.12, duration: 1.8, ease: "power4.out" }, 1.7
    );

    // Layer 7: Subtitle fades in with blur resolve
    entranceTl.fromTo(".hero-entrance-subtitle",
      { y: 30, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, 2.4
    );

    // Layer 8: Scroll indicator pulses in
    entranceTl.fromTo(".hero-entrance-scroll", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 2.8);

    // SCROLL-DRIVEN NARRATIVE: 4 scenes telling a story
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // SCENE 1 → 2: Title dissolves, images assemble like a mood board
      tl.to(".hero-entrance-title-word", { y: -80, opacity: 0, stagger: 0.04, duration: 0.12, ease: "power2.in" }, 0);
      tl.to(".hero-entrance-label, .hero-entrance-line, .hero-entrance-subtitle, .hero-entrance-scroll", { opacity: 0, y: -40, duration: 0.1 }, 0);
      tl.to(".hero-entrance-img", { scale: 1.15, clipPath: "inset(0 0 0 45%)", filter: "brightness(0.85)", duration: 0.25 }, 0);

      // Images slide in from different directions with parallax depth
      tl.fromTo(".hero-s2-img-1", { x: "-120%", opacity: 0, rotateY: 20, filter: "blur(10px)" }, { x: "0%", opacity: 1, rotateY: 0, filter: "blur(0px)", duration: 0.2, ease: "power3.out" }, 0.05);
      tl.fromTo(".hero-s2-img-2", { y: "120%", opacity: 0, scale: 0.7, filter: "blur(10px)" }, { y: "0%", opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.2, ease: "power3.out" }, 0.1);
      tl.fromTo(".hero-s2-img-3", { x: "120%", opacity: 0, rotateY: -20, filter: "blur(10px)" }, { x: "0%", opacity: 1, rotateY: 0, filter: "blur(0px)", duration: 0.2, ease: "power3.out" }, 0.15);

      // Connecting lines draw between images
      tl.fromTo(".hero-s2-connector", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.15, ease: "power2.out" }, 0.2);

      // Text fades up with narrative weight
      tl.fromTo(".hero-s2-text", { y: 50, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.15 }, 0.25);
      tl.fromTo(".hero-s2-accent-mark", { scale: 0, opacity: 0, rotation: -180 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.12, ease: "back.out(3)" }, 0.3);

      // SCENE 2 → 3: Images converge into single focal point
      tl.to(".hero-s2-img-1", { x: "-15%", scale: 0.9, opacity: 0.6, duration: 0.2 }, 0.4);
      tl.to(".hero-s2-img-2", { y: "-10%", scale: 0.9, opacity: 0.6, duration: 0.2 }, 0.4);
      tl.to(".hero-s2-img-3", { x: "15%", scale: 0.9, opacity: 0.6, duration: 0.2 }, 0.4);
      tl.to(".hero-s2-text, .hero-s2-connector, .hero-s2-accent-mark", { opacity: 0, y: -30, duration: 0.12 }, 0.4);

      // New image wipes in with cinematic reveal
      tl.fromTo(".hero-s3-img", { clipPath: "inset(0 100% 0 0)", scale: 1.3, filter: "blur(12px)" }, { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "blur(0px)", duration: 0.25, ease: "power3.inOut" }, 0.45);

      // Content layers build sequentially
      tl.fromTo(".hero-s3-accent", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.12 }, 0.55);
      tl.fromTo(".hero-s3-label", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1 }, 0.6);
      tl.fromTo(".hero-s3-heading-word", { y: "110%", opacity: 0, rotateX: -30 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.06, duration: 0.15 }, 0.65);
      tl.fromTo(".hero-s3-body", { y: 30, opacity: 0, filter: "blur(4px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.12 }, 0.8);
      tl.fromTo(".hero-s3-stat", { y: 25, opacity: 0, scale: 0.85 }, { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.12 }, 0.85);
      tl.fromTo(".hero-s3-img-accent", { clipPath: "inset(0 100% 0 0)", scale: 1.15, filter: "blur(8px)" }, { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "blur(0px)", duration: 0.18, ease: "power3.inOut" }, 0.75);

      // Floating elements animate in background
      tl.fromTo(".hero-s3-float", { opacity: 0, scale: 0.5, rotation: -45 }, { opacity: 1, scale: 1, rotation: 0, stagger: 0.08, duration: 0.15 }, 0.7);

      // SCENE 3 → 4: Everything collapses to centered CTA
      tl.to(".hero-s3-img", { clipPath: "inset(0 0 100% 0)", duration: 0.18 }, 1);
      tl.to(".hero-s3-label, .hero-s3-heading-word, .hero-s3-body, .hero-s3-accent, .hero-s3-stat, .hero-s3-img-accent, .hero-s3-float", { y: -50, opacity: 0, duration: 0.12 }, 1);

      // Background transitions with gradient sweep
      tl.fromTo(".hero-s4-bg", { opacity: 0 }, { opacity: 1, duration: 0.12 }, 1.05);
      tl.fromTo(".hero-s4-gradient-sweep", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.2, ease: "power2.inOut" }, 1.08);

      // CTA builds with dramatic weight
      tl.fromTo(".hero-s4-line", { scaleX: 0 }, { scaleX: 1, duration: 0.15, ease: "power2.inOut" }, 1.12);
      tl.fromTo(".hero-s4-word", { y: "130%", opacity: 0, rotateX: -40 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.07, duration: 0.18, ease: "power4.out" }, 1.18);
      tl.fromTo(".hero-s4-sub", { y: 25, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.12 }, 1.3);
      tl.fromTo(".hero-s4-cta", { y: 25, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.12 }, 1.35);
      tl.fromTo(".hero-s4-particles", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, stagger: 0.05, duration: 0.1 }, 1.25);

      // Mouse parallax on scene 2 images with depth layers
      gsap.utils.toArray(".hero-s2-img-1, .hero-s2-img-2, .hero-s2-img-3").forEach((img, i) => {
        const depth = (i + 1) * 15;
        gsap.to(img as Element, {
          x: () => mouseRef.current.x * depth,
          y: () => mouseRef.current.y * depth,
          duration: 1.8,
          ease: "power2.out",
        });
      });

      // Magnetic text on title
      gsap.utils.toArray(".hero-entrance-title").forEach((title) => {
        const el = title as HTMLElement;
        el.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, { x: x * 0.04, y: y * 0.04, duration: 0.5, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
        });
      });
    });

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, { scope: section });

  return (
    <section id="hero" ref={section} className="relative bg-bg">
      <div className="divider" />

      {/* LAYER 0: Ambient particles */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {heroParticles.map((p, i) => (
          <div key={i} className="hero-particle absolute rounded-full bg-accent" style={{ width: `${p.size}px`, height: `${p.size}px`, left: p.left, top: p.top, opacity: p.opacity }} />
        ))}
      </div>

      {/* LAYER 1: Geometric accent lines */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        <div className="hero-accent-line absolute top-[20%] left-[15%] w-[1px] h-32 bg-accent/20 origin-center" />
        <div className="hero-accent-line absolute bottom-[25%] right-[20%] w-[1px] h-24 bg-text/10 origin-center" />
        <div className="hero-accent-line absolute top-[40%] right-[30%] w-20 h-[1px] bg-accent/15 origin-center" />
      </div>

      <div ref={pinContainer} className="relative" style={{ height: "100vh" }}>
        {/* SCENE 1: Hero entrance */}
        <div className="hero-entrance absolute inset-0 overflow-hidden">
          <div className="hero-entrance-img absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${images[0]}")` }} />
          <div className="hero-entrance-overlay absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-bg/20" style={{ opacity: 0 }} />
          <div className="hero-grain absolute inset-0 pointer-events-none" style={{ opacity: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, mixBlendMode: "multiply" }} />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div className="hero-entrance-line w-20 h-[1px] bg-accent mx-auto" style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)", transform: "scaleX(0)", opacity: 0 }} />
            <p className="hero-entrance-label t-label text-accent tracking-[0.35em]" style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)", opacity: 0 }}>Curated Materials & Design</p>
            <h1 className="hero-entrance-title t-giant text-text" style={{ overflow: "visible" }}>
              {"The Raw Select".split(" ").map((w, i) => (
                <span key={i} className="hero-entrance-title-word inline-block mr-[0.25em]" style={{ opacity: 0 }}>
                  {w}
                </span>
              ))}
            </h1>
            <p className="hero-entrance-subtitle t-body-lg mt-6 max-w-md mx-auto" style={{ opacity: 0 }}>Where intention meets material — every selection elevated.</p>
            <div className="hero-entrance-scroll absolute bottom-12 flex items-center gap-4" style={{ opacity: 0 }}>
              <div className="scroll-line" />
              <span className="t-caption text-text-30">Scroll to explore</span>
            </div>
          </div>
        </div>

        {/* SCENE 2: Mood board assembly */}
        <div className="hero-s2 absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-s2-img-1 absolute top-[8%] left-[6%] w-[32%] aspect-[3/4] overflow-hidden rounded-lg shadow-2xl" style={{ opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[1]}")` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/25 to-transparent" />
          </div>
          <div className="hero-s2-img-2 absolute bottom-[12%] left-[32%] w-[26%] aspect-square overflow-hidden rounded-full shadow-2xl" style={{ opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[2]}")` }} />
          </div>
          <div className="hero-s2-img-3 absolute top-[12%] right-[8%] w-[28%] aspect-[4/5] overflow-hidden rounded-lg shadow-2xl" style={{ opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[3]}")` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/25 to-transparent" />
          </div>

          {/* Connector lines between images */}
          <div className="hero-s2-connector absolute top-[35%] left-[38%] w-24 h-[1px] bg-accent/30 origin-left" style={{ opacity: 0 }} />
          <div className="hero-s2-connector absolute top-[50%] left-[58%] w-20 h-[1px] bg-accent/20 origin-left" style={{ opacity: 0 }} />

          {/* Accent mark */}
          <div className="hero-s2-accent-mark absolute top-[15%] right-[35%] w-8 h-8 rounded-full border border-accent/40" style={{ opacity: 0 }} />

          <div className="hero-s2-text absolute bottom-[12%] left-[6%] max-w-md" style={{ opacity: 0 }}>
            <p className="t-h2 text-text/80 italic">Every material tells a story.</p>
            <p className="t-body-lg mt-4">We curate only those that speak with clarity, purpose, and enduring quality.</p>
          </div>
        </div>

        {/* SCENE 3: Philosophy deep-dive */}
        <div className="hero-s3 absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-s3-img absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${images[4]}")` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-bg/25 to-transparent" />

          {/* Floating background elements */}
          <div className="hero-s3-float absolute top-[15%] right-[12%] w-16 h-16 rounded-full border border-accent/15" style={{ opacity: 0 }} />
          <div className="hero-s3-float absolute bottom-[20%] left-[8%] w-12 h-12 rounded-full bg-accent-dim" style={{ opacity: 0 }} />

          <div className="relative z-10 h-full flex items-center">
            <div className="wrap" style={{ maxWidth: "1440px", marginInline: "auto", paddingInline: "clamp(1.5rem, 5vw, 6rem)" }}>
              <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(3rem, 6vw, 6rem)" }}>
                <div className="lg:col-span-6">
                  <div className="hero-s3-accent w-16 h-[1px] bg-accent origin-left" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)", transform: "scaleX(0)", opacity: 0 }} />
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

        {/* SCENE 4: CTA */}
        <div className="hero-s4 absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-s4-bg absolute inset-0 bg-bg" style={{ opacity: 0 }} />
          <div className="hero-s4-gradient-sweep absolute inset-0 bg-gradient-to-r from-accent-dim via-transparent to-accent-dim origin-left" style={{ opacity: 0 }} />

          {/* CTA particles */}
          <div className="hero-s4-particles absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="absolute rounded-full bg-accent" style={{ width: `${(i % 3) + 2}px`, height: `${(i % 3) + 2}px`, left: `${(i * 12.5) % 100}%`, top: `${(i * 15.3) % 100}%`, opacity: 0.1 }} />
            ))}
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <div className="hero-s4-line w-24 h-[1px] bg-accent mx-auto" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)", transform: "scaleX(0)" }} />
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
            <p className="hero-s4-sub t-body-lg max-w-lg mx-auto" style={{ opacity: 0, marginBottom: "clamp(3rem, 6vw, 4rem)" }}>
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
