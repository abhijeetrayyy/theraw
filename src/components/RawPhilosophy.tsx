"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    num: "01",
    title: "The Noise",
    desc: "In an industry overwhelmed by endless choices, true quality is lost. Catalogs stretch for thousands of pages, inducing decision fatigue and diluting intent.",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "02",
    title: "The Filter",
    desc: "We eliminate the unnecessary. Every material is evaluated, tested, and vetted — for performance, durability, and aesthetic integrity.",
    img: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "03",
    title: "The Signal",
    desc: "What remains is a refined palette. We enable architects and designers to focus on what truly matters — creating spaces that stand apart.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function RawPhilosophy() {
  const section = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(bgRef.current, {
      scrollTrigger: {
        trigger: section.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.3,
      },
      yPercent: -8,
      ease: "none",
    });

    const items = gsap.utils.toArray(".stack-card") as HTMLElement[];
    if (!items.length) return;

    const animCount = items.length - 1;

    gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        start: "top top",
        end: `+=${animCount * 100}%`,
        pin: true,
        scrub: 0.3,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
    .to(items[0], { yPercent: -105, scale: 0.9, opacity: 0, ease: "power2.inOut" })
    .to(items[1], { yPercent: -105, scale: 0.9, opacity: 0, ease: "power2.inOut" }, "+=0");

    gsap.from(".phil-label", {
      scrollTrigger: { trigger: section.current, start: "top 80%" },
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, { scope: section });

  return (
    <section ref={section} className="relative h-screen w-full bg-dark overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-[0.04]">
        <div
          className="absolute inset-0 w-full h-[120%] -top-[10%] bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop")' }}
        />
      </div>

      <div className="phil-label absolute top-16 md:top-20 left-0 w-full z-50 pointer-events-none">
        <div className="container">
          <span className="text-label text-accent">Our Philosophy</span>
        </div>
      </div>

      <div className="relative w-full h-full flex items-center justify-center px-5 md:px-10">
        {cards.map((card, i) => (
          <div
            key={i}
            className="stack-card absolute w-full max-w-5xl h-[55vh] md:h-[60vh] flex flex-col md:flex-row overflow-hidden will-anim"
            style={{ zIndex: cards.length - i }}
          >
            <div className="w-full md:w-[55%] h-1/2 md:h-full bg-light p-8 md:p-12 lg:p-16 flex flex-col justify-center text-dark">
              <span className="text-label text-accent mb-5">{card.num}</span>
              <h2 className="text-sub mb-5">{card.title}</h2>
              <p className="text-body text-dark/60">{card.desc}</p>
            </div>

            <div
              className="w-full md:w-[45%] h-1/2 md:h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${card.img})` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
