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
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Entrance
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
      },
    });

    entranceTl.fromTo(".coll-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
    entranceTl.fromTo(".coll-heading-line", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out" }, 0.15);
    entranceTl.fromTo(".coll-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.4);
    entranceTl.fromTo(".coll-line-accent", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.2);

    mm.add("(min-width: 1024px)", () => {
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
      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: () => `+=${scrollDist * 1.2}`,
        pin: true,
        animation: tween,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });

      // Card entrance animations
      Array.from(cards).forEach((card) => {
        const el = card as HTMLElement;
        const inner = el.querySelector(".coll-card-inner") as HTMLElement;
        const tag = el.querySelector(".coll-card-tag") as HTMLElement;
        const title = el.querySelector(".coll-card-title") as HTMLElement;
        const desc = el.querySelector(".coll-card-desc") as HTMLElement;
        const badge = el.querySelector(".coll-card-badge") as HTMLElement;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "left 90%",
            end: "left 40%",
            scrub: 0.6,
            containerAnimation: tween,
          },
        });

        if (badge) tl.fromTo(badge, { scale: 0, opacity: 0, rotation: -180 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(3)" }, 0);
        if (inner) tl.fromTo(inner, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.1);
        if (tag) tl.fromTo(tag, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.3);
        if (title) tl.fromTo(title, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.35);
        if (desc) tl.fromTo(desc, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.45);

        // Hover tilt
        el.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / centerY * -3;
          const rotateY = (x - centerX) / centerX * 3;

          gsap.to(el, { rotateX, rotateY, duration: 0.5, ease: "power2.out", transformPerspective: 1200 });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power2.out" });
        });
      });

      // Header fade on scroll
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
      const cards = gsap.utils.toArray(".coll-card") as HTMLElement[];
      cards.forEach((card) => {
        const inner = card.querySelector(".coll-card-inner") as HTMLElement;
        const tag = card.querySelector(".coll-card-tag") as HTMLElement;
        const title = card.querySelector(".coll-card-title") as HTMLElement;
        const badge = card.querySelector(".coll-card-badge") as HTMLElement;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        });

        if (badge) tl.fromTo(badge, { scale: 0, opacity: 0, rotation: -180 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(3)" }, 0);
        if (inner) tl.fromTo(inner, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.1);
        if (tag) tl.fromTo(tag, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.3);
        if (title) tl.fromTo(title, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.35);

        // Touch feedback
        card.addEventListener("touchstart", () => {
          if (navigator.vibrate) navigator.vibrate(5);
          const desc = card.querySelector(".coll-card-desc") as HTMLElement;
          const imgInner = card.querySelector(".coll-card-inner div") as HTMLElement;
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
          gsap.to(card, { scale: 0.98, duration: 0.2 });
        }, { passive: true });
        card.addEventListener("touchend", () => {
          gsap.to(card, { scale: 1, duration: 0.3 });
        }, { passive: true });
      });

      // Header fade
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

      // Image parallax
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

      {/* Accent line */}
      <div className="coll-line-accent absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-left" style={{ opacity: 0 }} />

      {/* Header - pinned on desktop */}
      <div ref={headerRef} className="absolute top-1/2 -translate-y-1/2 left-0 z-20 pointer-events-none md:block hidden">
        <div className="wrap">
          <div className="max-w-md">
            <p className="coll-label t-label text-accent tracking-[0.35em] block mb-4 md:mb-6" style={{ opacity: 0 }}>The Collection</p>
            <h2 className="coll-heading" style={{ lineHeight: 1 }}>
              <div className="overflow-hidden mb-1"><span className="coll-heading-line block t-display text-text" style={{ opacity: 0 }}>Materials</span></div>
              <div className="overflow-hidden"><span className="coll-heading-line block t-display text-accent italic" style={{ opacity: 0 }}>that speak.</span></div>
            </h2>
            <p className="coll-sub t-body text-text-30 max-w-xs mt-4 md:mt-6" style={{ opacity: 0 }}>Each category is a deliberate edit — not a catalog.</p>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden px-6 pt-8 pb-4 relative z-10">
        <p className="coll-label t-label text-accent tracking-[0.35em] block mb-4" style={{ opacity: 0 }}>The Collection</p>
        <h2 className="coll-heading" style={{ lineHeight: 1 }}>
          <div className="overflow-hidden mb-1"><span className="coll-heading-line block t-h1 text-text" style={{ opacity: 0 }}>Materials</span></div>
          <div className="overflow-hidden"><span className="coll-heading-line block t-h1 text-accent italic" style={{ opacity: 0 }}>that speak.</span></div>
        </h2>
        <p className="coll-sub t-body text-text-30 max-w-xs mt-4" style={{ opacity: 0 }}>Each category is a deliberate edit.</p>
      </div>

      {/* Horizontal scroll track */}
      <div ref={track} className="flex flex-col md:flex-row items-start md:items-center md:relative overflow-y-auto md:overflow-visible scroll-snap-y" style={{ gap: "clamp(2rem, 4vw, 3rem)" }}>
        <div className="shrink-0 md:block hidden" style={{ width: "50vw" }} />
        {categories.map((cat, i) => (
          <div key={i} className="coll-card relative shrink-0 overflow-hidden cursor-pointer group md:block block scroll-snap-start mobile-dvh" style={{ width: "clamp(340px, 42vw, 650px)", height: "clamp(55vh, 65vh, 80vh)", transformStyle: "preserve-3d", perspective: "1200px", minHeight: "85dvh" }}>
            <div className="coll-card-inner absolute inset-0">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: `url(${cat.img})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/10 to-transparent opacity-85" />
            </div>

            {/* Badge number */}
            <div className="coll-card-badge absolute top-6 right-6 w-10 h-10 rounded-full bg-accent/90 flex items-center justify-center text-bg font-serif text-sm" style={{ opacity: 0 }}>
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full z-10" style={{ padding: "clamp(2.5rem, 5vw, 4rem)" }}>
              <div className="flex items-center coll-card-tag mb-4 md:mb-6" style={{ gap: "clamp(1rem, 2vw, 1.5rem)", opacity: 0 }}>
                <span className="t-label text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div className="w-10 h-[1px] bg-accent/40" />
                <span className="t-label text-text-30">{cat.tag}</span>
              </div>
              <h3 className="coll-card-title t-h2 text-text mb-3 md:mb-4" style={{ opacity: 0 }}>{cat.title}</h3>
              <div className="coll-card-desc md:block hidden" style={{ maxHeight: 0, opacity: 0 }}>
                <p className="text-[0.85rem] text-text-30 max-w-[300px] leading-relaxed">{cat.desc}</p>
              </div>
              <p className="coll-card-desc text-[0.85rem] text-text-30 max-w-[300px] leading-relaxed md:hidden" style={{ maxHeight: 0, opacity: 0, overflow: "hidden", transition: "max-height 0.4s ease" }} data-open="false">
                {cat.desc}
              </p>
            </div>

            {/* Scroll hint (mobile) */}
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
