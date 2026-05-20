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

    gsap.utils.toArray(".proc-float").forEach((shape, i) => {
      gsap.to(shape as Element, { y: `random(-60, 60)`, x: `random(-40, 40)`, rotation: `random(-20, 20)`, duration: `random(6, 10)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: (i as number) * 0.7 });
    });

    gsap.to(".proc-bg-pulse", {
      opacity: 0.04,
      scale: 1.08,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    mm.add("(min-width: 1024px)", () => {
      const headerTl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 60%", end: "top 20%", scrub: 1.5 } });
      headerTl.fromTo(".proc-label-word", { y: "120%", opacity: 0, rotateX: -60 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.08, duration: 1, ease: "power3.out" }, 0);
      headerTl.fromTo(".proc-heading-mask", { yPercent: 130, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.6, ease: "power4.out", stagger: 0.14 }, 0.15);
      headerTl.fromTo(".proc-sub", { y: 40, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, 0.7);

      gsap.fromTo(".proc-timeline", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: ".proc-steps", start: "top 50%", end: "bottom 40%", scrub: true } });

      // Section exit
      gsap.to(".proc-steps", {
        opacity: 0.4,
        y: -30,
        ease: "none",
        scrollTrigger: { trigger: ".proc-steps", start: "bottom 20%", end: "bottom top", scrub: true },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      const headerTl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 60%", end: "top 20%", scrub: 1.5 } });
      headerTl.fromTo(".proc-label-word", { y: "120%", opacity: 0, rotateX: -60 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.08, duration: 1, ease: "power3.out" }, 0);
      headerTl.fromTo(".proc-heading-mask", { yPercent: 130, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.6, ease: "power4.out", stagger: 0.14 }, 0.15);
      headerTl.fromTo(".proc-sub", { y: 40, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, 0.7);

      gsap.fromTo(".proc-timeline-mobile", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: ".proc-steps", start: "top 50%", end: "bottom 40%", scrub: true } });

      // Mobile dot pulse animation for active step
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

      // Mobile step expand with premium animation
      const stepEls = gsap.utils.toArray(".proc-step") as HTMLElement[];
      stepEls.forEach((step) => {
        const img = step.querySelector(".proc-img") as HTMLElement;
        if (img) {
          gsap.to(img.querySelector("div"), {
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });
    });

    const stepEls = gsap.utils.toArray(".proc-step") as HTMLElement[];
    stepEls.forEach((step, index) => {
      const img = step.querySelector(".proc-img") as HTMLElement;
      const content = step.querySelector(".proc-content") as HTMLElement;
      const dot = step.querySelector(".proc-dot") as HTMLElement;
      const numBg = step.querySelector(".proc-num-bg") as HTMLElement;

      const tl = gsap.timeline({ scrollTrigger: { trigger: step, start: "top 65%", end: "top 20%", scrub: 1.5 } });

      if (dot) tl.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(3.5)" }, 0);
      if (numBg) tl.fromTo(numBg, { opacity: 0, scale: 0.7, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.8 }, 0.1);

      if (img) {
        tl.fromTo(img,
          { clipPath: "inset(0 100% 0 0)", scale: 1.2, filter: "blur(10px)" },
          { clipPath: "inset(0 0% 0 0)", scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.inOut" },
          0.15
        );
      }

      if (content) {
        tl.fromTo(content.children,
          { y: 40, opacity: 0, filter: "blur(4px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.12, duration: 0.9, ease: "power3.out" },
          0.4
        );
      }

      if (img) {
        gsap.to(img.querySelector("div"), { yPercent: -15, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true } });
      }

      mm.add("(min-width: 1024px)", () => {
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
    });
  }, { scope: section });

  return (
    <section id="process" ref={section} className="relative bg-bg overflow-hidden">
      <div className="divider" />

      <div className="proc-bg-pulse absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 40%, var(--color-accent-dim) 0%, transparent 65%)", opacity: 0, transform: "scale(1)" }} />

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
            <p className="proc-sub t-body-lg max-w-lg">Designed around how architects actually work — not how suppliers want to sell.</p>
          </div>

          <div className="proc-steps relative">
            <div className="hidden md:block absolute left-[30px] top-0 bottom-0 w-[1px] bg-text-04">
              <div className="proc-timeline absolute inset-0 bg-accent/50 origin-top" />
            </div>
            <div className="md:hidden absolute left-[20px] top-0 bottom-0 w-[1px] bg-text-04">
              <div className="proc-timeline-mobile absolute inset-0 bg-accent/50 origin-top" />
            </div>
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={i} className="proc-step relative pl-0 md:pl-24 group cursor-default">
                  <div className={`proc-dot hidden md:block absolute left-[23px] top-16 w-[15px] h-[15px] rounded-full border-2 z-10 transition-all duration-400 ${activeStep === i ? "border-accent bg-accent shadow-lg" : "border-accent bg-bg"}`} style={activeStep === i ? { boxShadow: "0 0 12px var(--color-accent/40)" } : {}} />
                  <div className={`proc-dot md:hidden absolute left-[13px] top-12 w-[15px] h-[15px] rounded-full border-2 z-10 transition-all duration-400 ${activeStep === i ? "border-accent bg-accent" : "border-accent bg-bg"}`} style={activeStep === i ? { boxShadow: "0 0 12px var(--color-accent/40)" } : {}}
                    onClick={() => toggleStep(i)}
                  />
                  <div style={{ paddingTop: "clamp(3rem, 6vw, 8rem)", paddingBottom: "clamp(3rem, 6vw, 8rem)", borderBottom: i < steps.length - 1 ? "1px solid var(--color-text-08)" : "none" }} className="group-hover:bg-bg-2/30 -mx-4 px-4 rounded-lg transition-colors duration-400">
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(2rem, 4vw, 6rem)" }}>
                      <div className="proc-img relative w-full aspect-[4/3] overflow-hidden rounded-lg order-1">
                        <div className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: `url(${step.img})`, height: "120%", top: "-10%" }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
                        <span className="proc-num-bg absolute bottom-6 right-8 font-serif text-[5rem] md:text-[7rem] text-text/[0.04] leading-none select-none transition-colors duration-400">{step.num}</span>
                      </div>
                      <div className="proc-content flex flex-col justify-center order-2">
                        <span className="t-label text-accent block" style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>{step.num}</span>
                        <h3 className="t-h3 text-text" style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}>{step.title}</h3>
                        <p className="t-body leading-relaxed max-w-sm">{step.text}</p>
                        <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden`} style={{ maxHeight: expandedStep === i ? "200px" : "0", opacity: expandedStep === i ? 1 : 0, marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}>
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
