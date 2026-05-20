"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { num: "01", title: "Precision Curation", desc: "We don't carry everything. We carry the right things. Each product selected based on aesthetic merit, material integrity, and design relevance.", img: "/photo-1616046229478-9901c5536a45.avif" },
  { num: "02", title: "Performance First", desc: "Beauty without performance is decoration. Every material meets exacting standards for durability, sustainability, and real-world application.", img: "/photo-1618220179428-22790b461013.avif" },
  { num: "03", title: "Intentional Range", desc: "Our collection is intentionally limited. A tighter range means faster decisions, clearer direction, and better outcomes for every project.", img: "/photo-1618221195710-dd6b41faaea6.avif" },
  { num: "04", title: "Built for Professionals", desc: "Raw Select was built by people who understand the specification process. We know what matters because we've been in your position.", img: "/photo-1583847268964-b28dc8f51f92.avif" },
];

export default function Difference() {
  const section = useRef<HTMLElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    if (navigator.vibrate) navigator.vibrate(5);
    setExpandedCard(expandedCard === index ? null : index);
  };

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

    entranceTl.fromTo(".diff-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
    entranceTl.fromTo(".diff-heading-line", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out" }, 0.15);
    entranceTl.fromTo(".diff-intro", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.4);
    entranceTl.fromTo(".diff-line-accent", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.inOut" }, 0.2);

    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray(".diff-card") as HTMLElement[];
      cards.forEach((card, index) => {
        const img = card.querySelector(".diff-card-img") as HTMLElement;
        const content = card.querySelector(".diff-card-content") as HTMLElement;
        const numLarge = card.querySelector(".diff-card-num-large") as HTMLElement;
        const line = card.querySelector(".diff-card-line") as HTMLElement;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 65%",
            end: "top 25%",
            scrub: 1.5,
          },
        });

        if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, 0);
        if (numLarge) tl.fromTo(numLarge, { y: 40, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" }, 0.1);

        if (img) {
          tl.fromTo(img,
            { clipPath: "inset(0 100% 0 0)", scale: 1.2 },
            { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.4, ease: "power4.inOut" },
            0.15
          );
        }

        if (content) {
          tl.fromTo(content.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power3.out" },
            0.4
          );
        }

        // Parallax on image
        if (img) {
          gsap.to(img.querySelector("div"), {
            yPercent: -15,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          });
        }

        // Hover tilt
        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / centerY * -2;
          const rotateY = (x - centerX) / centerX * 2;

          gsap.to(card, { rotateX, rotateY, duration: 0.5, ease: "power2.out", transformPerspective: 1200 });
          if (img) gsap.to(img, { scale: 1.03, duration: 0.7, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power2.out" });
          if (img) gsap.to(img, { scale: 1, duration: 0.7, ease: "power2.out" });
        });
      });

      // Section exit
      gsap.to(".diff-cards", {
        opacity: 0.5,
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: ".diff-cards", start: "bottom 15%", end: "bottom top", scrub: true },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray(".diff-card") as HTMLElement[];
      cards.forEach((card) => {
        const img = card.querySelector(".diff-card-img") as HTMLElement;
        const content = card.querySelector(".diff-card-content") as HTMLElement;
        const numLarge = card.querySelector(".diff-card-num-large") as HTMLElement;
        const line = card.querySelector(".diff-card-line") as HTMLElement;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            end: "top 20%",
            scrub: 1.2,
          },
        });

        if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0);
        if (numLarge) tl.fromTo(numLarge, { y: 30, opacity: 0, scale: 0.85 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, 0.1);

        if (img) {
          tl.fromTo(img,
            { clipPath: "inset(0 100% 0 0)", scale: 1.15 },
            { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.2, ease: "power4.inOut" },
            0.15
          );
        }

        if (content) {
          tl.fromTo(content.children,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
            0.4
          );
        }

        // Parallax
        if (img) {
          gsap.to(img.querySelector("div"), {
            yPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          });
        }

        // Touch feedback
        card.addEventListener("touchstart", () => {
          if (navigator.vibrate) navigator.vibrate(5);
          if (img) gsap.to(img, { scale: 0.98, duration: 0.3 });
        }, { passive: true });
        card.addEventListener("touchend", () => {
          if (img) gsap.to(img, { scale: 1, duration: 0.4 });
        }, { passive: true });
      });
    });
  }, { scope: section });

  return (
    <section id="about" ref={section} className="relative bg-bg overflow-hidden" style={{ paddingTop: "clamp(8rem, 14vw, 16rem)", paddingBottom: "clamp(8rem, 14vw, 16rem)" }}>
      <div className="divider" />

      {/* Full-bleed accent line */}
      <div className="diff-line-accent absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-left" style={{ opacity: 0 }} />

      <div className="wrap">
        {/* Header - asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 mb-16 md:mb-24" style={{ gap: "clamp(3rem, 6vw, 6rem)" }}>
          <div className="lg:col-span-4">
            <p className="diff-label t-label text-accent tracking-[0.35em]" style={{ opacity: 0 }}>The Difference</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="diff-heading" style={{ lineHeight: 1 }}>
              <div className="overflow-hidden"><span className="diff-heading-line block t-display text-text" style={{ opacity: 0 }}>We did the</span></div>
              <div className="overflow-hidden"><span className="diff-heading-line block t-display text-accent italic" style={{ opacity: 0 }}>hard work.</span></div>
            </h2>
            <p className="diff-intro t-body-lg mt-4 md:mt-6 max-w-lg text-text-50" style={{ opacity: 0 }}>Sourcing the right material shouldn&apos;t mean reviewing thousands of options. We act as a rigorous, opinionated filter.</p>
          </div>
        </div>

        {/* Cards - full-width alternating layout */}
        <div className="diff-cards space-y-0">
          {features.map((f, i) => (
            <div key={i} className="diff-card cursor-default" style={{ transformStyle: "preserve-3d", perspective: "1200px" }}>
              {/* Separator line */}
              <div className="diff-card-line w-full h-[1px] bg-text-08 origin-left mb-8 md:mb-12" style={{ transform: "scaleX(0)" }} />

              <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(2rem, 5vw, 5rem)", alignItems: "center" }}>
                {/* Image side */}
                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="diff-card-img relative w-full aspect-[16/10] overflow-hidden rounded-sm tap-ripple">
                    <div className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: `url(${f.img})`, height: "120%", top: "-10%" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
                    {/* Large number overlay */}
                    <span className="diff-card-num-large absolute bottom-4 right-6 md:bottom-8 md:right-10 font-serif text-[6rem] md:text-[10rem] text-text/[0.06] leading-none select-none" style={{ opacity: 0 }}>{f.num}</span>
                  </div>
                </div>

                {/* Content side */}
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="diff-card-content">
                    <span className="t-label text-accent block mb-4 md:mb-6" style={{ fontSize: "clamp(0.7rem, 1vw, 0.8rem)" }}>{f.num}</span>
                    <h3 className="t-h2 text-text mb-4 md:mb-6">{f.title}</h3>
                    <p className="t-body max-w-md text-text-50 leading-relaxed">{f.desc}</p>
                    <button className="md:hidden mt-6 text-sm text-accent tap-active flex items-center gap-2" style={{ minHeight: "44px" }} onClick={() => toggleCard(i)}>
                      <span>{expandedCard === i ? "Show less" : "Read more"}</span>
                      <svg className={`w-3 h-3 transition-transform duration-400 ${expandedCard === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ maxHeight: expandedCard === i ? "150px" : "0", opacity: expandedCard === i ? 1 : 0, marginTop: "1rem" }}>
                      <p className="t-body text-text-50">{f.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider" />
    </section>
  );
}
