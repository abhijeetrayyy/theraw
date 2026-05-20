"use client";

import { useRef, useState, useEffect } from "react";
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
  const [activeStep, setActiveStep] = useState(0);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  useEffect(() => {
    const stepEls = document.querySelectorAll(".proc-step");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(stepEls).indexOf(entry.target as Element);
            if (index !== -1) setActiveStep(index);
          }
        });
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0 }
    );
    stepEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleStep = (index: number) => {
    if (navigator.vibrate) navigator.vibrate(5);
    setExpandedStep(expandedStep === index ? null : index);
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

    entranceTl.fromTo(".proc-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
    entranceTl.fromTo(".proc-heading-line", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out" }, 0.15);
    entranceTl.fromTo(".proc-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.4);
    entranceTl.fromTo(".proc-line-accent", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.2);

    mm.add("(min-width: 1024px)", () => {
      // Timeline line animation
      gsap.fromTo(".proc-timeline", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: ".proc-steps", start: "top 50%", end: "bottom 40%", scrub: true } });

      const stepEls = gsap.utils.toArray(".proc-step") as HTMLElement[];
      stepEls.forEach((step, index) => {
        const img = step.querySelector(".proc-img") as HTMLElement;
        const content = step.querySelector(".proc-content") as HTMLElement;
        const dot = step.querySelector(".proc-dot") as HTMLElement;
        const numBg = step.querySelector(".proc-num-bg") as HTMLElement;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 65%",
            end: "top 25%",
            scrub: 1.5,
          },
        });

        if (dot) tl.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(3.5)" }, 0);
        if (numBg) tl.fromTo(numBg, { opacity: 0, scale: 0.7, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.8 }, 0.1);

        if (img) {
          tl.fromTo(img,
            { clipPath: "inset(0 100% 0 0)", scale: 1.2 },
            { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.4, ease: "power3.inOut" },
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

        // Parallax
        if (img) {
          gsap.to(img.querySelector("div"), { yPercent: -15, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } });
        }

        // Hover
        step.addEventListener("mouseenter", () => {
          if (dot) gsap.to(dot, { scale: 1.4, backgroundColor: "var(--color-accent)", duration: 0.5, ease: "power2.out" });
          if (img) gsap.to(img, { scale: 1.03, duration: 0.7, ease: "power2.out" });
          if (numBg) gsap.to(numBg, { color: "var(--color-accent/08)", duration: 0.4 });
        });
        step.addEventListener("mouseleave", () => {
          if (dot) gsap.to(dot, { scale: 1, backgroundColor: "var(--color-bg)", duration: 0.5, ease: "power2.out" });
          if (img) gsap.to(img, { scale: 1, duration: 0.7, ease: "power2.out" });
          if (numBg) gsap.to(numBg, { color: "var(--color-text/04)", duration: 0.4 });
        });
      });

      // Section exit
      gsap.to(".proc-steps", {
        opacity: 0.5,
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: ".proc-steps", start: "bottom 15%", end: "bottom top", scrub: true },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(".proc-timeline-mobile", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: ".proc-steps", start: "top 50%", end: "bottom 40%", scrub: true } });

      const stepEls = gsap.utils.toArray(".proc-step") as HTMLElement[];
      stepEls.forEach((step) => {
        const img = step.querySelector(".proc-img") as HTMLElement;
        const content = step.querySelector(".proc-content") as HTMLElement;
        const dot = step.querySelector(".proc-dot") as HTMLElement;
        const numBg = step.querySelector(".proc-num-bg") as HTMLElement;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 75%",
            end: "top 20%",
            scrub: 1.2,
          },
        });

        if (dot) tl.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(3.5)" }, 0);
        if (numBg) tl.fromTo(numBg, { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.6 }, 0.1);

        if (img) {
          tl.fromTo(img,
            { clipPath: "inset(0 100% 0 0)", scale: 1.15 },
            { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.2, ease: "power3.inOut" },
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
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });

      // Dot pulse
      const updateMobileDots = () => {
        const dots = document.querySelectorAll(".proc-dot.md\\:hidden");
        dots.forEach((dot, i) => {
          if (i === activeStep) {
            dot.classList.add("dot-pulse");
          } else {
            dot.classList.remove("dot-pulse");
          }
        });
      };
      updateMobileDots();
    });
  }, { scope: section });

  return (
    <section id="process" ref={section} className="relative bg-bg overflow-hidden">
      <div className="divider" />

      {/* Accent line */}
      <div className="proc-line-accent absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-left" style={{ opacity: 0 }} />

      <div style={{ paddingTop: "clamp(8rem, 14vw, 16rem)", paddingBottom: "clamp(8rem, 14vw, 16rem)" }}>
        <div className="wrap">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 mb-16 md:mb-24" style={{ gap: "clamp(3rem, 6vw, 6rem)" }}>
            <div className="lg:col-span-4">
              <p className="proc-label t-label text-accent tracking-[0.35em]" style={{ opacity: 0 }}>The Process</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="proc-heading" style={{ lineHeight: 1 }}>
                <div className="overflow-hidden mb-1"><span className="proc-heading-line block t-display text-text" style={{ opacity: 0 }}>Precision</span></div>
                <div className="overflow-hidden"><span className="proc-heading-line block t-display text-accent italic" style={{ opacity: 0 }}>in practice.</span></div>
              </h2>
              <p className="proc-sub t-body-lg mt-4 md:mt-6 max-w-lg text-text-50" style={{ opacity: 0 }}>Designed around how architects actually work — not how suppliers want to sell.</p>
            </div>
          </div>

          {/* Steps */}
          <div className="proc-steps relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-[30px] top-0 bottom-0 w-[1px] bg-text-04">
              <div className="proc-timeline absolute inset-0 bg-accent/50 origin-top" style={{ transform: "scaleY(0)", opacity: 0 }} />
            </div>
            <div className="md:hidden absolute left-[20px] top-0 bottom-0 w-[1px] bg-text-04">
              <div className="proc-timeline-mobile absolute inset-0 bg-accent/50 origin-top" style={{ transform: "scaleY(0)", opacity: 0 }} />
            </div>

            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={i} className="proc-step relative pl-0 md:pl-24 group cursor-default">
                  {/* Dot */}
                  <div className={`proc-dot hidden md:block absolute left-[23px] top-16 w-[15px] h-[15px] rounded-full border-2 z-10 transition-all duration-400 ${activeStep === i ? "border-accent bg-accent shadow-lg" : "border-accent bg-bg"}`} style={activeStep === i ? { boxShadow: "0 0 12px var(--color-accent/40)" } : {}} />
                  <div className={`proc-dot md:hidden absolute left-[13px] top-12 w-[15px] h-[15px] rounded-full border-2 z-10 transition-all duration-400 ${activeStep === i ? "border-accent bg-accent" : "border-accent bg-bg"}`} style={activeStep === i ? { boxShadow: "0 0 12px var(--color-accent/40)" } : {}}
                    onClick={() => toggleStep(i)}
                  />

                  {/* Content */}
                  <div style={{ paddingTop: "clamp(3rem, 6vw, 8rem)", paddingBottom: "clamp(3rem, 6vw, 8rem)", borderBottom: i < steps.length - 1 ? "1px solid var(--color-text-08)" : "none" }} className="group-hover:bg-bg-2/30 -mx-4 px-4 rounded-lg transition-colors duration-400">
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(2rem, 4vw, 6rem)" }}>
                      <div className="proc-img relative w-full aspect-[4/3] overflow-hidden rounded-sm order-1">
                        <div className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: `url(${step.img})`, height: "120%", top: "-10%" }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
                        <span className="proc-num-bg absolute bottom-6 right-8 font-serif text-[5rem] md:text-[7rem] text-text/[0.04] leading-none select-none transition-colors duration-400" style={{ opacity: 0 }}>{step.num}</span>
                      </div>
                      <div className="proc-content flex flex-col justify-center order-2">
                        <span className="t-label text-accent block mb-4 md:mb-6" style={{ fontSize: "clamp(0.7rem, 1vw, 0.8rem)" }}>{step.num}</span>
                        <h3 className="t-h2 text-text mb-4 md:mb-6">{step.title}</h3>
                        <p className="t-body leading-relaxed max-w-sm text-text-50">{step.text}</p>
                        <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden`} style={{ maxHeight: expandedStep === i ? "200px" : "0", opacity: expandedStep === i ? 1 : 0, marginTop: "1.5rem" }}>
                          <p className="t-body text-text-50">{step.text}</p>
                        </div>
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
