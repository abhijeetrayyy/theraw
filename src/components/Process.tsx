"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Understand", text: "We start with your vision. Project parameters, aesthetic direction, performance requirements. No generic recommendations — only what's relevant to your brief.", img: "/photo-1564078516393-cf04bd966897.avif" },
  { num: "02", title: "Curate", text: "Based on your needs, we assemble a focused shortlist. Every option is there for a reason — every material has already passed our filter.", img: "/photo-1567016376408-0226e4d0c1ea.avif" },
  { num: "03", title: "Support", text: "Samples, technical data, specification support. We stay with you from concept through installation.", img: "/photo-1586023492125-27b2c045efd7.avif" },
  { num: "04", title: "Deliver", text: "The right material, at the right time, to the right specification. No surprises. No substitutions.", img: "/premium_photo-1676968002767-1f6a09891350.avif" },
];

export default function Process() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Floating shapes
    gsap.utils.toArray(".proc-float").forEach((shape, i) => {
      gsap.to(shape as Element, { y: `random(-50, 50)`, x: `random(-30, 30)`, rotation: `random(-15, 15)`, duration: `random(5, 8)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.6 });
    });

    // Header entrance
    gsap.fromTo(".proc-heading-mask", { yPercent: 120 }, { yPercent: 0, duration: 1.4, ease: "power4.out", stagger: 0.12, scrollTrigger: { trigger: ".proc-heading", start: "top 75%" } });
    gsap.fromTo(".proc-label-word", { y: "100%", opacity: 0, rotateX: -45 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.06, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: section.current, start: "top 65%" } });

    // Timeline line draw
    gsap.fromTo(".proc-timeline", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".proc-steps", start: "top 55%", end: "bottom 45%", scrub: true } });

    // Step entrance with complex animations
    const stepEls = gsap.utils.toArray(".proc-step") as HTMLElement[];
    stepEls.forEach((step) => {
      const img = step.querySelector(".proc-img") as HTMLElement;
      const content = step.querySelector(".proc-content") as HTMLElement;
      const dot = step.querySelector(".proc-dot") as HTMLElement;

      const tl = gsap.timeline({ scrollTrigger: { trigger: step, start: "top 70%", end: "top 25%", scrub: 1.2 } });

      // Dot pulses in with scale
      if (dot) tl.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(3)" }, 0);

      // Image reveals with clip-path + scale + blur
      if (img) {
        tl.fromTo(img,
          { clipPath: "inset(0 100% 0 0)", scale: 1.15, filter: "blur(8px)" },
          { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.inOut" },
          0.05
        );
      }

      // Content slides up with stagger
      if (content) {
        tl.fromTo(content.children,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" },
          0.35
        );
      }

      // Image parallax
      if (img) {
        gsap.to(img.querySelector("div"), { yPercent: -12, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } });
      }
    });
  }, { scope: section });

  return (
    <section id="process" ref={section} className="relative bg-bg-2 overflow-hidden">
      <div className="divider" />

      {/* Floating shapes */}
      <div className="proc-float absolute top-[8%] right-[10%] w-24 h-24 rounded-full border border-accent/10 pointer-events-none" />
      <div className="proc-float absolute bottom-[12%] left-[6%] w-16 h-16 rounded-full bg-accent-dim pointer-events-none" />
      <div className="proc-float absolute top-[50%] right-[18%] w-12 h-12 rounded-full border border-text/10 pointer-events-none" />

      <div style={{ paddingTop: "clamp(10rem, 18vw, 20rem)", paddingBottom: "clamp(10rem, 18vw, 20rem)" }}>
        <div className="wrap">
          <div style={{ marginBottom: "clamp(8rem, 16vw, 16rem)" }}>
            <p className="t-label text-accent tracking-[0.4em]" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              {"The Process".split(" ").map((w, i) => (<span key={i} className="proc-label-word inline-block mr-[0.3em]">{w}</span>))}
            </p>
            <div className="proc-heading max-w-3xl">
              <div className="overflow-hidden" style={{ marginBottom: "0.25rem" }}><h2 className="proc-heading-mask t-h1 text-text">Precision</h2></div>
              <div className="overflow-hidden" style={{ marginBottom: "clamp(4rem, 8vw, 8rem)" }}><h2 className="proc-heading-mask t-h1 text-accent italic">in practice.</h2></div>
            </div>
            <p className="t-body-lg max-w-lg" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)", color: "rgba(26,26,26,0.4)" }}>Designed around how architects actually work — not how suppliers want to sell.</p>
          </div>

          <div className="proc-steps relative">
            <div className="hidden md:block absolute left-[30px] top-0 bottom-0 w-[1px] bg-text-04">
              <div className="proc-timeline absolute inset-0 bg-accent/50 origin-top" />
            </div>
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={i} className="proc-step relative pl-0 md:pl-24">
                  <div className="proc-dot hidden md:block absolute left-[23px] top-16 w-[15px] h-[15px] rounded-full border-2 border-accent bg-bg-2 z-10" />
                  <div style={{ paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(4rem, 8vw, 8rem)", borderBottom: i < steps.length - 1 ? "1px solid var(--color-text-08)" : "none" }}>
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(3rem, 6vw, 6rem)" }}>
                      <div className="proc-img relative w-full aspect-[4/3] overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: `url(${step.img})`, height: "120%", top: "-10%" }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-2/30 to-transparent" />
                        <span className="absolute bottom-8 right-10 font-serif text-[6rem] md:text-[8rem] text-text/[0.04] leading-none select-none">{step.num}</span>
                      </div>
                      <div className="proc-content flex flex-col justify-center">
                        <span className="t-label text-accent block" style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>{step.num}</span>
                        <h3 className="t-h2 text-text" style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>{step.title}</h3>
                        <p className="t-body leading-relaxed max-w-sm">{step.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
    </section>
  );
}
