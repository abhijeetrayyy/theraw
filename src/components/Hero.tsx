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

    // Cinematic entrance
    const entranceTl = gsap.timeline({ delay: 0.5 });

    entranceTl.fromTo(".hero-main-img",
      { clipPath: "inset(0 100% 0 0)", scale: 1.2, filter: "blur(20px)" },
      { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "blur(0px)", duration: 2.5, ease: "power4.inOut" }, 0
    );

    entranceTl.fromTo(".hero-overlay-gradient", { opacity: 0 }, { opacity: 1, duration: 2 }, 0.5);

    entranceTl.fromTo(".hero-label", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 1);

    entranceTl.fromTo(".hero-title-line",
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, stagger: 0.12, duration: 1.4, ease: "power4.out" }, 1.2
    );

    entranceTl.fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 1.8);

    entranceTl.fromTo(".hero-scroll-hint", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 2.2);

    mm.add("(min-width: 1024px)", () => {
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

      // Scene 1 exit
      tl.to(".hero-title-line", { y: "-100%", opacity: 0, stagger: 0.05, duration: 0.15, ease: "power2.in" }, 0);
      tl.to(".hero-label, .hero-subtitle, .hero-scroll-hint", { opacity: 0, y: -40, duration: 0.12 }, 0);
      tl.to(".hero-main-img", { clipPath: "inset(0 0 0 60%)", filter: "brightness(0.6)", duration: 0.3 }, 0);

      // Scene 2 enter
      tl.fromTo(".hero-s2-img-left", { x: "-100%", opacity: 0, rotateY: 15 }, { x: "0%", opacity: 1, rotateY: 0, duration: 0.25, ease: "power3.out" }, 0.05);
      tl.fromTo(".hero-s2-img-right", { x: "100%", opacity: 0, rotateY: -15 }, { x: "0%", opacity: 1, rotateY: 0, duration: 0.25, ease: "power3.out" }, 0.1);
      tl.fromTo(".hero-s2-img-center", { scale: 0.5, opacity: 0, rotate: 10 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.25, ease: "power3.out" }, 0.15);

      tl.fromTo(".hero-s2-text", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, 0.3);

      // Scene 2 exit
      tl.to(".hero-s2-img-left", { x: "-30%", scale: 0.8, opacity: 0.4, duration: 0.2 }, 0.45);
      tl.to(".hero-s2-img-right", { x: "30%", scale: 0.8, opacity: 0.4, duration: 0.2 }, 0.45);
      tl.to(".hero-s2-img-center", { y: "-30%", scale: 0.8, opacity: 0.4, duration: 0.2 }, 0.45);
      tl.to(".hero-s2-text", { opacity: 0, y: -30, duration: 0.15 }, 0.45);

      // Scene 3 enter
      tl.fromTo(".hero-s3-img", { clipPath: "inset(0 100% 0 0)", scale: 1.3 }, { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 0.3, ease: "power3.inOut" }, 0.5);
      tl.fromTo(".hero-s3-label", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.15 }, 0.6);
      tl.fromTo(".hero-s3-heading", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.25 }, 0.65);
      tl.fromTo(".hero-s3-body", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, 0.75);
      tl.fromTo(".hero-s3-stat", { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.15 }, 0.8);

      // Scene 3 exit
      tl.to(".hero-s3-img", { clipPath: "inset(0 0 100% 0)", duration: 0.2 }, 0.95);
      tl.to(".hero-s3-label, .hero-s3-heading, .hero-s3-body, .hero-s3-stat", { y: -50, opacity: 0, duration: 0.15 }, 0.95);

      // Scene 4 enter
      tl.fromTo(".hero-s4-bg", { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1);
      tl.fromTo(".hero-s4-line", { scaleX: 0 }, { scaleX: 1, duration: 0.2, ease: "power2.inOut" }, 1.05);
      tl.fromTo(".hero-s4-heading", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.1, duration: 0.25, ease: "power4.out" }, 1.1);
      tl.fromTo(".hero-s4-sub", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, 1.3);
      tl.fromTo(".hero-s4-cta", { y: 25, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.2 }, 1.35);

      // Mouse parallax on scene 2
      gsap.utils.toArray(".hero-s2-img-left, .hero-s2-img-right, .hero-s2-img-center").forEach((img, i) => {
        const depth = (i + 1) * 15;
        gsap.to(img as Element, {
          x: () => mouseRef.current.x * depth,
          y: () => mouseRef.current.y * depth,
          duration: 2,
          ease: "power2.out",
        });
      });

      // Magnetic CTA
      const ctaBtn = document.querySelector(".hero-s4-cta") as HTMLElement;
      if (ctaBtn) {
        ctaBtn.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = ctaBtn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(ctaBtn, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power2.out" });
        });
        ctaBtn.addEventListener("mouseleave", () => {
          gsap.to(ctaBtn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
        });
      }
    });

    mm.add("(max-width: 1023px)", () => {
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

      tl.to(".hero-title-line", { y: "-80%", opacity: 0, stagger: 0.05, duration: 0.15, ease: "power2.in" }, 0);
      tl.to(".hero-label, .hero-subtitle, .hero-scroll-hint", { opacity: 0, y: -30, duration: 0.12 }, 0);
      tl.to(".hero-main-img", { clipPath: "inset(0 0 0 50%)", duration: 0.3 }, 0);

      tl.fromTo(".hero-s2-img-m", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.3, ease: "power3.out" }, 0.05);
      tl.fromTo(".hero-s2-text-m", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25 }, 0.3);

      tl.to(".hero-s2-img-m", { y: "-10%", scale: 0.9, opacity: 0.6, duration: 0.2 }, 0.5);
      tl.to(".hero-s2-text-m", { opacity: 0, y: -20, duration: 0.15 }, 0.5);

      tl.fromTo(".hero-s3-img-m", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.35, ease: "power3.inOut" }, 0.55);
      tl.fromTo(".hero-s3-label-m", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.15 }, 0.65);
      tl.fromTo(".hero-s3-heading-m", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.25 }, 0.7);
      tl.fromTo(".hero-s3-body-m", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, 0.85);
      tl.fromTo(".hero-s3-stat-m", { y: 15, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.15 }, 0.9);

      tl.to(".hero-s3-img-m", { clipPath: "inset(0 0 100% 0)", duration: 0.25 }, 1.1);
      tl.to(".hero-s3-label-m, .hero-s3-heading-m, .hero-s3-body-m, .hero-s3-stat-m", { y: -30, opacity: 0, duration: 0.15 }, 1.1);

      tl.fromTo(".hero-s4-bg-m", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.15);
      tl.fromTo(".hero-s4-line-m", { scaleX: 0 }, { scaleX: 1, duration: 0.2 }, 1.2);
      tl.fromTo(".hero-s4-heading-m", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.1, duration: 0.25 }, 1.25);
      tl.fromTo(".hero-s4-sub-m", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, 1.4);
      tl.fromTo(".hero-s4-cta-m", { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.2 }, 1.45);
    });

    return () => window.removeEventListener("mousemove", onMouseMove);
  }, { scope: section });

  return (
    <section id="hero" ref={section} className="relative bg-bg overflow-hidden">
      <div className="divider" />

      <div ref={pinContainer} className="relative" style={{ height: "100dvh" }}>
        {/* Scene 1: Main Hero */}
        <div className="hero-scene-1 absolute inset-0 overflow-hidden">
          {/* Full-bleed background image */}
          <div className="hero-main-img absolute inset-0" style={{ backgroundImage: `url("${images[0]}")`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="hero-overlay-gradient absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" style={{ opacity: 0 }} />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
            <div className="max-w-4xl">
              <p className="hero-label t-label text-accent tracking-[0.35em] mb-6" style={{ opacity: 0 }}>Curated Materials & Design</p>
              <h1 className="hero-title overflow-hidden">
                <div className="overflow-hidden">
                  <span className="hero-title-line block t-giant text-text leading-[0.85] tracking-tight" style={{ opacity: 0 }}>The Raw</span>
                </div>
                <div className="overflow-hidden">
                  <span className="hero-title-line block t-giant text-accent italic leading-[0.85] tracking-tight" style={{ opacity: 0 }}>Select</span>
                </div>
              </h1>
              <p className="hero-subtitle t-body-lg mt-6 max-w-md" style={{ opacity: 0 }}>Where intention meets material — every selection elevated.</p>
            </div>

            <div className="hero-scroll-hint absolute bottom-6 md:bottom-12 right-6 md:right-12 flex items-center gap-3" style={{ opacity: 0 }}>
              <div className="scroll-line scroll-bounce" />
              <span className="t-caption text-text-30">Scroll</span>
            </div>
          </div>
        </div>

        {/* Scene 2: Image Collage */}
        <div className="hero-scene-2 absolute inset-0 overflow-hidden pointer-events-none">
          {/* Desktop: asymmetric collage */}
          <div className="hero-s2-img-left hidden md:block absolute top-[10%] left-[8%] w-[35%] aspect-[3/4] overflow-hidden rounded-sm shadow-2xl" style={{ opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[1]}")` }} />
          </div>
          <div className="hero-s2-img-center hidden md:block absolute top-[5%] left-[48%] w-[28%] aspect-square overflow-hidden rounded-full shadow-2xl" style={{ opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[2]}")` }} />
          </div>
          <div className="hero-s2-img-right hidden md:block absolute bottom-[10%] right-[8%] w-[30%] aspect-[4/5] overflow-hidden rounded-sm shadow-2xl" style={{ opacity: 0 }}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[3]}")` }} />
          </div>

          {/* Mobile: stacked images */}
          <div className="hero-s2-img-m md:hidden absolute inset-0 flex flex-col items-center justify-center gap-4 px-6" style={{ opacity: 0 }}>
            <div className="w-full max-w-[300px] aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${images[1]}")` }} />
            </div>
          </div>

          {/* Text */}
          <div className="hero-s2-text absolute bottom-[8%] left-6 md:left-12 lg:left-20 max-w-md md:block hidden" style={{ opacity: 0 }}>
            <p className="t-h2 text-text/80 italic">Every material tells a story.</p>
          </div>
          <div className="hero-s2-text-m md:hidden absolute bottom-[8%] left-0 right-0 text-center px-6" style={{ opacity: 0 }}>
            <p className="t-h2 text-text/80 italic">Every material tells a story.</p>
          </div>
        </div>

        {/* Scene 3: Philosophy */}
        <div className="hero-scene-3 absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-s3-img hidden md:block absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${images[4]}")` }} />
          <div className="hero-s3-img-m md:hidden absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${images[4]}")` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/50 to-transparent md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/40 md:hidden" />

          {/* Desktop content */}
          <div className="relative z-10 h-full flex items-center md:block hidden">
            <div className="wrap" style={{ maxWidth: "1440px", marginInline: "auto", paddingInline: "clamp(1.5rem, 5vw, 6rem)" }}>
              <div className="max-w-2xl">
                <p className="hero-s3-label t-label text-accent tracking-[0.35em] mb-6" style={{ opacity: 0 }}>Our Philosophy</p>
                <div className="overflow-hidden mb-2">
                  <h2 className="hero-s3-heading t-h1 text-text" style={{ opacity: 0 }}>Design with intention.</h2>
                </div>
                <p className="hero-s3-body t-body-lg mt-6 max-w-md" style={{ opacity: 0 }}>In an industry overwhelmed by endless choices, true quality comes from refined selection.</p>
                <div className="flex items-center gap-8 mt-10">
                  <div className="hero-s3-stat" style={{ opacity: 0 }}>
                    <p className="t-stat text-text">500+</p>
                    <p className="t-label text-text-30 mt-1">Materials</p>
                  </div>
                  <div className="w-[1px] h-10 bg-text-08" />
                  <div className="hero-s3-stat" style={{ opacity: 0 }}>
                    <p className="t-stat text-text">120+</p>
                    <p className="t-label text-text-30 mt-1">Projects</p>
                  </div>
                  <div className="w-[1px] h-10 bg-text-08" />
                  <div className="hero-s3-stat" style={{ opacity: 0 }}>
                    <p className="t-stat text-text">98%</p>
                    <p className="t-label text-text-30 mt-1">Retention</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile content */}
          <div className="relative z-10 h-full flex items-center md:hidden">
            <div className="px-6 w-full text-center">
              <p className="hero-s3-label-m t-label text-accent tracking-[0.35em] mb-4" style={{ opacity: 0 }}>Our Philosophy</p>
              <div className="overflow-hidden mb-2">
                <h2 className="hero-s3-heading-m t-h1 text-text" style={{ opacity: 0 }}>Design with intention.</h2>
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

        {/* Scene 4: CTA */}
        <div className="hero-scene-4 absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hero-s4-bg hidden md:block absolute inset-0 bg-bg" style={{ opacity: 0 }} />
          <div className="hero-s4-bg-m md:hidden absolute inset-0 bg-bg" style={{ opacity: 0 }} />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <div className="hero-s4-line hero-s4-line-m w-16 h-[1px] bg-accent mx-auto mb-8" style={{ transform: "scaleX(0)" }} />
            <div className="overflow-hidden mb-1">
              <h2 className="hero-s4-heading hero-s4-heading-m t-display text-text" style={{ opacity: 0 }}>Ready to</h2>
            </div>
            <div className="overflow-hidden mb-1">
              <h2 className="hero-s4-heading hero-s4-heading-m t-display text-text" style={{ opacity: 0 }}>specify</h2>
            </div>
            <div className="overflow-hidden mb-8">
              <h2 className="hero-s4-heading hero-s4-heading-m t-display text-accent italic" style={{ opacity: 0 }}>with intent?</h2>
            </div>
            <p className="hero-s4-sub hero-s4-sub-m t-body-lg max-w-lg mx-auto mb-10" style={{ opacity: 0 }}>
              Tell us about your project. We&apos;ll respond with a curated selection.
            </p>
            <a href="/contact" className="hero-s4-cta hero-s4-cta-m inline-flex items-center gap-3 text-sm font-medium text-accent tap-active" style={{ opacity: 0, padding: "1rem 2.5rem", borderRadius: "9999px", border: "1px solid var(--color-accent/30)" }}>
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
    </section>
  );
}
