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
    // Floating particles
    gsap.utils.toArray(".cta-particle").forEach((p, i) => {
      gsap.to(p as Element, { y: `random(-80, 80)`, x: `random(-50, 50)`, opacity: `random(0.1, 0.35)`, duration: `random(4, 7)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.3 });
    });

    // Background gradient pulse
    gsap.to(".cta-glow", { scale: 1.15, opacity: 0.15, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Side image entrances
    const tl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 60%" } });
    tl.fromTo(".cta-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut", transformOrigin: "left" }, 0);
    tl.fromTo(".cta-label-word", { y: "100%", opacity: 0, rotateX: -45 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.06, duration: 0.9, ease: "power3.out" }, 0.1);
    tl.fromTo(".cta-heading-word", { y: "130%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.08, duration: 1.4, ease: "power4.out" }, 0.2);
    tl.fromTo(".cta-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.8);
    tl.fromTo(".cta-btn-wrap", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 1);

    // Side images slide in with clip-path reveals
    tl.fromTo(".cta-side-img-left",
      { clipPath: "inset(0 100% 0 0)", scale: 1.1, filter: "blur(8px)" },
      { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "blur(0px)", duration: 1.6, ease: "power3.inOut" },
      0.3
    );
    tl.fromTo(".cta-side-img-right",
      { clipPath: "inset(0 0 0 100%)", scale: 1.1, filter: "blur(8px)" },
      { clipPath: "inset(0 0 0 0%)", scale: 1, filter: "blur(0px)", duration: 1.6, ease: "power3.inOut" },
      0.4
    );
    tl.fromTo(".cta-accent-img",
      { clipPath: "circle(0% at 50% 50%)", scale: 0.8, opacity: 0 },
      { clipPath: "circle(100% at 50% 50%)", scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
      0.5
    );

    // Image parallax
    gsap.utils.toArray(".cta-img-parallax").forEach((img) => {
      const el = img as Element;
      gsap.to((el as HTMLElement).querySelector("div"), {
        yPercent: -15, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // Magnetic button effect
    const btn = btnRef.current;
    if (btn) {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: "power2.out" });
        gsap.to(btn.querySelector(".cta-btn-bg"), { scale: 1.04, duration: 0.4, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        gsap.to(btn.querySelector(".cta-btn-bg"), { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      });
    }
  }, { scope: section });

  return (
    <section ref={section} className="relative bg-bg overflow-hidden">
      <div className="divider" />

      {/* Background glow */}
      <div className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-dim blur-[120px] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="cta-particle absolute rounded-full" style={{ width: `${Math.random() * 4 + 2}px`, height: `${Math.random() * 4 + 2}px`, background: i % 3 === 0 ? "var(--color-accent)" : "var(--color-text-15)", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.2 + 0.05 }} />
        ))}
      </div>

      <div style={{ paddingTop: "clamp(10rem, 18vw, 20rem)", paddingBottom: "clamp(10rem, 18vw, 20rem)" }}>
        <div style={{ maxWidth: "1440px", marginInline: "auto", paddingInline: "clamp(1.5rem, 5vw, 6rem)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(3rem, 6vw, 6rem)", alignItems: "center" }}>
            {/* Left side image */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="cta-side-img-left cta-img-parallax relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: "url(/photo-1616046229478-9901c5536a45.avif)", height: "120%", top: "-10%" }} />
                <div className="absolute inset-0 bg-gradient-to-r from-bg/60 to-transparent" />
                <div className="absolute inset-0 border border-text-08" style={{ margin: "clamp(1rem, 2vw, 1.5rem)" }} />
              </div>
            </div>

            {/* Center content */}
            <div className="lg:col-span-6" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              {/* Accent image above label */}
              <div className="cta-accent-img relative w-20 h-20 rounded-full overflow-hidden mb-8 border border-text-08">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/photo-1618220179428-22790b461013.avif)" }} />
              </div>

              <div className="cta-line w-14 h-[1px] bg-accent origin-center" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)", marginInline: "auto" }} />
              <span className="t-label text-accent tracking-[0.35em]" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
                {"Get Started".split(" ").map((w, i) => (<span key={i} className="cta-label-word inline-block mr-[0.3em]">{w}</span>))}
              </span>

              <div style={{ marginBottom: "clamp(4rem, 8vw, 6rem)" }}>
                <div className="overflow-hidden" style={{ marginBottom: "0.25rem", display: "flex", justifyContent: "center" }}><h2 className="cta-heading-word t-h1 text-text">{"Ready".split(" ").map((w, i) => (<span key={i} className="inline-block mr-[0.3em]">{w}</span>))}</h2></div>
                <div className="overflow-hidden" style={{ marginBottom: "0.25rem", display: "flex", justifyContent: "center" }}><h2 className="cta-heading-word t-h1 text-text">{"to".split(" ").map((w, i) => (<span key={i} className="inline-block mr-[0.3em]">{w}</span>))}</h2></div>
                <div className="overflow-hidden" style={{ display: "flex", justifyContent: "center" }}><h2 className="cta-heading-word t-h1 text-accent italic">{"specify?".split(" ").map((w, i) => (<span key={i} className="inline-block mr-[0.3em]">{w}</span>))}</h2></div>
              </div>

              <p className="cta-sub t-body-lg" style={{ marginBottom: "clamp(4rem, 8vw, 6rem)", color: "rgba(26,26,26,0.4)", maxWidth: "42rem", textAlign: "center", marginInline: "auto" }}>Tell us about your project. We&apos;ll respond with a curated material selection tailored to your brief.</p>

              <div className="cta-btn-wrap" style={{ display: "flex", justifyContent: "center" }}>
                <a href="/contact" ref={btnRef} className="cta-btn relative inline-flex items-center justify-center" style={{ padding: "clamp(1.25rem, 3vw, 2rem) clamp(3rem, 6vw, 5rem)" }}>
                  <span className="cta-btn-bg absolute inset-0 bg-accent-dim border border-accent/30 rounded-full transition-all duration-500" />
                  <span className="t-label text-accent relative z-10 tracking-[0.25em]">Start a Project</span>
                  <svg className="relative z-10 ml-4 w-5 h-5 text-accent transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 20 20" fill="none"><path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5" /></svg>
                </a>
              </div>
            </div>

            {/* Right side image */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="cta-side-img-right cta-img-parallax relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: "url(/photo-1618221195710-dd6b41faaea6.avif)", height: "120%", top: "-10%" }} />
                <div className="absolute inset-0 bg-gradient-to-l from-bg/60 to-transparent" />
                <div className="absolute inset-0 border border-text-08" style={{ margin: "clamp(1rem, 2vw, 1.5rem)" }} />
              </div>
            </div>
          </div>

          {/* Bottom accent images */}
          <div className="hidden md:flex items-center justify-center" style={{ marginTop: "clamp(6rem, 12vw, 12rem)", gap: "clamp(1.5rem, 3vw, 3rem)" }}>
            <div className="rounded-lg overflow-hidden border border-text-08" style={{ width: "clamp(80px, 12vw, 140px)", height: "clamp(80px, 12vw, 140px)" }}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/photo-1583847268964-b28dc8f51f92.avif)" }} />
            </div>
            <div className="rounded-lg overflow-hidden border border-text-08" style={{ width: "clamp(100px, 15vw, 180px)", height: "clamp(100px, 15vw, 180px)" }}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/premium_photo-1681113076872-c74b8926e70c.avif)" }} />
            </div>
            <div className="rounded-lg overflow-hidden border border-text-08" style={{ width: "clamp(80px, 12vw, 140px)", height: "clamp(80px, 12vw, 140px)" }}>
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url(/photo-1567016376408-0226e4d0c1ea.avif)" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
    </section>
  );
}
