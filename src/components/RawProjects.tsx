"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Private Residence",
    location: "Copenhagen",
    palette: "Calacatta marble, brushed brass, fluted oak",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
    align: "md:ml-auto md:w-3/4",
  },
  {
    title: "Boutique Hotel",
    location: "Stockholm",
    palette: "Sintered stone, blackened steel, terrazzo",
    img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1600&auto=format&fit=crop",
    align: "md:w-2/3",
  },
  {
    title: "Corporate Headquarters",
    location: "Oslo",
    palette: "Backlit onyx, powder-coated aluminum, wool felt",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    align: "md:mx-auto md:w-[70%]",
  },
];

export default function RawProjects() {
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
      yPercent: -10,
      ease: "none",
    });

    const items = gsap.utils.toArray(".proj-item") as HTMLElement[];

    items.forEach((item) => {
      const wrap = item.querySelector(".proj-img-wrap");
      const img = item.querySelector(".proj-img");
      const text = item.querySelector(".proj-text");

      gsap.fromTo(
        wrap,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          ease: "power3.inOut",
          duration: 1.4,
          scrollTrigger: { trigger: item, start: "top 80%" },
        }
      );

      gsap.fromTo(
        img,
        { scale: 1.12 },
        {
          scale: 1,
          ease: "power2.out",
          duration: 1.4,
          scrollTrigger: { trigger: item, start: "top 80%" },
        }
      );

      gsap.from(text, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: { trigger: item, start: "top 80%" },
      });
    });

    gsap.from(".proj-header", {
      scrollTrigger: { trigger: section.current, start: "top 80%" },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, { scope: section });

  return (
    <section id="projects" ref={section} className="relative py-28 md:py-40 bg-light text-dark overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-[0.03]">
        <div
          className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop")' }}
        />
      </div>

      <div className="container relative z-10">
        <div className="proj-header mb-16 md:mb-28 max-w-2xl">
          <span className="text-label text-accent mb-6 block">Selected Projects</span>
          <h2 className="text-section">
            Where curation<br />meets creation.
          </h2>
        </div>

        <div className="flex flex-col gap-24 md:gap-36">
          {projects.map((p, i) => (
            <div key={i} className={`proj-item flex flex-col gap-5 ${p.align}`}>
              <div className="proj-img-wrap relative w-full aspect-[16/9] overflow-hidden">
                <div
                  className="proj-img absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.img})` }}
                />
              </div>
              <div className="proj-text flex flex-col md:flex-row justify-between md:items-end gap-3 border-b border-dark/15 pb-5">
                <div>
                  <h3 className="text-sub mb-1.5">{p.title}</h3>
                  <p className="text-cap text-dark/50">{p.location}</p>
                </div>
                <p className="text-body text-dark/60 max-w-xs text-left md:text-right">
                  {p.palette}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
