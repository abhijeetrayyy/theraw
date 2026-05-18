"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Raw Select changed how we source materials. Instead of wading through endless options, we get a focused, intelligent selection every time. It's not a supplier — it's a filter.",
    author: "Lead Architect",
    firm: "Studio Name",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop",
  },
  {
    quote:
      "The quality of their curation is unmatched. Every material we've specified from Raw Select has performed exactly as promised. That reliability is rare in this industry.",
    author: "Interior Designer",
    firm: "Design Firm Name",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop",
  },
];

export default function RawTestimonials() {
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
      yPercent: -12,
      ease: "none",
    });

    gsap.from(".t-header", {
      scrollTrigger: { trigger: section.current, start: "top 80%" },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".t-quote", {
      scrollTrigger: { trigger: section.current, start: "top 70%" },
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: section });

  return (
    <section ref={section} className="relative py-28 md:py-40 bg-dark overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-[0.03]">
        <div
          className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1600&auto=format&fit=crop")' }}
        />
      </div>

      <div className="container relative z-10">
        <div className="t-header mb-16 md:mb-24 max-w-xl">
          <span className="text-label text-accent mb-5 block">Trusted By</span>
          <h2 className="text-section">
            Specified by those<br />who set the standard.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="t-quote flex flex-col gap-6 group">
              <div className="relative w-full aspect-[16/10] overflow-hidden mb-4">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  style={{ backgroundImage: `url(${t.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
              </div>
              <p className="text-body-lg text-light/80 leading-relaxed font-normal">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-6 h-[2px] bg-accent rounded" />
                <span className="text-cap text-muted">
                  {t.author}, {t.firm}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
