"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Understand",
    text: "We start with your vision. Project parameters, aesthetic direction, performance requirements, and timeline. No generic recommendations — only what's relevant to your specific brief.",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
  },
  {
    num: "02",
    title: "Curate",
    text: "Based on your needs, we assemble a focused selection. Not a catalog. A shortlist. Every option is there for a reason. Every material has already passed our filter.",
    img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop",
  },
  {
    num: "03",
    title: "Support",
    text: "Samples, technical data, specification support, and ongoing guidance. We stay with you through the entire process — from concept through to installation.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
  },
  {
    num: "04",
    title: "Deliver",
    text: "The right material, at the right time, to the right specification. No surprises. No substitutions. No compromises. Just the outcome you specified.",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
  },
];

export default function RawProcess() {
  const section = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const setActive = useCallback((i: number) => {
    if (!counterRef.current) return;
    gsap.to(counterRef.current, {
      yPercent: -100 * i,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  useGSAP(() => {
    const pinEl = pinRef.current;
    const endEl = endRef.current;
    if (!pinEl || !endEl) return;

    ScrollTrigger.create({
      trigger: section.current,
      start: "top top",
      end: () => `+=${endEl.offsetHeight}`,
      pin: pinEl,
      anticipatePin: 1,
    });

    const panels = gsap.utils.toArray(".proc-panel") as HTMLElement[];
    panels.forEach((panel, i) => {
      gsap.fromTo(
        panel,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: panel,
            start: "top 70%",
            end: "top 35%",
            scrub: 0.4,
          },
          ease: "none",
        }
      );

      ScrollTrigger.create({
        trigger: panel,
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      });
    });
  }, { scope: section, dependencies: [setActive] });

  return (
    <section id="process" ref={section} className="relative bg-light text-dark overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div ref={pinRef} className="w-full lg:w-1/2 h-screen flex flex-col justify-center shrink-0">
          <div className="container">
            <span className="text-label text-accent mb-6 block">The Process</span>
            <h2 className="text-section mb-12">
              Precision<br />in practice.
            </h2>
            <div className="h-[100px] md:h-[150px] overflow-hidden text-accent font-serif leading-none select-none">
              <div ref={counterRef} className="flex flex-col will-change-transform">
                {steps.map((s) => (
                  <div key={s.num} className="flex items-start h-[100px] md:h-[150px]">
                    <span className="text-[80px] md:text-[120px] lg:text-[140px] leading-none">
                      {s.num}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div ref={endRef} className="w-full lg:w-1/2 py-[20vh] lg:py-[25vh] flex flex-col gap-[25vh]">
          <div className="container">
            {steps.map((step, i) => (
              <div key={i} className="proc-panel flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                <div className="relative w-full md:w-48 aspect-[4/3] shrink-0 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${step.img})` }}
                  />
                  <div className="absolute inset-0 bg-dark/10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sub mb-4 text-dark">{step.title}</h3>
                  <p className="text-body text-dark/70 max-w-md">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
