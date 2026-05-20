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

const collParticles = Array.from({ length: 12 }, (_, i) => ({
  w: (i % 4) * 1 + 2,
  h: (i % 3) * 1.5 + 2,
  bg: i % 3 === 0 ? "var(--color-accent)" : "var(--color-text-15)",
  left: `${(i * 8.3) % 100}%`,
  top: `${(i * 13.7) % 100}%`,
  opacity: 0.15 + (i % 5) * 0.05,
}));

const mobileParticles = Array.from({ length: 6 }, (_, i) => ({
  w: (i % 3) * 2 + 3,
  h: (i % 3) * 2 + 3,
  bg: i % 2 === 0 ? "var(--color-accent)" : "var(--color-text-15)",
  left: `${(i * 16.5) % 100}%`,
  top: `${(i * 18.3) % 100}%`,
  opacity: 0.2 + (i % 3) * 0.08,
}));

export default function Collection() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    gsap.utils.toArray(".coll-particle").forEach((p, i) => {
      gsap.to(p as Element, { y: `random(-70, 70)`, x: `random(-50, 50)`, opacity: `random(0.1, 0.4)`, duration: `random(5, 8)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: (i as number) * 0.5 });
    });

    mm.add("(min-width: 1024px)", () => {
      const headerTl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 55%", end: "top 15%", scrub: 1.5 } });
      headerTl.fromTo(".coll-line", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.4, ease: "power2.inOut", transformOrigin: "left" }, 0);
      headerTl.fromTo(".coll-label-word", { y: "120%", opacity: 0, rotateX: -60 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.08, duration: 1, ease: "power3.out" }, 0.15);
      headerTl.fromTo(".coll-heading-word", { y: "140%", opacity: 0, rotateX: -30 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.12, duration: 1.6, ease: "power4.out" }, 0.25);
      headerTl.fromTo(".coll-sub", { y: 30, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, 0.8);

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

      Array.from(cards).forEach((card) => {
        const el = card as HTMLElement;
        const inner = el.querySelector(".coll-card-inner") as HTMLElement;
        const tag = el.querySelector(".coll-card-tag") as HTMLElement;
        const title = el.querySelector(".coll-card-title") as HTMLElement;
        const desc = el.querySelector(".coll-card-desc") as HTMLElement;

        if (!inner) return;

        gsap.fromTo(inner,
          { scale: 0.75, opacity: 0, rotateY: 15 },
          { scale: 1, opacity: 1, rotateY: 0, ease: "power2.out", scrollTrigger: { trigger: el, start: "left 90%", end: "left 40%", scrub: 0.6, containerAnimation: tween } }
        );

        if (tag) {
          gsap.fromTo(tag,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: el, start: "left 85%", end: "left 50%", scrub: 0.5, containerAnimation: tween } }
          );
        }
        if (title) {
          gsap.fromTo(title,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "left 80%", end: "left 55%", scrub: 0.5, containerAnimation: tween } }
          );
        }
        if (desc) {
          gsap.fromTo(desc,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: el, start: "left 75%", end: "left 60%", scrub: 0.5, containerAnimation: tween } }
          );
        }

        el.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / centerY * -3.5;
          const rotateY = (x - centerX) / centerX * 3.5;

          gsap.to(el, { rotateX, rotateY, duration: 0.5, ease: "power2.out", transformPerspective: 1200 });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power2.out" });
        });
      });

      if (headerRef.current) {
        gsap.to(headerRef.current, {
          opacity: 0,
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: "top 25%",
            scrub: true,
          },
        });
      }
    });

    mm.add("(max-width: 1023px)", () => {
      const headerTl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 55%", end: "top 15%", scrub: 1.5 } });
      headerTl.fromTo(".coll-line", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.4, ease: "power2.inOut", transformOrigin: "left" }, 0);
      headerTl.fromTo(".coll-label-word", { y: "120%", opacity: 0, rotateX: -60 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.08, duration: 1, ease: "power3.out" }, 0.15);
      headerTl.fromTo(".coll-heading-word", { y: "140%", opacity: 0, rotateX: -30 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.12, duration: 1.6, ease: "power4.out" }, 0.25);
      headerTl.fromTo(".coll-sub", { y: 30, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, 0.8);

      gsap.utils.toArray(".coll-mobile-particle").forEach((p, i) => {
        gsap.to(p as Element, { y: `random(-30, 30)`, x: `random(-20, 20)`, opacity: `random(0.15, 0.35)`, duration: `random(4, 7)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: (i as number) * 0.4 });
      });

      const cards = gsap.utils.toArray(".coll-card") as HTMLElement[];
      cards.forEach((card) => {
        const el = card as HTMLElement;
        const inner = el.querySelector(".coll-card-inner") as HTMLElement;
        const tag = el.querySelector(".coll-card-tag") as HTMLElement;
        const title = el.querySelector(".coll-card-title") as HTMLElement;
        const badge = el.querySelector(".coll-card-badge") as HTMLElement;

        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%", end: "top 15%", scrub: 1.2 } });

        if (badge) tl.fromTo(badge, { scale: 0, opacity: 0, rotation: -180 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(3)" }, 0);
        if (inner) tl.fromTo(inner, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }, 0.1);
        if (tag) tl.fromTo(tag, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.3);
        if (title) tl.fromTo(title, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.35);

        // Mobile touch feedback
        el.addEventListener("touchstart", () => {
          if (navigator.vibrate) navigator.vibrate(5);
          const desc = el.querySelector(".coll-card-desc") as HTMLElement;
          const imgInner = el.querySelector(".coll-card-inner div") as HTMLElement;
          if (desc) {
            const isOpen = desc.getAttribute("data-open") === "true";
            if (isOpen) {
              gsap.to(desc, { maxHeight: 0, opacity: 0, duration: 0.4, ease: "power2.out" });
              desc.setAttribute("data-open", "false");
              if (imgInner) gsap.to(imgInner, { scale: 1, duration: 0.5 });
            } else {
              gsap.to(desc, { maxHeight: 200, opacity: 1, duration: 0.5, ease: "power2.out" });
              desc.setAttribute("data-open", "true");
              if (imgInner) gsap.to(imgInner, { scale: 1.05, duration: 0.5 });
            }
          }
          // Card scale feedback
          gsap.to(el, { scale: 0.98, duration: 0.2 });
        }, { passive: true });
        el.addEventListener("touchend", () => {
          gsap.to(el, { scale: 1, duration: 0.3 });
        }, { passive: true });
      });

      if (headerRef.current) {
        gsap.to(headerRef.current, {
          opacity: 0.2,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top 30%",
            end: "top 60%",
            scrub: true,
          },
        });
      }

      // Mobile image parallax on cards
      gsap.utils.toArray(".coll-card-inner").forEach((inner) => {
        const el = inner as HTMLElement;
        const imgDiv = el.querySelector("div") as HTMLElement;
        if (imgDiv) {
          gsap.to(imgDiv, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: el.closest(".coll-card"), start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    });
  }, { scope: section });

  return (
    <section id="collection" ref={section} className="relative bg-bg-2 overflow-hidden mobile-dvh">
      <div className="divider" />

      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {collParticles.map((p, i) => (
          <div key={i} className="coll-particle absolute rounded-full md:block hidden" style={{ width: `${p.w}px`, height: `${p.h}px`, background: p.bg, left: p.left, top: p.top, opacity: p.opacity }} />
        ))}
        {mobileParticles.map((p, i) => (
          <div key={`m-${i}`} className="coll-mobile-particle absolute rounded-full md:hidden" style={{ width: `${p.w}px`, height: `${p.h}px`, background: p.bg, left: p.left, top: p.top, opacity: p.opacity }} />
        ))}
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none md:block hidden">
        <div className="h-full w-[55%] bg-gradient-to-r from-bg-2 via-bg-2/70 to-transparent" />
      </div>

      <div ref={headerRef} className="absolute top-1/2 -translate-y-1/2 left-0 z-20 pointer-events-none md:block hidden">
        <div className="wrap">
          <div className="max-w-md">
            <div className="coll-line w-14 h-[1px] bg-accent origin-left" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }} />
            <span className="t-label text-accent tracking-[0.35em] block" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              {"The Collection".split(" ").map((w, i) => (<span key={i} className="coll-label-word inline-block mr-[0.3em]">{w}</span>))}
            </span>
            <div className="coll-heading">
              <div className="overflow-hidden" style={{ marginBottom: "0.25rem" }}><h2 className="t-h1 text-text">{"Materials".split(" ").map((w, i) => (<span key={i} className="coll-heading-word inline-block mr-[0.3em]">{w}</span>))}</h2></div>
              <div className="overflow-hidden" style={{ marginBottom: "0.25rem" }}><h2 className="t-h1 text-text">{"that".split(" ").map((w, i) => (<span key={i} className="coll-heading-word inline-block mr-[0.3em]">{w}</span>))}</h2></div>
              <div className="overflow-hidden"><h2 className="t-h1 text-accent italic">{"speak.".split(" ").map((w, i) => (<span key={i} className="coll-heading-word inline-block mr-[0.3em]">{w}</span>))}</h2></div>
            </div>
            <p className="coll-sub t-body text-text-30 max-w-xs" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>Each category is a deliberate edit — not a catalog.</p>
          </div>
        </div>
      </div>

      <div className="md:hidden px-6 pt-8 pb-4 relative z-10">
        <div className="coll-line w-10 h-[1px] bg-accent origin-left" style={{ marginBottom: "clamp(1.5rem, 4vw, 2.5rem)" }} />
        <span className="t-label text-accent tracking-[0.35em] block" style={{ marginBottom: "clamp(1.5rem, 4vw, 2.5rem)" }}>
          {"The Collection".split(" ").map((w, i) => (<span key={i} className="coll-label-word inline-block mr-[0.3em]">{w}</span>))}
        </span>
        <h2 className="t-h1 text-text" style={{ lineHeight: 1 }}>Materials that speak.</h2>
        <p className="coll-sub t-body text-text-30 max-w-xs" style={{ marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}>Each category is a deliberate edit.</p>
      </div>

      <div ref={track} className="flex flex-col md:flex-row items-start md:items-center md:relative overflow-y-auto md:overflow-visible scroll-snap-y" style={{ gap: "clamp(2rem, 4vw, 3rem)" }}>
        <div className="shrink-0 md:block hidden" style={{ width: "50vw" }} />
        {categories.map((cat, i) => (
          <div key={i} className="coll-card relative shrink-0 overflow-hidden cursor-pointer group md:block block scroll-snap-start mobile-dvh" style={{ width: "clamp(320px, 40vw, 600px)", height: "clamp(50vh, 62vh, 75vh)", transformStyle: "preserve-3d", perspective: "1200px", minHeight: "80dvh" }}>
            <div className="coll-card-inner absolute inset-0">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: `url(${cat.img})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/20 to-transparent opacity-80" />
            </div>
            <div className="coll-card-badge absolute top-6 right-6 w-10 h-10 rounded-full bg-accent/90 flex items-center justify-center text-bg font-serif text-sm" style={{ opacity: 0 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="absolute bottom-0 left-0 w-full z-10" style={{ padding: "clamp(2.5rem, 5vw, 4rem)" }}>
              <div className="flex items-center coll-card-tag" style={{ gap: "clamp(1rem, 2vw, 1.5rem)", marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                <span className="t-label text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div className="w-10 h-[1px] bg-accent/40" />
                <span className="t-label text-text-30">{cat.tag}</span>
              </div>
              <h3 className="coll-card-title t-h3 text-text" style={{ marginBottom: "clamp(1rem, 2vw, 1.5rem)" }}>{cat.title}</h3>
              <div className="coll-card-desc md:block hidden" style={{ maxHeight: 0, opacity: 0 }}>
                <p className="text-[0.85rem] text-text-30 max-w-[300px] leading-relaxed">{cat.desc}</p>
              </div>
              <p className="coll-card-desc text-[0.85rem] text-text-30 max-w-[300px] leading-relaxed md:hidden" style={{ maxHeight: 0, opacity: 0, overflow: "hidden", transition: "max-height 0.4s ease" }} data-open="false">
                {cat.desc}
              </p>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden flex flex-col items-center gap-1 opacity-40">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent animate-bounce">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          </div>
        ))}
        <div className="shrink-0 md:block hidden" style={{ width: "5vw" }} />
      </div>
      <div className="divider" />
    </section>
  );
}
