"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    num: "01",
    title: "Precision Curation",
    desc: "We don't carry everything. We carry the right things. Each product selected based on aesthetic merit, material integrity, and design relevance.",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
  },
  {
    num: "02",
    title: "Performance First",
    desc: "Beauty without performance is decoration. Every material meets exacting standards for durability, sustainability, and real-world application.",
    img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop",
  },
  {
    num: "03",
    title: "Intentional Range",
    desc: "Our collection is intentionally limited. A tighter range means faster decisions, clearer direction, and better outcomes. Less noise. More signal.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
  },
  {
    num: "04",
    title: "Built for Professionals",
    desc: "Raw Select was built by people who understand the specification process. We know what matters to architects and designers because we've been in your position.",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
  },
];

export default function RawDifference() {
  const section = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(bgRef.current, {
      scrollTrigger: {
        trigger: section.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.4,
      },
      yPercent: -15,
      ease: "none",
    });

    gsap.from(".diff-item", {
      scrollTrigger: { trigger: ".diff-grid", start: "top 75%" },
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
    });

    gsap.from(".diff-line", {
      scrollTrigger: { trigger: ".diff-grid", start: "top 80%" },
      scaleX: 0,
      transformOrigin: "left",
      duration: 1.2,
      stagger: 0.12,
      ease: "power2.inOut",
    });

    gsap.from(".diff-img", {
      scrollTrigger: { trigger: ".diff-grid", start: "top 70%" },
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power2.out",
    });
  }, { scope: section });

  return (
    <section id="about" ref={section} className="relative py-28 md:py-40 bg-dark overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-[0.04]">
        <div
          className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop")' }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl mb-20 md:mb-28">
          <span className="text-label text-accent mb-6 block">The Difference</span>
          <h2 className="text-section mb-6">
            We did the work<br />so you don't have to.
          </h2>
          <p className="text-body-lg text-light/60 text-balance">
            Sourcing the right material shouldn't mean reviewing thousands of options.
            Raw Select acts as a rigorous, opinionated filter — so every product you
            encounter is already worth your attention.
          </p>
        </div>

        <div className="diff-grid grid grid-cols-1 md:grid-cols-2 gap-x-14 lg:gap-x-20 gap-y-14">
          {features.map((f, i) => (
            <div key={i} className="diff-item group relative">
              <div className="diff-line absolute top-0 left-0 w-full h-px bg-white/12 origin-left" />
              <div className="pt-7">
                <span className="text-label text-accent mb-5 block">{f.num}</span>
                <h3 className="text-sub mb-3 text-light">{f.title}</h3>
                <p className="text-body text-light/60 mb-6">{f.desc}</p>
                <div className="diff-img relative w-full aspect-[16/10] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    style={{ backgroundImage: `url(${f.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
