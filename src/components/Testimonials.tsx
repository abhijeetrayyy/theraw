"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { quote: "Raw Select changed how we approach material specification. Their curation is ruthless in the best way — every option they presented was genuinely viable.", name: "Elena Voss", role: "Principal, Voss Studio", img: "/photo-1564078516393-cf04bd966897.avif" },
  { quote: "We used to spend weeks reviewing material libraries. Now we spend hours. The quality of their shortlist is remarkable — it's like they already know what we're looking for.", name: "Marcus Chen", role: "Design Director, Arcform", img: "/photo-1567016376408-0226e4d0c1ea.avif" },
  { quote: "The level of technical support they provide is unlike any supplier we've worked with. They understand the specification process from the inside.", name: "Sarah Lindgren", role: "Senior Architect, Studio Nord", img: "/photo-1586023492125-27b2c045efd7.avif" },
];

export default function Testimonials() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Floating quote marks
    gsap.utils.toArray(".test-quote-float").forEach((q, i) => {
      gsap.to(q as Element, { y: `random(-40, 40)`, x: `random(-20, 20)`, rotation: `random(-8, 8)`, duration: `random(5, 8)`, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.5 });
    });

    // Header entrance
    const headerTl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 65%" } });
    headerTl.fromTo(".test-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut", transformOrigin: "left" }, 0);
    headerTl.fromTo(".test-label-word", { y: "100%", opacity: 0, rotateX: -45 }, { y: "0%", opacity: 1, rotateX: 0, stagger: 0.06, duration: 0.9, ease: "power3.out" }, 0.1);
    headerTl.fromTo(".test-heading-mask", { yPercent: 130 }, { yPercent: 0, stagger: 0.12, duration: 1.4, ease: "power4.out" }, 0.2);

    // Testimonial cards
    const cards = gsap.utils.toArray(".test-card") as HTMLElement[];
    cards.forEach((card, i) => {
      const quote = card.querySelector(".test-quote-text") as HTMLElement;
      const author = card.querySelector(".test-author") as HTMLElement;
      const img = card.querySelector(".test-author-img") as HTMLElement;

      const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 70%", end: "top 20%", scrub: 1.2 } });

      // Card entrance with 3D rotation
      tl.fromTo(card, { rotateY: i % 2 === 0 ? -8 : 8, opacity: 0, scale: 0.92 }, { rotateY: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, 0);

      // Quote text reveals character-by-character feel via word stagger
      if (quote) {
        tl.fromTo(quote.querySelectorAll("span"),
          { y: 30, opacity: 0, rotateX: -20 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 0.7, ease: "power3.out" },
          0.3
        );
      }

      // Author info slides up
      if (author) {
        tl.fromTo(author.children,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
          0.6
        );
      }

      // Author image circular reveal
      if (img) {
        tl.fromTo(img, { scale: 0, clipPath: "circle(0% at 50% 50%)" }, { scale: 1, clipPath: "circle(100% at 50% 50%)", duration: 0.8, ease: "power3.out" }, 0.5);
      }

      // Parallax on card
      gsap.to(card, { yPercent: -3, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });

      // Hover effect
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.06)", borderColor: "var(--color-accent/20)", duration: 0.4, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, boxShadow: "none", borderColor: "var(--color-text-08)", duration: 0.4, ease: "power2.out" });
      });
    });
  }, { scope: section });

  return (
    <section id="testimonials" ref={section} className="relative bg-bg overflow-hidden">
      <div className="divider" />
      {/* Floating quote marks */}
      <div className="test-quote-float absolute top-[15%] left-[5%] text-[12rem] font-serif text-accent/[0.06] leading-none pointer-events-none select-none">&ldquo;</div>
      <div className="test-quote-float absolute bottom-[10%] right-[8%] text-[10rem] font-serif text-accent/[0.06] leading-none pointer-events-none select-none">&rdquo;</div>

      <div style={{ paddingTop: "clamp(10rem, 18vw, 20rem)", paddingBottom: "clamp(10rem, 18vw, 20rem)" }}>
        <div className="wrap">
          <div style={{ marginBottom: "clamp(8rem, 16vw, 16rem)" }}>
            <div className="test-line w-14 h-[1px] bg-accent origin-left" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }} />
            <span className="t-label text-accent tracking-[0.35em] block" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              {"Testimonials".split(" ").map((w, i) => (<span key={i} className="test-label-word inline-block mr-[0.3em]">{w}</span>))}
            </span>
            <div className="test-heading max-w-3xl">
              <div className="overflow-hidden" style={{ marginBottom: "0.25rem" }}><h2 className="test-heading-mask t-h1 text-text">Trusted by</h2></div>
              <div className="overflow-hidden"><h2 className="test-heading-mask t-h1 text-accent italic">the best.</h2></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(3rem, 6vw, 5rem)" }}>
            {testimonials.map((t, i) => (
              <div key={i} className="test-card relative group cursor-default" style={{ padding: "clamp(2rem, 4vw, 3rem)", borderRadius: "8px", border: "1px solid var(--color-text-08)", transition: "border-color 0.4s ease, box-shadow 0.4s ease" }}>
                <div className="absolute -top-3 left-8 text-5xl font-serif text-accent/10 leading-none select-none group-hover:text-accent/20 transition-colors duration-400">&ldquo;</div>
                <div style={{ paddingTop: "clamp(3rem, 6vw, 5rem)" }}>
                  <div className="test-quote-text" style={{ marginBottom: "clamp(4rem, 8vw, 6rem)" }}>
                    {t.quote.split(" ").map((w, wi) => (<span key={wi} className="inline-block mr-[0.3em]">{w}</span>))}
                  </div>
                  <div className="test-author flex items-center" style={{ gap: "clamp(1rem, 2vw, 1.5rem)" }}>
                    <div className="test-author-img w-14 h-14 rounded-full overflow-hidden bg-text-08 flex-shrink-0">
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${t.img})` }} />
                    </div>
                    <div>
                      <p className="t-label text-text">{t.name}</p>
                      <p className="text-sm text-text-30">{t.role}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 right-6 text-4xl font-serif text-accent/10 leading-none select-none group-hover:text-accent/20 transition-colors duration-400">&rdquo;</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="divider" />
    </section>
  );
}
