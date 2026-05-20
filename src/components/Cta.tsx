"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Cta() {
  const section = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Entrance
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top 65%",
        end: "top 25%",
        scrub: 1,
      },
    });

    entranceTl.fromTo(".cta-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
    entranceTl.fromTo(".cta-heading-line", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out" }, 0.15);
    entranceTl.fromTo(".cta-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.4);
    entranceTl.fromTo(".cta-btn-wrap", { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, 0.5);
    entranceTl.fromTo(".cta-line-accent", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.2);

    mm.add("(min-width: 1024px)", () => {
      // Side images
      entranceTl.fromTo(".cta-side-img-left",
        { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
        { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.4, ease: "power3.inOut" },
        0.3
      );
      entranceTl.fromTo(".cta-side-img-right",
        { clipPath: "inset(0 0 0 100%)", scale: 1.1 },
        { clipPath: "inset(0 0 0 0%)", scale: 1, duration: 1.4, ease: "power3.inOut" },
        0.4
      );

      // Accent image
      entranceTl.fromTo(".cta-accent-img",
        { clipPath: "circle(0% at 50% 50%)", scale: 0.7, opacity: 0 },
        { clipPath: "circle(100% at 50% 50%)", scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
        0.5
      );

      // Bottom images
      entranceTl.fromTo(".cta-bottom-img",
        { y: 40, opacity: 0, rotate: 8, scale: 0.85 },
        { y: 0, opacity: 1, rotate: 0, scale: 1, stagger: 0.12, duration: 0.8, ease: "power3.out" },
        0.7
      );

      // Parallax on side images
      gsap.utils.toArray(".cta-img-parallax").forEach((img) => {
        const el = img as Element;
        gsap.to((el as HTMLElement).querySelector("div"), {
          yPercent: -18, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Section exit
      gsap.to(".cta-heading-line", {
        y: -20,
        opacity: 0.4,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "bottom 15%", end: "bottom top", scrub: true },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      // Accent image
      entranceTl.fromTo(".cta-accent-img",
        { clipPath: "circle(0% at 50% 50%)", scale: 0.8, opacity: 0 },
        { clipPath: "circle(100% at 50% 50%)", scale: 1, opacity: 1, duration: 1, ease: "power3.out" },
        0.4
      );

      // Bottom images
      entranceTl.fromTo(".cta-bottom-img",
        { y: 30, opacity: 0, rotate: 6, scale: 0.9 },
        { y: 0, opacity: 1, rotate: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: "power3.out" },
        0.6
      );

      // Button touch feedback
      if (btnRef.current) {
        const btn = btnRef.current;
        btn.addEventListener("touchstart", () => {
          gsap.to(btn.querySelector(".cta-btn-bg"), { scale: 1.05, boxShadow: "0 0 20px var(--color-accent/20)", duration: 0.3 });
        }, { passive: true });
        btn.addEventListener("touchend", () => {
          gsap.to(btn.querySelector(".cta-btn-bg"), { scale: 1, boxShadow: "none", duration: 0.4 });
        }, { passive: true });
      }
    });

    // Magnetic button (desktop)
    const btn = btnRef.current;
    if (btn) {
      mm.add("(min-width: 1024px)", () => {
        btn.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power2.out" });
          gsap.to(btn.querySelector(".cta-btn-bg"), { scale: 1.06, duration: 0.5, ease: "power2.out" });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
          gsap.to(btn.querySelector(".cta-btn-bg"), { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.5)" });
        });
      });
    }
  }, { scope: section });

  return (
    <section ref={section} className="relative bg-bg overflow-hidden">
      <div className="divider" />

      {/* Accent line */}
      <div className="cta-line-accent absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-left" style={{ opacity: 0 }} />

      {/* Glow */}
      <div className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent-dim blur-[140px] pointer-events-none" />

      <div style={{ paddingTop: "clamp(8rem, 14vw, 16rem)", paddingBottom: "clamp(8rem, 14vw, 16rem)" }}>
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(3rem, 6vw, 6rem)", alignItems: "center" }}>
            {/* Left side image */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="cta-side-img-left cta-img-parallax relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
                <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: "url(/photo-1616046229478-9901c5536a45.avif)", height: "120%", top: "-10%" }} />
                <div className="absolute inset-0 bg-gradient-to-r from-bg/60 to-transparent" />
                <div className="absolute inset-0 border border-text-08" style={{ margin: "clamp(1rem, 2vw, 1.5rem)" }} />
              </div>
            </div>

            {/* Center content */}
            <div className="lg:col-span-6" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              {/* Accent image */}
              <div className="cta-accent-img relative w-24 h-24 rounded-full overflow-hidden mb-10 border border-text-08 shadow-lg" style={{ opacity: 0 }}>
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/photo-1618220179428-22790b461013.avif)" }} />
              </div>

              <p className="cta-label t-label text-accent tracking-[0.35em] mb-4 md:mb-6" style={{ opacity: 0 }}>Get Started</p>

              <h2 className="cta-heading mb-6 md:mb-8" style={{ lineHeight: 1 }}>
                <div className="overflow-hidden mb-1" style={{ display: "flex", justifyContent: "center" }}><span className="cta-heading-line block t-display text-text" style={{ opacity: 0 }}>Ready</span></div>
                <div className="overflow-hidden mb-1" style={{ display: "flex", justifyContent: "center" }}><span className="cta-heading-line block t-display text-text" style={{ opacity: 0 }}>to</span></div>
                <div className="overflow-hidden" style={{ display: "flex", justifyContent: "center" }}><span className="cta-heading-line block t-display text-accent italic" style={{ opacity: 0 }}>specify?</span></div>
              </h2>

              <p className="cta-sub t-body-lg mb-8 md:mb-10 max-w-lg mx-auto text-text-50" style={{ opacity: 0 }}>Tell us about your project. We&apos;ll respond with a curated material selection tailored to your brief.</p>

              <div className="cta-btn-wrap" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <a href="/contact" ref={btnRef} className="cta-btn relative inline-flex items-center justify-center tap-active w-full md:w-auto" style={{ padding: "clamp(1.25rem, 3vw, 2rem) clamp(3rem, 6vw, 5rem)", opacity: 0 }}
                   onTouchStart={() => { if (navigator.vibrate) navigator.vibrate(10); }}
                >
                  <span className="cta-btn-bg absolute inset-0 bg-accent-dim border border-accent/30 rounded-full transition-all duration-500" />
                  <span className="t-label text-accent relative z-10 tracking-[0.25em]">Start a Project</span>
                  <svg className="relative z-10 ml-4 w-5 h-5 text-accent transition-transform duration-500" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" /></svg>
                </a>
              </div>
            </div>

            {/* Right side image */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="cta-side-img-right cta-img-parallax relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
                <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: "url(/photo-1618221195710-dd6b41faaea6.avif)", height: "120%", top: "-10%" }} />
                <div className="absolute inset-0 bg-gradient-to-l from-bg/60 to-transparent" />
                <div className="absolute inset-0 border border-text-08" style={{ margin: "clamp(1rem, 2vw, 1.5rem)" }} />
              </div>
            </div>
          </div>

          {/* Bottom image thumbnails */}
          <div className="flex items-center justify-center mt-16 md:mt-24" style={{ gap: "clamp(1.5rem, 3vw, 3rem)" }}>
            <div className="cta-bottom-img rounded-sm overflow-hidden border border-text-08" style={{ width: "clamp(80px, 12vw, 140px)", height: "clamp(80px, 12vw, 140px)" }}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/photo-1583847268964-b28dc8f51f92.avif)" }} />
            </div>
            <div className="cta-bottom-img rounded-sm overflow-hidden border border-text-08" style={{ width: "clamp(100px, 15vw, 180px)", height: "clamp(100px, 15vw, 180px)" }}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/premium_photo-1681113076872-c74b8926e70c.avif)" }} />
            </div>
            <div className="cta-bottom-img rounded-sm overflow-hidden border border-text-08" style={{ width: "clamp(80px, 12vw, 140px)", height: "clamp(80px, 12vw, 140px)" }}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/photo-1567016376408-0226e4d0c1ea.avif)" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
    </section>
  );
}
