"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RawCta() {
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

    gsap.from(".cta-reveal", {
      scrollTrigger: { trigger: section.current, start: "top 75%" },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
    });
  }, { scope: section });

  return (
    <section id="contact" ref={section} className="relative py-28 md:py-40 bg-dark overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-[0.06]">
        <div
          className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop")' }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="cta-reveal text-label text-accent mb-6 block">
            Let&apos;s Work Together
          </span>

          <h2 className="cta-reveal text-section mb-6">
            Your next project<br />deserves a better source.
          </h2>

          <p className="cta-reveal text-body-lg text-light/60 mb-12 text-balance">
            Whether you&apos;re specifying for a single room or an entire building,
            Raw Select provides the curation, support, and materials to elevate your work.
          </p>

          <div className="cta-reveal flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@rawselect.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-dark font-medium text-sm tracking-wider hover:bg-accent/90 transition-colors duration-300"
            >
              Start a Conversation
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 border border-border-strong text-light font-medium text-sm tracking-wider hover:bg-light hover:text-dark transition-all duration-300"
            >
              Request Samples
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
