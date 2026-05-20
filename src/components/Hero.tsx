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

function splitLetters(text: string) {
  return text.split("").map((l, i) => (
    <span key={i} className="hero-letter inline-block">{l === " " ? "\u00A0" : l}</span>
  ));
}

function splitWords(text: string) {
  return text.split(" ").map((w, i) => (
    <span key={i} className="hero-word inline-block mr-[0.25em]">{w}</span>
  ));
}

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const pinContainer = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const particleContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Standalone entrance (plays once on load, no scroll trigger) ──
    const entranceTl = gsap.timeline({ delay: 0.3 });

    entranceTl.fromTo(".hero-img-main",
      { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
      { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.8, ease: "power4.inOut" }, 0
    );

    entranceTl.fromTo(".hero-grain",
      { opacity: 0 },
      { opacity: 0.06, duration: 1.2, ease: "power2.out" }, 0.3
    );
    entranceTl.to(".hero-grain", { opacity: 0.035, duration: 0.6 }, 1.2);

    entranceTl.fromTo(".hero-vignette", { opacity: 0 }, { opacity: 0.3, duration: 1, ease: "power2.out" }, 0.5);

    entranceTl.fromTo(".hero-accent-line",
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.inOut" }, 0.4
    );

    entranceTl.fromTo(".hero-letter",
      { y: "120%", opacity: 0, rotateX: -70 },
      { y: "0%", opacity: 1, rotateX: 0, stagger: 0.04, duration: 0.8, ease: "power4.out" }, 0.6
    );

    entranceTl.fromTo(".hero-label", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.5);
    entranceTl.fromTo(".hero-subtitle", { y: 20, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }, 0.8);
    entranceTl.fromTo(".hero-scroll", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 1.1);
    entranceTl.fromTo(".hero-stat", { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.5, ease: "power3.out" }, 1.2);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // ── Scene 1: Entrance (0.00 - 0.25) ──

      // 1. Diagonal wipe reveal
      tl.fromTo(".hero-img-main",
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", scale: 1.1 },
        { clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)", scale: 1, duration: 0.15, ease: "power4.inOut" },
        0
      );

      // 2. Film grain overlay
      tl.fromTo(".hero-grain",
        { opacity: 0 },
        { opacity: 0.06, duration: 0.08, ease: "power2.out" },
        0.05
      );
      tl.to(".hero-grain",
        { opacity: 0.035, duration: 0.04 },
        0.12
      );

      // 3. Headline letters stagger
      tl.fromTo(".hero-letter",
        { y: "120%", opacity: 0, rotateX: -70 },
        { y: "0%", opacity: 1, rotateX: 0, stagger: 0.04, duration: 0.12, ease: "power4.out" },
        0.08
      );

      // 4. Accent line draws from center, then splits
      tl.fromTo(".hero-accent-line",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.08, ease: "power2.inOut" },
        0.05
      );

      // 5. Vignette overlay
      tl.fromTo(".hero-vignette",
        { opacity: 0 },
        { opacity: 0.3, duration: 0.1, ease: "power2.out" },
        0.1
      );

      // Label, subtitle, scroll
      tl.fromTo(".hero-label", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.08, ease: "power3.out" }, 0.1);
      tl.fromTo(".hero-subtitle", { y: 20, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.08, ease: "power3.out" }, 0.14);
      tl.fromTo(".hero-scroll", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.06, ease: "power3.out" }, 0.18);

      // ── Scene 1 → 2 Transition (0.20 - 0.40) ──

      // Exit scene 1
      tl.to(".hero-letter", { y: "-100%", opacity: 0, stagger: 0.02, duration: 0.06, ease: "power2.in" }, 0.2);
      tl.to(".hero-label, .hero-subtitle, .hero-scroll, .hero-accent-line, .hero-vignette, .hero-grain", { opacity: 0, duration: 0.04 }, 0.2);
      tl.to(".hero-img-main", { clipPath: "inset(0 0 0 55%)", filter: "brightness(0.45)", scale: 1.05, duration: 0.1, ease: "power2.inOut" }, 0.22);

      // 6. Staggered clip-path reveals from different directions
      tl.fromTo(".hero-s2-img-1",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.08, ease: "power4.inOut" },
        0.25
      );
      tl.fromTo(".hero-s2-img-2",
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        { clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 0.08, ease: "power4.inOut" },
        0.27
      );
      tl.fromTo(".hero-s2-img-3",
        { clipPath: "inset(0 0 0 100%)", opacity: 0 },
        { clipPath: "inset(0 0 0 0%)", opacity: 1, duration: 0.08, ease: "power4.inOut" },
        0.29
      );

      // 8. Connector lines draw progressively
      tl.fromTo(".hero-s2-line-1", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.06, ease: "power2.inOut" }, 0.31);
      tl.fromTo(".hero-s2-line-2", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.06, ease: "power2.inOut" }, 0.33);

      // 7. Parallax depth — set via onUpdate later
      tl.to({}, { duration: 0.01 }); // placeholder

      // Scene 2 text
      tl.fromTo(".hero-s2-text", { y: 35, opacity: 0, filter: "blur(4px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.07, ease: "power3.out" }, 0.32);

      // 9. Floating accent shape with orbital motion
      tl.fromTo(".hero-s2-orbit",
        { scale: 0, opacity: 0, rotation: 0 },
        { scale: 1, opacity: 1, rotation: 360, duration: 0.15, ease: "none" },
        0.26
      );

      // ── Scene 2 → 3 Transition (0.40 - 0.75) ──

      // 10. Exit fragmentation
      tl.to(".hero-s2-img-1", { x: "-20%", scale: 0.85, opacity: 0.4, duration: 0.06, ease: "power3.in" }, 0.4);
      tl.to(".hero-s2-img-2", { y: "-15%", scale: 0.85, opacity: 0.4, duration: 0.06, ease: "power3.in" }, 0.4);
      tl.to(".hero-s2-img-3", { x: "20%", scale: 0.85, opacity: 0.4, duration: 0.06, ease: "power3.in" }, 0.4);
      tl.to(".hero-s2-text, .hero-s2-line-1, .hero-s2-line-2, .hero-s2-orbit", { opacity: 0, duration: 0.04 }, 0.4);

      // 11. Scene 3: background parallax zoom (starts zoomed in, pulls back)
      tl.fromTo(".hero-s3-img",
        { clipPath: "inset(0 0 0 0)", scale: 1.2 },
        { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 0.15, ease: "power3.inOut" },
        0.44
      );

      // 15. Vertical accent line
      tl.fromTo(".hero-s3-vline",
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.1, ease: "power2.inOut" },
        0.48
      );

      // 12. Word-level stagger on "Design with intention."
      tl.fromTo(".hero-word",
        { y: "120%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.06, duration: 0.1, ease: "power4.out" },
        0.5
      );

      // Scene 3 label + body
      tl.fromTo(".hero-s3-label", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.06 }, 0.5);
      tl.fromTo(".hero-s3-body", { y: 25, opacity: 0, filter: "blur(4px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.08, ease: "power3.out" }, 0.55);

      // 13. Stats count-up with scrub
      tl.to({}, { duration: 0.3 });
      gsap.utils.toArray<HTMLElement>(".hero-s3-stat-num").forEach((el) => {
        const target = el.getAttribute("data-target");
        if (!target) return;
        const numTarget = parseFloat(target);
        const isPercent = target.includes("%");
        ScrollTrigger.create({
          trigger: ".hero-scene-3",
          start: "top 60%",
          end: "top 20%",
          scrub: 1,
          onUpdate: (self) => {
            const val = Math.round(self.progress * numTarget);
            el.textContent = isPercent ? `${val}%` : `${val}+`;
          },
        });
      });

      // 14. Stat cards flip-in
      tl.fromTo(".hero-s3-stat-card",
        { rotationX: 90, opacity: 0 },
        { rotationX: 0, opacity: 1, stagger: 0.06, duration: 0.08, ease: "power3.out" },
        0.6
      );

      // Scene 3 exit
      tl.to(".hero-s3-img", { clipPath: "inset(0 0 100% 0)", duration: 0.08 }, 0.7);
      tl.to(".hero-s3-label, .hero-word, .hero-s3-body, .hero-s3-stat-card, .hero-s3-vline", { y: -30, opacity: 0, duration: 0.06 }, 0.72);

      // ── Scene 4: CTA (0.75 - 1.00) ──

      // 16. Gradient sweep background
      tl.fromTo(".hero-s4-bg",
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.75
      );
      tl.fromTo(".hero-s4-gradient",
        { backgroundPosition: "100% 100%" },
        { backgroundPosition: "0% 0%", duration: 0.2, ease: "power2.inOut" },
        0.76
      );

      // Accent line
      tl.fromTo(".hero-s4-line", { scaleX: 0 }, { scaleX: 1, duration: 0.06, ease: "power2.inOut" }, 0.78);

      // Headline stagger
      tl.fromTo(".hero-s4-heading",
        { y: "120%", opacity: 0 },
        { y: "0%", opacity: 1, stagger: 0.06, duration: 0.1, ease: "power4.out" },
        0.8
      );

      // Subtitle
      tl.fromTo(".hero-s4-sub", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.07, ease: "power3.out" }, 0.85);

      // 18. Pulse ring behind button
      tl.fromTo(".hero-s4-ring",
        { scale: 0, opacity: 0.4 },
        { scale: 2.5, opacity: 0, duration: 0.12, ease: "power2.out" },
        0.88
      );

      // 17. Magnetic CTA button appears
      tl.fromTo(".hero-s4-cta", { y: 25, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 0.08, ease: "power3.out" }, 0.9);

      // ── Post-timeline: continuous animations ──

      // 7. Parallax depth within scene 2 (continuous during that scene's active window)
      gsap.utils.toArray<HTMLElement>([".hero-s2-img-1", ".hero-s2-img-2", ".hero-s2-img-3"]).forEach((img, i) => {
        const depths = [15, 25, 35];
        gsap.to(img, {
          yPercent: -5 + i * 5,
          ease: "none",
          scrollTrigger: {
            trigger: pinContainer.current,
            start: "top 20%",
            end: "top 40%",
            scrub: 0.8,
          },
        });
      });

      // 9. Orbital rotation continuous
      gsap.to(".hero-s2-orbit-inner", {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".hero-s2-orbit-inner", {
        scale: 1.15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 18. Pulse ring continuous
      gsap.to(".hero-s4-ring", {
        scale: 2.5,
        opacity: 0,
        duration: 2.5,
        repeat: -1,
        ease: "power2.out",
        delay: 1,
      });

      // 17. Magnetic button with particle burst
      const ctaBtn = document.querySelector(".hero-s4-cta") as HTMLElement;
      if (ctaBtn) {
        ctaBtn.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = ctaBtn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(ctaBtn, { x: x * 0.35, y: y * 0.35, duration: 0.5, ease: "power2.out" });
          gsap.to(ctaBtn, { scale: 1.04, duration: 0.3, ease: "power2.out" });
        });
        ctaBtn.addEventListener("mouseleave", () => {
          gsap.to(ctaBtn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
          gsap.to(ctaBtn, { scale: 1, duration: 0.5, ease: "power2.out" });
        });
        // Particle burst on hover
        const burstParticles = () => {
          if (!particleContainer.current || !ctaBtn.matches(":hover")) return;
          for (let i = 0; i < 8; i++) {
            const p = document.createElement("div");
            p.className = "hero-particle";
            const size = 2 + Math.random() * 3;
            const angle = (Math.PI * 2 / 8) * i;
            const dist = 30 + Math.random() * 40;
            p.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:var(--color-accent);left:50%;top:50%;pointer-events:none;`;
            particleContainer.current.appendChild(p);
            gsap.fromTo(p,
              { x: 0, y: 0, opacity: 0.6, scale: 1 },
              {
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                opacity: 0,
                scale: 0,
                duration: 0.6 + Math.random() * 0.4,
                ease: "power2.out",
                onComplete: () => p.remove(),
              }
            );
          }
        };
        ctaBtn.addEventListener("mouseenter", burstParticles);
      }

      // 19. Scroll velocity reactivity — affects film grain opacity
      let grainTween: gsap.core.Tween | null = null;
      ScrollTrigger.create({
        trigger: pinContainer.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const grainBoost = Math.min(0.06, velocity / 4000);
          if (grainTween) grainTween.kill();
          grainTween = gsap.to(".hero-grain", { opacity: 0.035 + grainBoost, duration: 0.2, ease: "power2.out" });
        },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      // 20. Mobile: simplified narrative, fewer particles
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

      // Scene 1 entrance
      tl.fromTo(".hero-img-main",
        { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
        { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 0.2, ease: "power4.inOut" },
        0
      );
      tl.fromTo(".hero-vignette", { opacity: 0 }, { opacity: 0.25, duration: 0.1 }, 0.05);
      tl.fromTo(".hero-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.08 }, 0.08);
      tl.fromTo(".hero-letter", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.03, duration: 0.1, ease: "power4.out" }, 0.1);
      tl.fromTo(".hero-subtitle", { y: 15, opacity: 0, filter: "blur(4px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.08 }, 0.15);
      tl.fromTo(".hero-scroll", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.06 }, 0.18);

      // Scene 1 exit → Scene 2
      tl.to(".hero-letter", { y: "-80%", opacity: 0, stagger: 0.02, duration: 0.06 }, 0.22);
      tl.to(".hero-label, .hero-subtitle, .hero-scroll, .hero-vignette", { opacity: 0, y: -20, duration: 0.04 }, 0.22);
      tl.to(".hero-img-main", { clipPath: "inset(0 0 0 50%)", duration: 0.08 }, 0.24);

      tl.fromTo(".hero-s2-img-m", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.12, ease: "power3.out" }, 0.26);
      tl.fromTo(".hero-s2-text-m", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.08 }, 0.32);

      tl.to(".hero-s2-img-m", { y: "-10%", scale: 0.9, opacity: 0.6, duration: 0.08 }, 0.42);
      tl.to(".hero-s2-text-m", { opacity: 0, y: -15, duration: 0.06 }, 0.42);

      // Scene 3
      tl.fromTo(".hero-s3-img-m", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.15, ease: "power3.inOut" }, 0.46);
      tl.fromTo(".hero-s3-label-m", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.06 }, 0.5);
      tl.fromTo(".hero-word", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.05, duration: 0.1, ease: "power4.out" }, 0.52);
      tl.fromTo(".hero-s3-body-m", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.06 }, 0.56);
      tl.fromTo(".hero-s3-stat-m", { y: 15, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.06 }, 0.58);

      tl.to(".hero-s3-img-m", { clipPath: "inset(0 0 100% 0)", duration: 0.1 }, 0.68);
      tl.to(".hero-s3-label-m, .hero-word, .hero-s3-body-m, .hero-s3-stat-m", { y: -25, opacity: 0, duration: 0.06 }, 0.7);

      // Scene 4
      tl.fromTo(".hero-s4-bg-m", { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.72);
      tl.fromTo(".hero-s4-line-m", { scaleX: 0 }, { scaleX: 1, duration: 0.06 }, 0.74);
      tl.fromTo(".hero-s4-heading-m", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.06, duration: 0.1, ease: "power4.out" }, 0.76);
      tl.fromTo(".hero-s4-sub-m", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.06 }, 0.82);
      tl.fromTo(".hero-s4-cta-m", { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.06 }, 0.84);
    });
  }, { scope: section });

  return (
    <section id="hero" ref={section} className="relative bg-bg">
      <div className="divider" />

      <div ref={pinContainer} className="relative" style={{ height: "100dvh" }}>
        {/* ───────── Scene 1: Entrance ───────── */}
        <div className="hero-scene-1 absolute inset-0 overflow-hidden">
          {/* Background image */}
          <div className="hero-img-main absolute inset-0 will-change-transform" style={{ backgroundImage: `url("${images[0]}")`, backgroundSize: "cover", backgroundPosition: "center" }} />

          {/* 2. Film grain overlay */}
          <div ref={grainRef} className="hero-grain absolute inset-0 z-20 pointer-events-none" style={{ opacity: 0, mixBlendMode: "multiply" }}>
            <svg className="w-full h-full">
              <filter id="hero-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#hero-grain)" />
            </svg>
          </div>

          {/* 5. Vignette overlay */}
          <div className="hero-vignette absolute inset-0 z-15 pointer-events-none" style={{ opacity: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)" }} />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent z-10" />

          {/* 4. Accent line */}
          <div className="hero-accent-line absolute top-[20%] left-1/2 -translate-x-1/2 w-24 h-[1px] bg-accent/60 origin-center z-20" style={{ transform: "scaleX(0)", opacity: 0 }} />

          {/* Main content - bottom left */}
          <div className="relative z-20 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20" style={{ paddingBottom: "clamp(7rem, 10vw, 10rem)" }}>
            <div className="max-w-5xl">
              <p className="hero-label t-label text-accent tracking-[0.35em] mb-4 md:mb-6" style={{ opacity: 0 }}>Curated Materials & Design</p>
              <h1 className="hero-title overflow-hidden">
                <div className="overflow-hidden mb-1" style={{ perspective: "800px" }}>
                  <span className="inline-block">{splitLetters("The Raw")}</span>
                </div>
                <div className="overflow-hidden" style={{ perspective: "800px" }}>
                  <span className="inline-block text-accent italic">{splitLetters("Select")}</span>
                </div>
              </h1>
              <p className="hero-subtitle t-body-lg mt-4 md:mt-6 max-w-lg" style={{ opacity: 0 }}>Where intention meets material — every selection elevated.</p>
            </div>
          </div>

          {/* Stats bar - full width at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-text/10 bg-bg/90 backdrop-blur-md">
            <div className="flex items-stretch" style={{ height: "clamp(5rem, 8vw, 7rem)" }}>
              <div className="hero-stat flex-1 flex flex-col items-center justify-center border-r border-text/10" style={{ opacity: 0 }}>
                <p className="t-stat text-text" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1 }}>500+</p>
                <p className="t-label text-text-30 mt-1">Materials</p>
              </div>
              <div className="hero-stat flex-1 flex flex-col items-center justify-center border-r border-text/10" style={{ opacity: 0 }}>
                <p className="t-stat text-text" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1 }}>120+</p>
                <p className="t-label text-text-30 mt-1">Projects</p>
              </div>
              <div className="hero-stat flex-1 flex flex-col items-center justify-center" style={{ opacity: 0 }}>
                <p className="t-stat text-text" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1 }}>98%</p>
                <p className="t-label text-text-30 mt-1">Retention</p>
              </div>
            </div>
          </div>

          {/* Scroll indicator - top right */}
          <div className="hero-scroll absolute top-6 md:top-12 right-6 md:right-12 flex items-center gap-3 z-20" style={{ opacity: 0 }}>
            <span className="t-caption text-text-30">Scroll</span>
            <div className="scroll-line scroll-bounce" />
          </div>
        </div>

        {/* ───────── Scene 2: Collage ───────── */}
        <div className="hero-scene-2 absolute inset-0 overflow-hidden pointer-events-none">
          {/* 6. Three images from different directions */}
          <div className="hero-s2-img-1 hidden md:block absolute top-[12%] left-[8%] w-[28%] aspect-[3/4] overflow-hidden rounded-sm shadow-2xl will-change-transform" style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[1]}")` }} />
          </div>
          <div className="hero-s2-img-2 hidden md:block absolute bottom-[15%] left-[40%] w-[24%] aspect-square overflow-hidden rounded-full shadow-2xl will-change-transform" style={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[2]}")` }} />
          </div>
          <div className="hero-s2-img-3 hidden md:block absolute top-[8%] right-[8%] w-[25%] aspect-[4/5] overflow-hidden rounded-sm shadow-2xl will-change-transform" style={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[3]}")` }} />
          </div>

          {/* 8. Connector lines */}
          <div className="hero-s2-line-1 hidden md:block absolute top-[45%] left-[36%] w-[6%] h-[1px] bg-accent/30 origin-left" style={{ transform: "scaleX(0)", opacity: 0 }} />
          <div className="hero-s2-line-2 hidden md:block absolute top-[55%] left-[36%] w-[4%] h-[1px] bg-accent/20 origin-left" style={{ transform: "scaleX(0)", opacity: 0 }} />

          {/* 9. Floating accent shape with orbital motion */}
          <div className="hero-s2-orbit hidden md:block absolute top-[48%] left-[36%] w-12 h-12 pointer-events-none" style={{ opacity: 0 }}>
            <div className="hero-s2-orbit-inner w-full h-full rounded-full border border-accent/40" style={{ transformOrigin: "center" }} />
          </div>

          {/* Mobile collage */}
          <div className="hero-s2-img-m md:hidden absolute inset-0 flex flex-col items-center justify-center gap-4 px-6" style={{ opacity: 0 }}>
            <div className="w-full max-w-[280px] aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[1]}")` }} />
            </div>
            <div className="w-28 h-28 overflow-hidden rounded-full shadow-2xl">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[2]}")` }} />
            </div>
          </div>

          {/* Scene 2 text */}
          <div className="hero-s2-text hidden md:block absolute bottom-[10%] left-6 md:left-12 lg:left-20 max-w-md" style={{ opacity: 0 }}>
            <p className="t-h2 text-text/80 italic">Every material tells a story.</p>
          </div>
          <div className="hero-s2-text-m md:hidden absolute bottom-[6%] left-0 right-0 text-center px-6" style={{ opacity: 0 }}>
            <p className="t-h2 text-text/80 italic">Every material tells a story.</p>
          </div>
        </div>

        {/* ───────── Scene 3: Philosophy ───────── */}
        <div className="hero-scene-3 absolute inset-0 overflow-hidden pointer-events-none">
          {/* 11. Background with parallax zoom */}
          <div className="hero-s3-img hidden md:block absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: `url("${images[4]}")` }} />
          <div className="hero-s3-img-m md:hidden absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${images[4]}")` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/85 via-bg/50 to-transparent md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/40 md:hidden" />

          {/* 15. Vertical accent line */}
          <div className="hero-s3-vline hidden md:block absolute left-[clamp(1.5rem,5vw,6rem)] top-[15%] w-[1px] bg-accent/40 origin-top" style={{ height: "clamp(6rem, 10vw, 10rem)", transform: "scaleY(0)", opacity: 0 }} />

          <div className="relative z-10 h-full flex items-center md:block hidden">
            <div className="wrap" style={{ maxWidth: "1440px", marginInline: "auto", paddingInline: "clamp(1.5rem, 5vw, 6rem)" }}>
              <div className="max-w-xl">
                <p className="hero-s3-label t-label text-accent tracking-[0.35em] mb-4 md:mb-6" style={{ opacity: 0 }}>Our Philosophy</p>
                <div className="overflow-hidden mb-2" style={{ perspective: "800px" }}>
                  <h2 className="inline-block">{splitWords("Design with intention.")}</h2>
                </div>
                <p className="hero-s3-body t-body-lg mt-4 md:mt-6 max-w-md" style={{ opacity: 0 }}>In an industry overwhelmed by endless choices, true quality comes from refined selection.</p>
                <div className="flex items-center gap-6 md:gap-8 mt-8 md:mt-10">
                  <div className="hero-s3-stat-card" style={{ opacity: 0 }}>
                    <p className="hero-s3-stat-num t-stat text-text" data-target="500">0</p>
                    <p className="t-label text-text-30 mt-1">Materials</p>
                  </div>
                  <div className="w-[1px] h-8 md:h-10 bg-text-08" />
                  <div className="hero-s3-stat-card" style={{ opacity: 0 }}>
                    <p className="hero-s3-stat-num t-stat text-text" data-target="120">0</p>
                    <p className="t-label text-text-30 mt-1">Projects</p>
                  </div>
                  <div className="w-[1px] h-8 md:h-10 bg-text-08" />
                  <div className="hero-s3-stat-card" style={{ opacity: 0 }}>
                    <p className="hero-s3-stat-num t-stat text-text" data-target="98%">0</p>
                    <p className="t-label text-text-30 mt-1">Retention</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 h-full flex items-center md:hidden">
            <div className="px-6 w-full text-center">
              <p className="hero-s3-label-m t-label text-accent tracking-[0.35em] mb-4" style={{ opacity: 0 }}>Our Philosophy</p>
              <div className="overflow-hidden mb-2" style={{ perspective: "800px" }}>
                <h2 className="inline-block">{splitWords("Design with intention.")}</h2>
              </div>
              <p className="hero-s3-body-m t-body-lg mt-4" style={{ opacity: 0 }}>True quality comes from refined selection.</p>
              <div className="flex items-center justify-center gap-4 mt-8">
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

        {/* ───────── Scene 4: CTA ───────── */}
        <div className="hero-scene-4 absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-s4-bg hidden md:block absolute inset-0 bg-bg" style={{ opacity: 0 }} />
          <div className="hero-s4-bg-m md:hidden absolute inset-0 bg-bg" style={{ opacity: 0 }} />

          {/* 16. Gradient sweep */}
          <div className="hero-s4-gradient hidden md:block absolute inset-0" style={{ opacity: 0.6, background: "linear-gradient(135deg, var(--color-accent-dim) 0%, var(--color-bg) 50%, var(--color-accent-subtle) 100%)", backgroundSize: "200% 200%", backgroundPosition: "100% 100%" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, var(--color-accent-dim) 0%, transparent 70%)" }} />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            {/* 18. Pulse ring (behind button area) */}
            <div className="hero-s4-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-accent/30 pointer-events-none" style={{ transform: "scale(0)", opacity: 0.4 }} />

            <div className="hero-s4-line hero-s4-line-m w-16 h-[1px] bg-accent mx-auto mb-6 md:mb-8" style={{ transform: "scaleX(0)" }} />
            <div className="overflow-hidden mb-1">
              <h2 className="hero-s4-heading hero-s4-heading-m t-display text-text" style={{ opacity: 0 }}>Ready to</h2>
            </div>
            <div className="overflow-hidden mb-1">
              <h2 className="hero-s4-heading hero-s4-heading-m t-display text-text" style={{ opacity: 0 }}>specify</h2>
            </div>
            <div className="overflow-hidden mb-6 md:mb-8">
              <h2 className="hero-s4-heading hero-s4-heading-m t-display text-accent italic" style={{ opacity: 0 }}>with intent?</h2>
            </div>
            <p className="hero-s4-sub hero-s4-sub-m t-body-lg max-w-lg mx-auto mb-8 md:mb-10" style={{ opacity: 0 }}>
              Tell us about your project. We&apos;ll respond with a curated selection.
            </p>

            {/* 17. CTA button with magnetic + particle container */}
            <div ref={particleContainer} className="relative inline-flex">
              <a href="/contact" className="hero-s4-cta hero-s4-cta-m relative inline-flex items-center gap-3 text-sm font-medium text-accent tap-active" style={{ opacity: 0, padding: "1rem 2.5rem", borderRadius: "9999px", border: "1px solid var(--color-accent/30)", willChange: "transform" }}>
                <span>Start a Project</span>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-accent/30">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
