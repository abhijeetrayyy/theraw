"use client";

import { useRef, useState, useEffect } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = container.querySelectorAll(".test-card");

    const onScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDist = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });

      setActiveCard(closestIndex);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const handleTestimonialTouch = () => {
    if (navigator.vibrate) navigator.vibrate(5);
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

    entranceTl.fromTo(".test-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
    entranceTl.fromTo(".test-heading-line", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out" }, 0.15);
    entranceTl.fromTo(".test-line-accent", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0.2);

    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray(".test-card") as HTMLElement[];
      cards.forEach((card, i) => {
        const quote = card.querySelector(".test-quote-text") as HTMLElement;
        const author = card.querySelector(".test-author") as HTMLElement;
        const img = card.querySelector(".test-author-img") as HTMLElement;
        const quoteMark = card.querySelector(".test-quote-mark") as HTMLElement;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            end: "top 25%",
            scrub: 1.5,
          },
        });

        tl.fromTo(card, { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }, 0);

        if (quoteMark) tl.fromTo(quoteMark, { scale: 0, opacity: 0, rotation: -90 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(3)" }, 0.15);

        if (quote) {
          tl.fromTo(quote.querySelectorAll("span"),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, duration: 0.7, ease: "power3.out" },
            0.25
          );
        }

        if (author) {
          tl.fromTo(author.children,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
            0.6
          );
        }

        if (img) {
          tl.fromTo(img, { scale: 0, clipPath: "circle(0% at 50% 50%)" }, { scale: 1, clipPath: "circle(100% at 50% 50%)", duration: 0.8, ease: "power3.out" }, 0.5);
        }

        // Parallax
        gsap.to(card, { yPercent: -4 - i * 2, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });

        // Hover
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -10, boxShadow: "0 30px 60px rgba(0,0,0,0.08)", borderColor: "var(--color-accent/30)", duration: 0.5, ease: "power2.out" });
          gsap.to(card.querySelector(".test-card-accent"), { scaleY: 1, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", borderColor: "var(--color-text-08)", duration: 0.5, ease: "power2.out" });
          gsap.to(card.querySelector(".test-card-accent"), { scaleY: 0, duration: 0.4, ease: "power2.out" });
        });
      });

      // Section exit
      gsap.to(".test-card", {
        opacity: 0.3,
        y: -30,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: section.current, start: "bottom 15%", end: "bottom top", scrub: true },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray(".test-card") as HTMLElement[];
      cards.forEach((card) => {
        const quote = card.querySelector(".test-quote-text") as HTMLElement;
        const author = card.querySelector(".test-author") as HTMLElement;
        const img = card.querySelector(".test-author-img") as HTMLElement;
        const quoteMark = card.querySelector(".test-quote-mark") as HTMLElement;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "left 70%",
            end: "left 30%",
            scrub: 1,
          },
        });

        tl.fromTo(card, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, 0);

        if (quoteMark) tl.fromTo(quoteMark, { scale: 0, opacity: 0, rotation: -60 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(3)" }, 0.15);

        if (quote) {
          tl.fromTo(quote.querySelectorAll("span"),
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.03, duration: 0.5, ease: "power3.out" },
            0.25
          );
        }

        if (author) {
          tl.fromTo(author.children,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" },
            0.5
          );
        }

        if (img) {
          tl.fromTo(img, { scale: 0, clipPath: "circle(0% at 50% 50%)" }, { scale: 1, clipPath: "circle(100% at 50% 50%)", duration: 0.7, ease: "power3.out" }, 0.4);
        }
      });
    });
  }, { scope: section });

  return (
    <section id="testimonials" ref={section} className="relative bg-bg overflow-hidden">
      <div className="divider" />

      {/* Accent line */}
      <div className="test-line-accent absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-left" style={{ opacity: 0 }} />

      <div style={{ paddingTop: "clamp(8rem, 14vw, 16rem)", paddingBottom: "clamp(8rem, 14vw, 16rem)" }}>
        <div className="wrap">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 mb-16 md:mb-24" style={{ gap: "clamp(3rem, 6vw, 6rem)" }}>
            <div className="lg:col-span-4">
              <p className="test-label t-label text-accent tracking-[0.35em]" style={{ opacity: 0 }}>Testimonials</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="test-heading" style={{ lineHeight: 1 }}>
                <div className="overflow-hidden mb-1"><span className="test-heading-line block t-display text-text" style={{ opacity: 0 }}>Trusted by</span></div>
                <div className="overflow-hidden"><span className="test-heading-line block t-display text-accent italic" style={{ opacity: 0 }}>the best.</span></div>
              </h2>
            </div>
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden md:grid md:grid-cols-3" style={{ gap: "clamp(2rem, 4vw, 3rem)" }}>
            {testimonials.map((t, i) => (
              <div key={i} className="test-card relative cursor-default" style={{ padding: "clamp(2.5rem, 4vw, 3rem)", borderRadius: "12px", background: "var(--color-surface)", border: "1px solid var(--color-text-08)", borderTop: "3px solid var(--color-accent/40)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.5s ease", overflow: "hidden" }}>
                <div className="test-card-accent absolute top-0 left-0 right-0 h-[3px] bg-accent origin-top" style={{ transform: "scaleY(0)" }} />
                <div className="test-quote-mark absolute top-4 right-6 text-6xl font-serif text-accent/10 leading-none select-none" style={{ opacity: 0 }}>&ldquo;</div>
                <div style={{ paddingTop: "clamp(2rem, 4vw, 3rem)" }}>
                  <div className="test-quote-text" style={{ marginBottom: "clamp(3rem, 5vw, 4rem)" }}>
                    {t.quote.split(" ").map((w, wi) => (<span key={wi} className="inline-block mr-[0.3em] text-text-70" style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.02rem)", lineHeight: 1.7 }}>{w}</span>))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0" style={{ padding: "clamp(2rem, 4vw, 3rem)", borderTop: "1px solid var(--color-text-08)" }}>
                    <div className="test-author flex items-center" style={{ gap: "clamp(1rem, 2vw, 1.5rem)" }}>
                      <div className="test-author-img w-14 h-14 rounded-full overflow-hidden bg-text-08 flex-shrink-0 border-2 border-accent/20">
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${t.img})` }} />
                      </div>
                      <div>
                        <p className="t-label text-text">{t.name}</p>
                        <p className="text-sm text-text-30">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: horizontal scroll carousel */}
          <div ref={scrollRef} className="flex md:hidden overflow-x-auto scroll-snap-x gap-5 -mx-6 px-6" style={{ paddingBottom: "1.5rem", scrollPaddingInline: "24px" }}>
            {testimonials.map((t, i) => (
              <div key={i} className="test-card relative flex-shrink-0 scroll-snap-center tap-ripple" style={{ minWidth: "85vw", maxWidth: "85vw", padding: "clamp(2rem, 5vw, 2.5rem)", borderRadius: "16px", background: "var(--color-surface)", border: activeCard === i ? "1.5px solid var(--color-accent/40)" : "1px solid var(--color-text-08)", borderTop: activeCard === i ? "3px solid var(--color-accent)" : "3px solid var(--color-accent/30)", boxShadow: activeCard === i ? "0 12px 40px var(--color-accent/12)" : "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }} onTouchStart={handleTestimonialTouch}>
                <div className="test-quote-mark absolute top-4 right-5 text-5xl font-serif text-accent/12 leading-none select-none" style={{ opacity: 0 }}>&ldquo;</div>
                <div style={{ paddingTop: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                  <div className="test-quote-text" style={{ marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                    {t.quote.split(" ").map((w, wi) => (<span key={wi} className="inline-block mr-[0.3em] text-text-70" style={{ fontSize: "clamp(0.9rem, 2.8vw, 1rem)", lineHeight: 1.7 }}>{w}</span>))}
                  </div>
                  <div style={{ paddingTop: "clamp(1.5rem, 3vw, 2rem)", borderTop: "1px solid var(--color-text-08)" }}>
                    <div className="test-author flex items-center" style={{ gap: "clamp(0.8rem, 2vw, 1.2rem)" }}>
                      <div className="test-author-img w-12 h-12 rounded-full overflow-hidden bg-text-08 flex-shrink-0 border-2 border-accent/20">
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${t.img})` }} />
                      </div>
                      <div>
                        <p className="t-label text-text" style={{ fontSize: "0.6rem" }}>{t.name}</p>
                        <p className="text-xs text-text-30">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: dot indicators */}
          <div className="flex items-center justify-center gap-2 md:hidden" style={{ marginTop: "clamp(1.5rem, 3vw, 2rem)" }}>
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  i === activeCard ? "w-6 h-2 bg-accent dot-pulse" : "w-2 h-2 bg-text-15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="divider" />
    </section>
  );
}
