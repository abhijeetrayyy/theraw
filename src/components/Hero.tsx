"use client";

import { useRef, useEffect } from "react";
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

const heroParticles = Array.from({ length: 20 }, (_, i) => ({
  size: (i % 4) * 1.5 + 1,
  left: `${(i * 5.3) % 100}%`,
  top: `${(i * 9.7) % 100}%`,
  opacity: 0.06 + (i % 5) * 0.03,
}));

const mobileParticles = Array.from({ length: 10 }, (_, i) => ({
  size: (i % 3) * 2 + 2,
  left: `${(i * 10.5) % 100}%`,
  top: `${(i * 12.3) % 100}%`,
  opacity: 0.08 + (i % 4) * 0.04,
}));

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const pinContainer = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          x: e.clientX - window.innerWidth / 2,
          y: e.clientY - window.innerHeight / 2,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    gsap.utils.toArray(".hero-particle").forEach((p, i) => {
      gsap.to(p as Element, {
        y: `random(-100, 100)`,
        x: `random(-60, 60)`,
        opacity: `random(0.04, 0.18)`,
        scale: `random(0.6, 1.8)`,
        duration: `random(8, 14)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (i as number) * 0.3,
      });
    });

    gsap.utils.toArray(".hero-accent-line").forEach((line, i) => {
      gsap.to(line as Element, {
        scaleY: `random(0.5, 1.6)`,
        opacity: `random(0.02, 0.06)`,
        rotation: `random(-8, 8)`,
        duration: `random(10, 18)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (i as number) * 0.6,
      });
    });

    // Cinematic entrance — enhanced
    const entranceTl = gsap.timeline({ delay: 2.2 });

    entranceTl.fromTo(".hero-entrance-img",
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%)", scale: 1.15, filter: "blur(30px) brightness(0.3)" },
      { clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)", scale: 1, filter: "blur(0px) brightness(1)", duration: 3.5, ease: "power4.inOut" }, 0
    );

    entranceTl.fromTo(".hero-entrance-overlay", { opacity: 0 }, { opacity: 1, duration: 3 }, 0.5);

    entranceTl.fromTo(".hero-grain", { opacity: 0 }, { opacity: 0.035, duration: 2.5 }, 0.8);

    entranceTl.fromTo(".hero-entrance-line", { scaleX: 0, opacity: 0, transformOrigin: "center" }, { scaleX: 1, opacity: 1, duration: 1.6, ease: "power3.inOut" }, 1);

    entranceTl.fromTo(".hero-entrance-label", { y: 50, opacity: 0, letterSpacing: "0.6em" }, { y: 0, opacity: 1, letterSpacing: "0.35em", duration: 1.2, ease: "power3.out" }, 1.3);

    entranceTl.fromTo(".hero-entrance-title-letter",
      { y: 120, opacity: 0, rotateX: -60, skewY: 8 },
      { y: 0, opacity: 1, rotateX: 0, skewY: 0, stagger: 0.035, duration: 1.8, ease: "power4.out" }, 1.5
    );

    entranceTl.fromTo(".hero-entrance-subtitle",
      { y: 40, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out" }, 2.2
    );

    entranceTl.fromTo(".hero-entrance-scroll", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 2.6);

    mm.add("(min-width: 1024px)", () => {
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

      // Scene 1 exit
      tl.fromTo(".hero-entrance-title-letter", { y: 0, opacity: 1 }, { y: -80, opacity: 0, stagger: 0.03, duration: 0.12, ease: "power2.in" }, 0);
      tl.fromTo(".hero-entrance-label, .hero-entrance-line, .hero-entrance-subtitle, .hero-entrance-scroll", { y: 0, opacity: 1 }, { opacity: 0, y: -50, duration: 0.12 }, 0);
      tl.fromTo(".hero-entrance-img", { clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)", scale: 1 }, { scale: 1.2, clipPath: "inset(0 0 0 45%)", filter: "brightness(0.8) contrast(1.1)", duration: 0.28 }, 0);

      // Scene 2 enter — staggered clip-path from different directions
      tl.fromTo(".hero-s2-img-1", { x: "-130%", opacity: 0, rotateY: 25, filter: "blur(12px)" }, { x: "0%", opacity: 1, rotateY: 0, filter: "blur(0px)", duration: 0.22, ease: "power3.out" }, 0.05);
      tl.fromTo(".hero-s2-img-2", { y: "130%", opacity: 0, scale: 0.6, filter: "blur(12px)" }, { y: "0%", opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.22, ease: "power3.out" }, 0.1);
      tl.fromTo(".hero-s2-img-3", { x: "130%", opacity: 0, rotateY: -25, filter: "blur(12px)" }, { x: "0%", opacity: 1, rotateY: 0, filter: "blur(0px)", duration: 0.22, ease: "power3.out" }, 0.15);

      tl.fromTo(".hero-s2-connector", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.18, ease: "power2.out" }, 0.22);
      tl.fromTo(".hero-s2-accent-mark", { scale: 0, opacity: 0, rotation: -180 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.14, ease: "back.out(3)" }, 0.28);

      tl.fromTo(".hero-s2-text", { y: 60, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.18 }, 0.32);

      // Scene 2 exit — fragmentation
      tl.fromTo(".hero-s2-img-1", { x: "0%", opacity: 1, scale: 1 }, { x: "-18%", scale: 0.88, opacity: 0.55, duration: 0.22 }, 0.42);
      tl.fromTo(".hero-s2-img-2", { y: "0%", opacity: 1, scale: 1 }, { y: "-12%", scale: 0.88, opacity: 0.55, duration: 0.22 }, 0.42);
      tl.fromTo(".hero-s2-img-3", { x: "0%", opacity: 1, scale: 1 }, { x: "18%", scale: 0.88, opacity: 0.55, duration: 0.22 }, 0.42);
      tl.fromTo(".hero-s2-text, .hero-s2-connector, .hero-s2-accent-mark", { y: 0, opacity: 1 }, { opacity: 0, y: -40, duration: 0.14 }, 0.42);

      // Scene 3 enter
      tl.fromTo(".hero-s3-img", { clipPath: "inset(0 100% 0 0)", scale: 1.35, filter: "blur(14px)" }, { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "blur(0px)", duration: 0.28, ease: "power3.inOut" }, 0.48);

      tl.fromTo(".hero-s3-float", { opacity: 0, scale: 0.4, rotation: -60 }, { opacity: 1, scale: 1, rotation: 0, stagger: 0.1, duration: 0.18 }, 0.55);
      tl.fromTo(".hero-s3-img-accent", { clipPath: "inset(0 100% 0 0)", scale: 1.2, filter: "blur(10px)" }, { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "blur(0px)", duration: 0.2, ease: "power3.inOut" }, 0.6);

      tl.fromTo(".hero-s3-accent", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.14 }, 0.65);
      tl.fromTo(".hero-s3-label", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.12 }, 0.7);
      tl.fromTo(".hero-s3-heading-word", { y: "120%", opacity: 0, rotateX: -35 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.08, duration: 0.18 }, 0.75);
      tl.fromTo(".hero-s3-body", { y: 35, opacity: 0, filter: "blur(5px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.14 }, 0.85);
      tl.fromTo(".hero-s3-stat", { y: 30, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.14 }, 0.9);

      // Scene 3 exit
      tl.fromTo(".hero-s3-img", { clipPath: "inset(0 0% 0 0)", scale: 1 }, { clipPath: "inset(0 0 100% 0)", duration: 0.2 }, 1);
      tl.fromTo(".hero-s3-label, .hero-s3-heading-word, .hero-s3-body, .hero-s3-accent, .hero-s3-stat, .hero-s3-img-accent, .hero-s3-float", { y: 0, opacity: 1 }, { y: -60, opacity: 0, duration: 0.14 }, 1);

      // Scene 4 enter
      tl.fromTo(".hero-s4-bg", { opacity: 0 }, { opacity: 1, duration: 0.14 }, 1.05);
      tl.fromTo(".hero-s4-gradient-sweep", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.25, ease: "power2.inOut" }, 1.08);
      tl.fromTo(".hero-s4-particles", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, stagger: 0.06, duration: 0.12 }, 1.12);

      tl.fromTo(".hero-s4-line", { scaleX: 0, transformOrigin: "center" }, { scaleX: 1, duration: 0.18, ease: "power2.inOut" }, 1.16);
      tl.fromTo(".hero-s4-word", { y: "140%", opacity: 0, rotateX: -45 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.08, duration: 0.2, ease: "power4.out" }, 1.22);
      tl.fromTo(".hero-s4-sub", { y: 30, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.14 }, 1.35);
      tl.fromTo(".hero-s4-cta", { y: 30, opacity: 0, scale: 0.85 }, { y: 0, opacity: 1, scale: 1, duration: 0.14 }, 1.4);
      tl.fromTo(".hero-s4-pulse-ring", { scale: 0.8, opacity: 0.3 }, { scale: 1.5, opacity: 0, duration: 2, repeat: -1, ease: "power2.out" }, 1.4);

      // Mouse parallax on scene 2 images
      gsap.utils.toArray(".hero-s2-img-1, .hero-s2-img-2, .hero-s2-img-3").forEach((img, i) => {
        const depth = (i + 1) * 18;
        gsap.to(img as Element, {
          x: () => mouseRef.current.x * depth,
          y: () => mouseRef.current.y * depth,
          duration: 2,
          ease: "power2.out",
        });
      });

      // Magnetic title
      gsap.utils.toArray(".hero-entrance-title").forEach((title) => {
        const el = title as HTMLElement;
        el.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, { x: x * 0.05, y: y * 0.05, duration: 0.6, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
        });
      });

      // Magnetic CTA button
      const ctaBtn = document.querySelector(".hero-s4-cta") as HTMLElement;
      if (ctaBtn) {
        ctaBtn.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = ctaBtn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(ctaBtn, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power2.out" });
          gsap.to(ctaBtn.querySelector(".cta-btn-inner"), { scale: 1.08, duration: 0.5 });
        });
        ctaBtn.addEventListener("mouseleave", () => {
          gsap.to(ctaBtn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
          gsap.to(ctaBtn.querySelector(".cta-btn-inner"), { scale: 1, duration: 0.7 });
        });
      }
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray(".hero-mobile-particle").forEach((p, i) => {
        gsap.to(p as Element, {
          y: `random(-50, 50)`,
          x: `random(-35, 35)`,
          opacity: `random(0.06, 0.2)`,
          scale: `random(0.8, 1.5)`,
          duration: `random(6, 10)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.25,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Scene 1 exit -> Scene 2 enter
      tl.fromTo(".hero-entrance-title-letter", { y: 0, opacity: 1 }, { y: -70, opacity: 0, stagger: 0.03, duration: 0.15, ease: "power2.in" }, 0);
      tl.fromTo(".hero-entrance-label, .hero-entrance-line, .hero-entrance-subtitle, .hero-entrance-scroll", { y: 0, opacity: 1 }, { opacity: 0, y: -35, duration: 0.14 }, 0);
      tl.fromTo(".hero-entrance-img", { scale: 1, clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)", filter: "blur(0px) brightness(1)" }, { scale: 1.12, clipPath: "inset(0 0 0 50%)", filter: "brightness(0.85)", duration: 0.32 }, 0);

      tl.fromTo(".hero-s2-img-1-m", { y: "100%", opacity: 0, scale: 0.8 }, { y: "0%", opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 0.05);
      tl.fromTo(".hero-s2-img-2-m", { y: "100%", opacity: 0, scale: 0.8 }, { y: "0%", opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 0.15);
      tl.fromTo(".hero-s2-img-3-m", { y: "100%", opacity: 0, scale: 0.8 }, { y: "0%", opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 0.25);

      tl.fromTo(".hero-s2-text-m", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25 }, 0.35);

      // Scene 2 exit -> Scene 3 enter
      tl.fromTo(".hero-s2-img-1-m", { y: "0%", opacity: 1, scale: 1 }, { y: "-8%", scale: 0.9, opacity: 0.6, duration: 0.2 }, 0.5);
      tl.fromTo(".hero-s2-img-2-m", { y: "0%", opacity: 1, scale: 1 }, { y: "-4%", scale: 0.9, opacity: 0.6, duration: 0.2 }, 0.5);
      tl.fromTo(".hero-s2-img-3-m", { y: "0%", opacity: 1, scale: 1 }, { y: "-8%", scale: 0.9, opacity: 0.6, duration: 0.2 }, 0.5);
      tl.fromTo(".hero-s2-text-m", { y: 0, opacity: 1 }, { opacity: 0, y: -25, duration: 0.15 }, 0.5);

      tl.fromTo(".hero-s3-img-m", { clipPath: "inset(0 100% 0 0)", scale: 1.2 }, { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 0.35, ease: "power3.inOut" }, 0.55);
      tl.fromTo(".hero-s3-accent-m", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.2 }, 0.65);
      tl.fromTo(".hero-s3-label-m", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.15 }, 0.7);
      tl.fromTo(".hero-s3-heading-word-m", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.1, duration: 0.25 }, 0.75);
      tl.fromTo(".hero-s3-body-m", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, 0.9);
      tl.fromTo(".hero-s3-stat-m", { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.2 }, 0.95);
      tl.fromTo(".hero-s3-float-m", { opacity: 0, scale: 0.5, rotation: -45 }, { opacity: 1, scale: 1, rotation: 0, stagger: 0.12, duration: 0.2 }, 0.8);

      // Scene 3 exit -> Scene 4 enter
      tl.fromTo(".hero-s3-img-m", { clipPath: "inset(0 0% 0 0)", scale: 1 }, { clipPath: "inset(0 0 100% 0)", duration: 0.25 }, 1.15);
      tl.fromTo(".hero-s3-label-m, .hero-s3-heading-word-m, .hero-s3-body-m, .hero-s3-accent-m, .hero-s3-stat-m, .hero-s3-float-m", { y: 0, opacity: 1 }, { y: -40, opacity: 0, duration: 0.15 }, 1.15);

      tl.fromTo(".hero-s4-bg-m", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.2);
      tl.fromTo(".hero-s4-gradient-sweep-m", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.3, ease: "power2.inOut" }, 1.25);
      tl.fromTo(".hero-s4-line-m", { scaleX: 0, transformOrigin: "center" }, { scaleX: 1, duration: 0.2, ease: "power2.inOut" }, 1.3);
      tl.fromTo(".hero-s4-word-m", { y: "100%", opacity: 0, rotateX: -30 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.1, duration: 0.25, ease: "power4.out" }, 1.35);
      tl.fromTo(".hero-s4-sub-m", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, 1.5);
      tl.fromTo(".hero-s4-cta-m", { y: 25, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.2 }, 1.55);
      tl.fromTo(".hero-s4-particles-m", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, stagger: 0.08, duration: 0.15 }, 1.4);
    });

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, { scope: section });

  return (
    <section id="hero" ref={section} className="relative bg-bg overflow-hidden">
      <div className="divider" />

      {/* Mouse-following spotlight (desktop only) */}
      <div
        ref={spotlightRef}
        className="hidden md:block absolute pointer-events-none z-10"
        style={{
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 105, 20, 0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "50%",
          willChange: "transform",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {heroParticles.map((p, i) => (
          <div key={i} className="hero-particle absolute rounded-full bg-accent" style={{ width: `${p.size}px`, height: `${p.size}px`, left: p.left, top: p.top, opacity: p.opacity }} />
        ))}
        {mobileParticles.map((p, i) => (
          <div key={`m-${i}`} className="hero-mobile-particle absolute rounded-full bg-accent md:hidden" style={{ width: `${p.size}px`, height: `${p.size}px`, left: p.left, top: p.top, opacity: p.opacity }} />
        ))}
      </div>

      {/* Accent lines (desktop only) */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden md:block hidden">
        <div className="hero-accent-line absolute top-[20%] left-[15%] w-[1px] h-32 bg-accent/20 origin-center" />
        <div className="hero-accent-line absolute bottom-[25%] right-[20%] w-[1px] h-24 bg-text/10 origin-center" />
        <div className="hero-accent-line absolute top-[40%] right-[30%] w-20 h-[1px] bg-accent/15 origin-center" />
        <div className="hero-accent-line absolute top-[60%] left-[25%] w-16 h-[1px] bg-text/10 origin-center" />
        <div className="hero-accent-line absolute bottom-[35%] right-[15%] w-[1px] h-20 bg-accent/15 origin-center" />
      </div>

      {/* Main pinned container */}
      <div ref={pinContainer} className="relative" style={{ height: "100dvh" }}>
        {/* Scene 1: Entrance */}
        <div className="hero-entrance absolute inset-0 overflow-hidden">
          <div className="hero-entrance-img absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${images[0]}")` }} />
          <div className="hero-entrance-overlay absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-bg/20" style={{ opacity: 0 }} />
          <div className="hero-grain absolute inset-0 pointer-events-none" style={{ opacity: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, mixBlendMode: "multiply" }} />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <div className="hero-entrance-line w-20 h-[1px] bg-accent mx-auto" style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)", transform: "scaleX(0)", opacity: 0 }} />
            <p className="hero-entrance-label t-label text-accent tracking-[0.35em]" style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)", opacity: 0 }}>Curated Materials & Design</p>
            <h1 className="hero-entrance-title t-giant text-text" style={{ overflow: "visible" }}>
              {"The Raw Select".split("").map((l, i) => (
                <span key={i} className="hero-entrance-title-letter inline-block" style={{ opacity: 0 }}>
                  {l === " " ? "\u00A0" : l}
                </span>
              ))}
            </h1>
            <p className="hero-entrance-subtitle t-body-lg mt-6 max-w-md mx-auto px-4" style={{ opacity: 0 }}>Where intention meets material — every selection elevated.</p>
            <div className="hero-entrance-scroll absolute bottom-12 flex items-center gap-4" style={{ opacity: 0 }}>
              <div className="scroll-line scroll-bounce" />
              <span className="t-caption text-text-30">Scroll to explore</span>
            </div>
          </div>
        </div>

        {/* Scene 2: Image Collage */}
        <div className="hero-s2 absolute inset-0 overflow-hidden pointer-events-none">
          {/* Desktop images */}
          <div className="hero-s2-img-1 absolute top-[8%] left-[6%] w-[32%] aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl md:block hidden" style={{ opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[1]}")` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/25 to-transparent" />
            <div className="absolute inset-0 border border-text/10" style={{ margin: "clamp(0.75rem, 1.5vw, 1rem)" }} />
          </div>
          <div className="hero-s2-img-2 absolute bottom-[12%] left-[32%] w-[26%] aspect-square overflow-hidden rounded-full shadow-2xl md:block hidden" style={{ opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[2]}")` }} />
            <div className="absolute inset-0 border-2 border-accent/20" />
          </div>
          <div className="hero-s2-img-3 absolute top-[12%] right-[8%] w-[28%] aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl md:block hidden" style={{ opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[3]}")` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/25 to-transparent" />
            <div className="absolute inset-0 border border-text/10" style={{ margin: "clamp(0.75rem, 1.5vw, 1rem)" }} />
          </div>

          {/* Mobile images */}
          <div className="hero-s2-img-1-m absolute inset-0 flex flex-col items-center justify-center gap-4 md:hidden px-6" style={{ opacity: 0 }}>
            <div className="w-full max-w-[280px] aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[1]}")` }} />
            </div>
            <div className="w-32 h-32 overflow-hidden rounded-full shadow-2xl">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[2]}")` }} />
            </div>
            <div className="w-full max-w-[240px] aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[3]}")` }} />
            </div>
          </div>

          {/* Desktop connectors */}
          <div className="hero-s2-connector absolute top-[35%] left-[38%] w-24 h-[1px] bg-accent/30 origin-left md:block hidden" style={{ opacity: 0 }} />
          <div className="hero-s2-connector absolute top-[50%] left-[58%] w-20 h-[1px] bg-accent/20 origin-left md:block hidden" style={{ opacity: 0 }} />
          <div className="hero-s2-accent-mark absolute top-[15%] right-[35%] w-8 h-8 rounded-full border border-accent/40 md:block hidden" style={{ opacity: 0 }} />

          {/* Desktop text */}
          <div className="hero-s2-text absolute bottom-[12%] left-[6%] max-w-md md:block hidden" style={{ opacity: 0 }}>
            <p className="t-h2 text-text/80 italic">Every material tells a story.</p>
            <p className="t-body-lg mt-4">We curate only those that speak with clarity, purpose, and enduring quality.</p>
          </div>

          {/* Mobile text */}
          <div className="hero-s2-text-m absolute bottom-[4%] left-0 right-0 text-center px-6 md:hidden" style={{ opacity: 0 }}>
            <p className="t-h2 text-text/80 italic">Every material tells a story.</p>
            <p className="t-body-lg mt-2">We curate only those that speak with clarity and purpose.</p>
          </div>
        </div>

        {/* Scene 3: Philosophy */}
        <div className="hero-s3 absolute inset-0 overflow-hidden pointer-events-none">
          {/* Desktop background */}
          <div className="hero-s3-img absolute inset-0 bg-cover bg-center md:block hidden" style={{ backgroundImage: `url("${images[4]}")` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-bg/25 to-transparent md:block hidden" />

          {/* Mobile background */}
          <div className="hero-s3-img-m absolute inset-0 bg-cover bg-center md:hidden" style={{ backgroundImage: `url("${images[4]}")` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/30 md:hidden" />

          {/* Desktop floating elements */}
          <div className="hero-s3-float absolute top-[15%] right-[12%] w-16 h-16 rounded-full border border-accent/15 md:block hidden" style={{ opacity: 0 }} />
          <div className="hero-s3-float absolute bottom-[20%] left-[8%] w-12 h-12 rounded-full bg-accent-dim md:block hidden" style={{ opacity: 0 }} />

          {/* Mobile floating elements */}
          <div className="hero-s3-float-m absolute top-[10%] right-[10%] w-12 h-12 rounded-full border border-accent/15 md:hidden" style={{ opacity: 0 }} />
          <div className="hero-s3-float-m absolute bottom-[15%] left-[6%] w-10 h-10 rounded-full bg-accent-dim md:hidden" style={{ opacity: 0 }} />

          {/* Desktop content */}
          <div className="relative z-10 h-full flex items-center md:block hidden">
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
                  <p className="hero-s3-body t-body-lg max-w-md" style={{ opacity: 0 }}>In an industry overwhelmed by endless choices, true quality comes from refined selection.</p>
                  <div className="flex items-center gap-8 mt-12 flex-wrap">
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
                <div className="lg:col-span-5 lg:col-start-8">
                  <div className="hero-s3-img-accent relative w-full aspect-[3/4] overflow-hidden rounded-2xl" style={{ opacity: 0 }}>
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${images[3]}")` }} />
                    <div className="absolute inset-0 border border-text/10" style={{ margin: "clamp(1rem, 2vw, 1.5rem)" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile content */}
          <div className="relative z-10 h-full flex items-center md:hidden">
            <div className="px-6 w-full">
              <div className="hero-s3-accent-m w-12 h-[1px] bg-accent origin-left mx-auto" style={{ marginBottom: "1.5rem", transform: "scaleX(0)", opacity: 0 }} />
              <p className="hero-s3-label-m t-label text-accent tracking-[0.35em] text-center" style={{ marginBottom: "1.5rem", opacity: 0 }}>Our Philosophy</p>
              <div className="text-center" style={{ marginBottom: "2rem" }}>
                <div className="overflow-hidden" style={{ marginBottom: "0.15rem" }}>
                  <h2 className="hero-s3-heading-word-m t-h1 text-text">Design with</h2>
                </div>
                <div className="overflow-hidden">
                  <h2 className="hero-s3-heading-word-m t-h1 text-accent italic">intention.</h2>
                </div>
              </div>
              <p className="hero-s3-body-m t-body-lg text-center" style={{ opacity: 0, marginBottom: "2rem" }}>True quality comes from refined selection.</p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="hero-s3-stat-m text-center" style={{ opacity: 0 }}>
                  <p className="t-stat text-text" style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}>500+</p>
                  <p className="t-label text-text-30 mt-1">Materials</p>
                </div>
                <div className="w-[1px] h-8 bg-text-08" />
                <div className="hero-s3-stat-m text-center" style={{ opacity: 0 }}>
                  <p className="t-stat text-text" style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}>120+</p>
                  <p className="t-label text-text-30 mt-1">Projects</p>
                </div>
                <div className="w-[1px] h-8 bg-text-08" />
                <div className="hero-s3-stat-m text-center" style={{ opacity: 0 }}>
                  <p className="t-stat text-text" style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}>98%</p>
                  <p className="t-label text-text-30 mt-1">Retention</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scene 4: CTA */}
        <div className="hero-s4 absolute inset-0 overflow-hidden pointer-events-none">
          {/* Desktop bg */}
          <div className="hero-s4-bg absolute inset-0 bg-bg md:block hidden" style={{ opacity: 0 }} />
          <div className="hero-s4-gradient-sweep absolute inset-0 bg-gradient-to-r from-accent-dim via-transparent to-accent-dim origin-left md:block hidden" style={{ opacity: 0 }} />

          {/* Mobile bg */}
          <div className="hero-s4-bg-m absolute inset-0 bg-bg md:hidden" style={{ opacity: 0 }} />
          <div className="hero-s4-gradient-sweep-m absolute inset-0 bg-gradient-to-r from-accent-dim via-transparent to-accent-dim origin-left md:hidden" style={{ opacity: 0 }} />

          {/* Desktop particles */}
          <div className="hero-s4-particles absolute inset-0 pointer-events-none md:block hidden">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="absolute rounded-full bg-accent" style={{ width: `${(i % 4) + 2}px`, height: `${(i % 4) + 2}px`, left: `${(i * 10.5) % 100}%`, top: `${(i * 13.3) % 100}%`, opacity: 0.08 }} />
            ))}
          </div>

          {/* Mobile particles */}
          <div className="hero-s4-particles-m absolute inset-0 pointer-events-none md:hidden">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="absolute rounded-full bg-accent" style={{ width: `${(i % 3) + 2}px`, height: `${(i % 3) + 2}px`, left: `${(i * 16.5) % 100}%`, top: `${(i * 18.3) % 100}%`, opacity: 0.06 }} />
            ))}
          </div>

          {/* Pulse ring behind CTA */}
          <div className="hero-s4-pulse-ring absolute pointer-events-none" style={{ width: "200px", height: "200px", borderRadius: "50%", border: "1px solid var(--color-accent/20)", top: "50%", left: "50%", transform: "translate(-50%, -50%) scale(0.8)", opacity: 0 }} />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <div className="hero-s4-line hero-s4-line-m w-20 h-[1px] bg-accent mx-auto" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)", transform: "scaleX(0)" }} />
            <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
              <div className="overflow-hidden" style={{ marginBottom: "0.2rem" }}>
                <h2 className="hero-s4-word hero-s4-word-m t-display text-text">Ready to</h2>
              </div>
              <div className="overflow-hidden" style={{ marginBottom: "0.2rem" }}>
                <h2 className="hero-s4-word hero-s4-word-m t-display text-text">specify</h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="hero-s4-word hero-s4-word-m t-display text-accent italic">with intent?</h2>
              </div>
            </div>
            <p className="hero-s4-sub hero-s4-sub-m t-body-lg max-w-lg mx-auto px-4" style={{ opacity: 0, marginBottom: "clamp(3rem, 6vw, 4rem)" }}>
              Tell us about your project. We&apos;ll respond with a curated selection tailored to your brief.
            </p>
            <a href="/contact" className="hero-s4-cta hero-s4-cta-m inline-flex items-center gap-3 text-sm font-medium text-accent tap-active" style={{ opacity: 0, padding: "clamp(1rem, 2.5vw, 1.5rem) clamp(2rem, 4vw, 3rem)", borderRadius: "9999px", border: "1px solid var(--color-accent/30)" }}>
              <span className="cta-btn-inner inline-flex items-center gap-3">
                <span>Start a Project</span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-accent/30">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
