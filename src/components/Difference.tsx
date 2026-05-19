"use client";

import { useRef } from "react";
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

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Floating shapes
    gsap.utils.toArray(".diff-float").forEach((shape, i) => {
      gsap.to(shape as Element, {
        y: `random(-50, 50)`, x: `random(-30, 30)`, rotation: `random(-20, 20)`,
        duration: `random(5, 9)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.7,
      });
    });

    // Header entrance
    const headerTl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 65%" } });
    headerTl.fromTo(".diff-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut", transformOrigin: "left" }, 0);
    headerTl.fromTo(".diff-label-word", { y: "100%", opacity: 0, rotateX: -45 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.06, duration: 0.9, ease: "power3.out" }, 0.1);
    headerTl.fromTo(".diff-heading-mask", { yPercent: 130 }, { yPercent: 0, stagger: 0.12, duration: 1.4, ease: "power4.out" }, 0.2);
    headerTl.fromTo(".diff-intro", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 0.7);

    // Cards with complex scroll animations
    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray(".diff-card") as HTMLElement[];
      cards.forEach((card, i) => {
        const img = card.querySelector(".diff-card-img") as HTMLElement;
        const content = card.querySelector(".diff-card-content") as HTMLElement;
        const line = card.querySelector(".diff-card-line") as HTMLElement;
        const num = card.querySelector(".diff-card-num") as HTMLElement;

        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 65%", end: "top 25%", scrub: 1.5 } });

        // Line draws
        if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "none" }, 0);

        // Number bounces in with rotation
        if (num) tl.fromTo(num, { scale: 0, opacity: 0, rotate: -30 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.7, ease: "back.out(2.5)" }, 0.1);

        // Image reveals with clip-path + scale + blur
        if (img) {
          tl.fromTo(img,
            { clipPath: "inset(100% 0 0 0)", scale: 1.25, filter: "blur(10px)" },
            { clipPath: "inset(0% 0 0 0)", scale: 1, filter: "blur(0px)", duration: 1.6, ease: "power4.inOut" },
            0.15
          );
        }

        // Content slides up with stagger
        if (content) {
          tl.fromTo(content.children,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" },
            0.5
          );
        }

        // Parallax on image
        if (img) {
          gsap.to(img.querySelector("div"), {
            yPercent: -18, ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          });
        }

        // Card hover effect
        card.addEventListener("mouseenter", () => {
          gsap.to(img, { scale: 1.03, duration: 0.6, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
        });
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(".diff-card", { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".diff-cards", start: "top 70%" } });
    });
  }, { scope: section });

  return (
    <section id="about" ref={section} className="relative bg-bg overflow-hidden" style={{ paddingTop: "clamp(10rem, 18vw, 20rem)", paddingBottom: "clamp(10rem, 18vw, 20rem)" }}>
      {/* Floating shapes */}
      <div className="diff-float absolute top-[12%] right-[6%] w-28 h-28 rounded-full border border-accent/10 pointer-events-none" />
      <div className="diff-float absolute bottom-[18%] left-[8%] w-20 h-20 rounded-full bg-accent-dim pointer-events-none" />
      <div className="diff-float absolute top-[45%] right-[15%] w-16 h-16 rounded-full border border-text/10 pointer-events-none" />

      <div className="wrap">
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
            <div key={i} className="diff-card grid grid-cols-1 md:grid-cols-12" style={{ gap: "clamp(3rem, 6vw, 6rem)" }}>
              <div className="md:col-span-12"><div className="diff-card-line w-full h-[1px] bg-text-08 origin-left" /></div>
              <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2 md:col-start-7" : ""}`}>
                <div className="diff-card-img relative w-full aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: `url(${f.img})`, height: "120%", top: "-10%" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
                  <span className="diff-card-num absolute top-8 left-8 font-serif text-7xl md:text-8xl text-text/[0.06] leading-none select-none">{f.num}</span>
                </div>
              </div>
              <div className={`md:col-span-5 flex flex-col justify-center ${i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                <div className="diff-card-content">
                  <span className="t-label text-accent block" style={{ marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>{f.num}</span>
                  <h3 className="t-h3 text-text" style={{ marginBottom: "clamp(2rem, 4vw, 3.5rem)" }}>{f.title}</h3>
                  <p className="t-body max-w-sm">{f.desc}</p>
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
