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

    gsap.utils.toArray(".diff-float").forEach((shape, i) => {
      gsap.to(shape as Element, {
        y: `random(-60, 60)`, x: `random(-40, 40)`, rotation: `random(-25, 25)`,
        duration: `random(6, 10)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: (i as number) * 0.8,
      });
    });

    gsap.to(".diff-bg-pulse", {
      opacity: 0.03,
      scale: 1.05,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const headerTl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 60%" } });

    headerTl.fromTo(".diff-line", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.4, ease: "power2.inOut", transformOrigin: "left" }, 0);

    headerTl.fromTo(".diff-label-word", { y: "120%", opacity: 0, rotateX: -60 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.08, duration: 1, ease: "power3.out" }, 0.15);

    headerTl.fromTo(".diff-heading-mask", { yPercent: 140, opacity: 0, rotateX: -30 }, { yPercent: 0, opacity: 1, rotateX: 0, stagger: 0.14, duration: 1.6, ease: "power4.out" }, 0.25);

    headerTl.fromTo(".diff-intro", { y: 50, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out" }, 0.8);

    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray(".diff-card") as HTMLElement[];
      cards.forEach((card, index) => {
        const img = card.querySelector(".diff-card-img") as HTMLElement;
        const content = card.querySelector(".diff-card-content") as HTMLElement;
        const line = card.querySelector(".diff-card-line") as HTMLElement;
        const num = card.querySelector(".diff-card-num") as HTMLElement;
        const numLarge = card.querySelector(".diff-card-num-large") as HTMLElement;

        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 60%", end: "top 20%", scrub: 1.8 } });

        if (line) tl.fromTo(line, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, ease: "none" }, 0);
        if (num) tl.fromTo(num, { scale: 0, opacity: 0, rotate: -45 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(3)" }, 0.15);
        if (numLarge) tl.fromTo(numLarge, { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.8 }, 0.2);

        if (img) {
          tl.fromTo(img,
            { clipPath: "inset(100% 0 0 0)", scale: 1.3, filter: "blur(12px)" },
            { clipPath: "inset(0% 0 0 0)", scale: 1, filter: "blur(0px)", duration: 1.8, ease: "power4.inOut" },
            0.2
          );
        }

        if (content) {
          tl.fromTo(content.children,
            { y: 45, opacity: 0, filter: "blur(4px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.12, duration: 0.9, ease: "power3.out" },
            0.6
          );
        }

        if (img) {
          gsap.to(img.querySelector("div"), {
            yPercent: -20, ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          });
        }

        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / centerY * -2.5;
          const rotateY = (x - centerX) / centerX * 2.5;

          gsap.to(card, { rotateX, rotateY, duration: 0.5, ease: "power2.out", transformPerspective: 1200 });
          if (img) gsap.to(img, { scale: 1.04, duration: 0.7, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power2.out" });
          if (img) gsap.to(img, { scale: 1, duration: 0.7, ease: "power2.out" });
        });
      });
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray(".diff-card") as HTMLElement[];
      cards.forEach((card) => {
        const img = card.querySelector(".diff-card-img") as HTMLElement;
        const content = card.querySelector(".diff-card-content") as HTMLElement;
        const line = card.querySelector(".diff-card-line") as HTMLElement;
        const num = card.querySelector(".diff-card-num") as HTMLElement;
        const numLarge = card.querySelector(".diff-card-num-large") as HTMLElement;

        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 70%", end: "top 15%", scrub: 1.5 } });

        if (line) tl.fromTo(line, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.inOut" }, 0);
        if (num) tl.fromTo(num, { scale: 0, opacity: 0, rotate: -30 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(3)" }, 0.1);
        if (numLarge) tl.fromTo(numLarge, { opacity: 0, scale: 0.85, y: 15 }, { opacity: 1, scale: 1, y: 0, duration: 0.6 }, 0.15);

        if (img) {
          tl.fromTo(img,
            { clipPath: "inset(100% 0 0 0)", scale: 1.2, filter: "blur(10px)" },
            { clipPath: "inset(0% 0 0 0)", scale: 1, filter: "blur(0px)", duration: 1.6, ease: "power4.inOut" },
            0.15
          );
        }

        if (content) {
          tl.fromTo(content.children,
            { y: 35, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" },
            0.5
          );
        }

        // Mobile tap feedback
        card.addEventListener("touchstart", () => {
          if (navigator.vibrate) navigator.vibrate(5);
          if (img) gsap.to(img, { scale: 0.98, duration: 0.3 });
        }, { passive: true });
        card.addEventListener("touchend", () => {
          if (img) gsap.to(img, { scale: 1, duration: 0.4 });
        }, { passive: true });
      });

      gsap.to(".diff-mobile-bg-num", {
        y: -50,
        ease: "none",
        scrollTrigger: { trigger: ".diff-cards", start: "top bottom", end: "bottom top", scrub: true },
      });

      // Mobile image parallax
      gsap.utils.toArray(".diff-card-img").forEach((imgWrap) => {
        const el = imgWrap as HTMLElement;
        const inner = el.querySelector("div") as HTMLElement;
        if (inner) {
          gsap.to(inner, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    });
  }, { scope: section });

  return (
    <section id="about" ref={section} className="relative bg-bg overflow-hidden" style={{ paddingTop: "clamp(10rem, 18vw, 20rem)", paddingBottom: "clamp(10rem, 18vw, 20rem)" }}>
      <div className="divider" />

      <div className="diff-bg-pulse absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, var(--color-accent-dim) 0%, transparent 60%)", opacity: 0, transform: "scale(1)" }} />

      <div className="diff-float absolute top-[12%] right-[6%] w-28 h-28 rounded-full border border-accent/10 pointer-events-none" />
      <div className="diff-float absolute bottom-[18%] left-[8%] w-20 h-20 rounded-full bg-accent-dim pointer-events-none" />
      <div className="diff-float absolute top-[45%] right-[15%] w-16 h-16 rounded-full border border-text/10 pointer-events-none" />

      <div className="diff-mobile-bg-num fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[15rem] md:text-[20rem] text-text/[0.02] leading-none select-none pointer-events-none z-0 hidden md:block" />

      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(4rem, 8vw, 8rem)", marginBottom: "clamp(8rem, 16vw, 16rem)" }}>
          <div className="lg:col-span-3">
            <div className="diff-line w-14 h-[1px] bg-accent origin-left" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }} />
            <span className="t-label text-accent tracking-[0.35em]">
              {"The Difference".split(" ").map((w, i) => (<span key={i} className="diff-label-word inline-block mr-[0.3em]">{w}</span>))}
            </span>
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <div className="diff-heading">
              <div className="overflow-hidden" style={{ marginBottom: "0.25rem" }}><h2 className="diff-heading-mask t-h1 text-text">We did the</h2></div>
              <div className="overflow-hidden" style={{ marginBottom: "clamp(4rem, 8vw, 8rem)" }}><h2 className="diff-heading-mask t-h1 text-accent italic">hard work.</h2></div>
            </div>
            <p className="diff-intro t-body-lg max-w-lg">Sourcing the right material shouldn&apos;t mean reviewing thousands of options. We act as a rigorous, opinionated filter — so you don&apos;t have to.</p>
          </div>
        </div>

        <div className="diff-cards space-y-0">
          {features.map((f, i) => (
            <div key={i} className="diff-card grid grid-cols-1 md:grid-cols-12 cursor-default" style={{ gap: "clamp(3rem, 6vw, 6rem)", transformStyle: "preserve-3d", perspective: "1200px" }}>
              <div className="md:col-span-12"><div className="diff-card-line w-full h-[1px] bg-text-08 origin-left" /></div>
              <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2 md:col-start-7" : ""}`}>
                <div className="diff-card-img relative w-full aspect-[4/3] overflow-hidden rounded-xl tap-ripple">
                  <div className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: `url(${f.img})`, height: "120%", top: "-10%" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
                  <span className="diff-card-num-large absolute bottom-6 right-8 font-serif text-[5rem] md:text-[7rem] text-text/[0.04] leading-none select-none">{f.num}</span>
                </div>
              </div>
              <div className={`md:col-span-5 flex flex-col justify-center ${i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                <div className="diff-card-content">
                  <span className="diff-card-num t-label text-accent block" style={{ marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>{f.num}</span>
                  <h3 className="t-h3 text-text" style={{ marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>{f.title}</h3>
                  <p className="t-body max-w-sm">{f.desc}</p>
                  <button className="md:hidden mt-4 text-sm text-accent tap-active flex items-center gap-2" style={{ minHeight: "44px" }} onClick={() => toggleCard(i)}>
                    <span>{expandedCard === i ? "Show less" : "Read more"}</span>
                    <svg className={`w-3 h-3 transition-transform duration-400 ${expandedCard === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="md:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ maxHeight: expandedCard === i ? "150px" : "0", opacity: expandedCard === i ? 1 : 0, marginTop: "clamp(1rem, 2vw, 1.5rem)" }}>
                    <p className="t-body text-text-50">{f.desc}</p>
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
