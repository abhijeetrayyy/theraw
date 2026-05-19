"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { title: "Surfaces", desc: "Stone, porcelain, sintered stone, natural slabs — selected for visual depth and structural performance.", img: "/photo-1606744824163-985d376605aa.avif", tag: "120+ options" },
  { title: "Finishes", desc: "Metals, lacquers, textures, patinas. The details that elevate a space from well-designed to unforgettable.", img: "/photo-1606744837616-56c9a5c6a6eb.avif", tag: "85+ options" },
  { title: "Systems", desc: "Modular solutions, architectural hardware, integrated components. Engineered for seamless specification.", img: "/premium_photo-1681113076872-c74b8926e70c.avif", tag: "60+ options" },
  { title: "Bespoke", desc: "When the standard isn't enough. Custom material solutions for projects that demand something no catalog provides.", img: "/premium_photo-1670360414483-64e6d9ba9038.avif", tag: "Made to order" },
];

export default function Collection() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Floating particles
    gsap.utils.toArray(".coll-particle").forEach((p, i) => {
      gsap.to(p as Element, { y: `random(-60, 60)`, x: `random(-40, 40)`, opacity: `random(0.1, 0.4)`, duration: `random(4, 7)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.4 });
    });

    mm.add("(min-width: 768px)", () => {
      const el = track.current;
      if (!el) return;
      const cards = el.querySelectorAll(".coll-card");
      if (!cards.length) return;
      let totalW = 0;
      cards.forEach((c) => { totalW += (c as HTMLElement).offsetWidth + 32; });
      totalW -= 32;
      totalW += window.innerWidth * 0.5;
      totalW += window.innerWidth * 0.05;
      const scrollDist = totalW - window.innerWidth;
      if (scrollDist <= 0) return;
      const tween = gsap.to(el, { x: -scrollDist, ease: "none" });
      ScrollTrigger.create({ trigger: section.current, start: "top top", end: () => `+=${scrollDist * 1.2}`, pin: true, animation: tween, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 });

      cards.forEach((card) => {
        const inner = card.querySelector(".coll-card-inner") as HTMLElement;
        if (!inner) return;
        gsap.fromTo(inner,
          { scale: 0.8, opacity: 0.2, rotateY: 12 },
          { scale: 1, opacity: 1, rotateY: 0, ease: "power2.out", scrollTrigger: { trigger: card, start: "left 90%", end: "left 40%", scrub: 0.5, containerAnimation: tween } }
        );
      });
    });

    // Header entrance
    const headerTl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 60%" } });
    headerTl.fromTo(".coll-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut", transformOrigin: "left" }, 0);
    headerTl.fromTo(".coll-label-word", { y: "100%", opacity: 0, rotateX: -45 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.06, duration: 0.9, ease: "power3.out" }, 0.1);
    headerTl.fromTo(".coll-heading-word", { y: "130%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.1, duration: 1.4, ease: "power4.out" }, 0.2);
    headerTl.fromTo(".coll-sub", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.7);
  }, { scope: section });

  return (
    <section id="collection" ref={section} className="h-screen w-full bg-bg-2 overflow-hidden flex items-center relative">
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="h-full w-[55%] bg-gradient-to-r from-bg-2 via-bg-2/70 to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="coll-particle absolute rounded-full" style={{ width: `${Math.random() * 4 + 2}px`, height: `${Math.random() * 4 + 2}px`, background: i % 3 === 0 ? "var(--color-accent)" : "var(--color-text-15)", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.3 + 0.1 }} />
        ))}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-0 z-20 pointer-events-none">
        <div className="wrap">
          <div className="max-w-md">
            <div className="coll-line w-14 h-[1px] bg-accent origin-left" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }} />
            <span className="t-label text-accent tracking-[0.35em] block" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>The Collection</span>
            <div className="coll-heading">
              <div className="overflow-hidden" style={{ marginBottom: "0.25rem" }}><h2 className="t-h1 text-text">{"Materials".split(" ").map((w, i) => (<span key={i} className="coll-heading-word inline-block mr-[0.3em]">{w}</span>))}</h2></div>
              <div className="overflow-hidden" style={{ marginBottom: "0.25rem" }}><h2 className="t-h1 text-text">{"that".split(" ").map((w, i) => (<span key={i} className="coll-heading-word inline-block mr-[0.3em]">{w}</span>))}</h2></div>
              <div className="overflow-hidden"><h2 className="t-h1 text-accent italic">{"speak.".split(" ").map((w, i) => (<span key={i} className="coll-heading-word inline-block mr-[0.3em]">{w}</span>))}</h2></div>
            </div>
            <p className="coll-sub t-body text-text-30 max-w-xs" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>Each category is a deliberate edit — not a catalog.</p>
          </div>
        </div>
      </div>

      <div ref={track} className="flex items-center" style={{ gap: "clamp(2rem, 4vw, 3rem)" }}>
        <div className="shrink-0" style={{ width: "50vw" }} />
        {categories.map((cat, i) => (
          <div key={i} className="coll-card relative shrink-0 overflow-hidden cursor-pointer group" style={{ width: "clamp(320px, 40vw, 600px)", height: "clamp(50vh, 62vh, 75vh)" }}>
            <div className="coll-card-inner absolute inset-0">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]" style={{ backgroundImage: `url(${cat.img})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
            </div>
            <div className="absolute bottom-0 left-0 w-full z-10" style={{ padding: "clamp(2.5rem, 5vw, 4rem)" }}>
              <div className="flex items-center" style={{ gap: "clamp(1rem, 2vw, 1.5rem)", marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                <span className="t-label text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div className="w-10 h-[1px] bg-accent/40" />
                <span className="t-label text-text-30">{cat.tag}</span>
              </div>
              <h3 className="t-h3 text-text" style={{ marginBottom: "clamp(1rem, 2vw, 1.5rem)" }}>{cat.title}</h3>
              <p className="text-[0.85rem] text-text-30 max-w-[300px] leading-relaxed opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">{cat.desc}</p>
            </div>
          </div>
        ))}
        <div className="shrink-0" style={{ width: "5vw" }} />
      </div>
    </section>
  );
}
