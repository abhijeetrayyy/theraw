"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Surfaces",
    desc: "Stone, porcelain, sintered stone, natural slabs. Selected for visual depth, tactile quality, and structural performance.",
    img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Finishes",
    desc: "Metals, lacquers, textures, patinas. The details that elevate a space from well-designed to unforgettable.",
    img: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Systems",
    desc: "Modular solutions, architectural hardware, integrated components. Engineered for seamless specification.",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Custom",
    desc: "When the standard isn't enough. Bespoke material solutions for projects that demand something no catalog can provide.",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function RawCollection() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(introRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        scrollTrigger: {
          trigger: section.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 0.4,
        },
        ease: "none",
      }
    );

    const el = track.current;
    if (!el) return;

    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    const cards = el.querySelectorAll(":scope > .cat-card");
    if (!cards.length) return;

    let totalWidth = 0;
    cards.forEach((c) => {
      totalWidth += (c as HTMLElement).offsetWidth;
    });
    totalWidth += (cards.length - 1) * gap;

    const spacer = el.querySelector(":scope > .spacer-left") as HTMLElement;
    const spacerR = el.querySelector(":scope > .spacer-right") as HTMLElement;
    const leftSpacerW = spacer ? spacer.offsetWidth : 0;
    const rightSpacerW = spacerR ? spacerR.offsetWidth : 0;

    totalWidth += leftSpacerW + rightSpacerW;

    const scrollDist = totalWidth - window.innerWidth;
    if (scrollDist <= 0) return;

    const tween = gsap.to(el, {
      x: -scrollDist,
      ease: "none",
    });

    ScrollTrigger.create({
      trigger: section.current,
      start: "top top",
      end: () => `+=${scrollDist}`,
      pin: true,
      animation: tween,
      scrub: 0.5,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    });
  }, { scope: section });

  return (
    <section id="collection" ref={section} className="h-screen w-full bg-dark overflow-hidden flex items-center relative">
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-r from-dark/60 via-dark/20 to-transparent" />
      </div>

      <div ref={introRef} className="absolute top-1/2 -translate-y-1/2 left-0 container z-20 pointer-events-none">
        <div className="max-w-md">
          <span className="text-label text-accent mb-5 block">The Collection</span>
          <h2 className="text-section mb-5 text-light">
            Materials that speak.<br />Spaces that resonate.
          </h2>
          <p className="text-body text-light/65">
            Each category is a deliberate edit — the best of its kind.
          </p>
        </div>
      </div>

      <div ref={track} className="flex items-center" style={{ gap: "clamp(0.75rem, 1.5vw, 2rem)" }}>
        <div className="spacer-left shrink-0" style={{ width: "clamp(80vw, 50vw, 42vw)" }} />
        {categories.map((cat, i) => (
          <div
            key={i}
            className="cat-card relative shrink-0 overflow-hidden group cursor-pointer"
            style={{
              width: "clamp(280px, 40vw, 600px)",
              height: "clamp(40vh, 55vh, 65vh)",
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              style={{ backgroundImage: `url(${cat.img})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-7 md:p-9">
              <span className="text-label text-accent mb-2 block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-sub text-light mb-2">{cat.title}</h3>
              <p className="text-body text-light/55 max-w-xs opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {cat.desc}
              </p>
            </div>
          </div>
        ))}
        <div className="spacer-right shrink-0" style={{ width: "clamp(5vw, 6vw, 8vw)" }} />
      </div>
    </section>
  );
}
