"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageModal from "@/components/ImageModal";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: "+", label: "Materials", desc: "Hand-selected" },
  { value: 120, suffix: "+", label: "Projects", desc: "Delivered" },
  { value: 98, suffix: "%", label: "Retention", desc: "Rate" },
];

const bodyLines = [
  "In an industry overwhelmed by endless choices,",
  "true quality comes from refined selection \u2014",
  "not abundance. Every material has been",
  "evaluated, tested, and approved by people",
  "who build for a living.",
];

export default function Philosophy() {
  const section = useRef<HTMLElement>(null);
  const imgRef1 = useRef<HTMLDivElement>(null);
  const imgRef2 = useRef<HTMLDivElement>(null);
  const statsScrollRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [activeStat, setActiveStat] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const openZoom = (src: string) => {
    if (navigator.vibrate) navigator.vibrate(8);
    setZoomedImage(src);
  };
  const closeZoom = () => setZoomedImage(null);

  useEffect(() => {
    if (!statsScrollRef.current) return;
    const container = statsScrollRef.current;
    const cards = container.querySelectorAll(".stat-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(cards).indexOf(entry.target as Element);
            if (index !== -1) setActiveStat(index);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    gsap.utils.toArray(".phil-float").forEach((shape, i) => {
      gsap.to(shape as Element, {
        y: `random(-60, 60)`,
        x: `random(-40, 40)`,
        rotation: `random(-25, 25)`,
        scale: `random(0.7, 1.3)`,
        duration: `random(6, 10)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (i as number) * 0.8,
      });
    });

    gsap.to(".phil-bg-shift", {
      backgroundPosition: "100% 50%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    if (imgRef1.current) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: imgRef1.current, start: "top 60%", end: "top 20%", scrub: 1.5 } });

      tl.fromTo(imgRef1.current,
        { clipPath: "circle(0% at 50% 50%)", scale: 1.4, filter: "blur(20px)" },
        { clipPath: "circle(75% at 50% 50%)", scale: 1, filter: "blur(0px)", duration: 2.8, ease: "power4.inOut" }, 0
      );

      tl.fromTo(".phil-img1-border",
        { scaleX: 0, scaleY: 0, opacity: 0 },
        { scaleX: 1, scaleY: 1, opacity: 1, duration: 1.5, ease: "power2.inOut" }, 0.5
      );

      tl.fromTo(".phil-img1-overlay", { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0.8);

      tl.to(imgRef1.current.querySelector("div"), {
        scale: 1.15, yPercent: -10, ease: "none",
        scrollTrigger: { trigger: imgRef1.current, start: "top bottom", end: "bottom top", scrub: true },
      }, 0);
    }

    // ── Pinned headline while content scrolls past ──
    if (pinnedRef.current && scrollAreaRef.current) {
      ScrollTrigger.create({
        trigger: pinnedRef.current,
        start: "top 15%",
        endTrigger: scrollAreaRef.current,
        end: "bottom 15%",
        pin: true,
        pinSpacing: true,
      });
    }

    // ── Entrance animation timeline ──
    const tl = gsap.timeline({ scrollTrigger: { trigger: ".phil-content", start: "top 60%", end: "top 15%", scrub: 2.5 } });

    tl.fromTo(".phil-line", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, ease: "none" }, 0);

    tl.fromTo(".phil-label-word", { y: "120%", opacity: 0, rotateX: -60 }, { y: "0%", opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "power3.out" }, 0.1);

    tl.fromTo(".phil-heading-word", { y: "140%", opacity: 0, rotateX: -45, skewY: 5 }, { y: "0%", opacity: 1, rotateX: 0, skewY: 0, duration: 1.4, stagger: 0.12, ease: "power4.out" }, 0.2);

    tl.fromTo(".phil-body",
      { y: 50, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out" },
      0.6
    );

    tl.fromTo(".phil-quote", { x: -80, opacity: 0, rotateY: 15, scale: 0.95 }, { x: 0, opacity: 1, rotateY: 0, scale: 1, duration: 1.6, ease: "power3.out" }, 0.7);

    tl.fromTo(".phil-quote-mark", { scale: 0, opacity: 0, rotation: -90 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(3)" }, 0.8);

    // ── Multi-line stagger with scroll scrub ──
    gsap.fromTo(".phil-line-text",
      { y: "120%", opacity: 0 },
      { y: "0%", opacity: 1, stagger: 0.15, duration: 1.2, ease: "power4.out",
        scrollTrigger: {
          trigger: ".phil-scroll-area",
          start: "top 65%",
          end: "top 20%",
          scrub: 1.5,
        },
      }
    );

    // ── Left border accent grows as lines reveal ──
    gsap.fromTo(".phil-border-accent",
      { scaleY: 0 },
      { scaleY: 1, ease: "none",
        scrollTrigger: {
          trigger: ".phil-scroll-area",
          start: "top 65%",
          end: "top 20%",
          scrub: 1,
        },
      }
    );

    // ── Section exit animations ──
    gsap.to(".phil-content", {
      opacity: 0.3,
      y: -40,
      scale: 0.95,
      ease: "none",
      scrollTrigger: { trigger: ".phil-content", start: "bottom 30%", end: "bottom top", scrub: true },
    });

    // ── Horizontal exit line ──
    gsap.fromTo(".phil-exit-line",
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, ease: "none",
        scrollTrigger: { trigger: ".phil-content", start: "bottom 20%", end: "bottom top", scrub: true },
      }
    );

    mm.add("(min-width: 1024px)", () => {
      gsap.to(".phil-quote", {
        y: -60, ease: "none",
        scrollTrigger: { trigger: ".phil-quote", start: "top bottom", end: "bottom top", scrub: true },
      });

      // Stat card hover enhancements
      gsap.utils.toArray(".stat-card").forEach((card) => {
        const el = card as HTMLElement;
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.06)", duration: 0.5, ease: "power2.out" });
          gsap.to(el.querySelector(".stat-num"), { color: "var(--color-accent)", scale: 1.05, duration: 0.4 });
          gsap.to(el.querySelector(".stat-glow"), { opacity: 1, scale: 1, duration: 0.5 });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { y: 0, boxShadow: "none", duration: 0.5, ease: "power2.out" });
          gsap.to(el.querySelector(".stat-num"), { color: "var(--color-text)", scale: 1, duration: 0.4 });
          gsap.to(el.querySelector(".stat-glow"), { opacity: 0, scale: 0.8, duration: 0.5 });
        });
      });

      // ── Image caption overlays on hover ──
      gsap.utils.toArray(".phil-img-hover").forEach((wrapper) => {
        const el = wrapper as HTMLElement;
        const caption = el.querySelector(".phil-caption") as HTMLElement;
        if (!caption) return;
        el.addEventListener("mouseenter", () => {
          gsap.to(caption, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(caption, { opacity: 0, y: 10, duration: 0.5, ease: "power2.out" });
        });
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.to(".phil-quote", {
        y: -30, ease: "none",
        scrollTrigger: { trigger: ".phil-quote", start: "top bottom", end: "bottom top", scrub: true },
      });

      // Mobile stat card glow on active
      const statCards = gsap.utils.toArray(".stat-card") as HTMLElement[];
      statCards.forEach((card) => {
        card.addEventListener("touchstart", () => {
          if (navigator.vibrate) navigator.vibrate(5);
          gsap.to(card.querySelector(".stat-glow"), { opacity: 0.6, scale: 1, duration: 0.4 });
          gsap.to(card.querySelector(".stat-num"), { color: "var(--color-accent)", duration: 0.3 });
        }, { passive: true });
        card.addEventListener("touchend", () => {
          gsap.to(card.querySelector(".stat-glow"), { opacity: 0, scale: 0.8, duration: 0.5 });
          gsap.to(card.querySelector(".stat-num"), { color: "var(--color-text)", duration: 0.4 });
        }, { passive: true });
      });

      // Mobile image parallax
      gsap.utils.toArray(".phil-img-hover").forEach((imgWrap) => {
        const el = imgWrap as HTMLElement;
        const inner = el.querySelector("div") as HTMLElement;
        if (inner) {
          gsap.to(inner, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });

      // ── Mobile stat card swipe momentum ──
      let momentumTimeout: ReturnType<typeof setTimeout> | undefined;
      const statContainer = statsScrollRef.current;
      if (statContainer) {
        statContainer.addEventListener("scroll", () => {
          clearTimeout(momentumTimeout);
          momentumTimeout = setTimeout(() => {
            const scrollLeft = statContainer.scrollLeft;
            const cardWidth = statContainer.querySelector(".stat-card")?.clientWidth || 300;
            const snapIndex = Math.round(scrollLeft / (cardWidth + 16));
            const snapPos = snapIndex * (cardWidth + 16);
            statContainer.scrollTo({ left: snapPos, behavior: "smooth" });
          }, 150);
        }, { passive: true });
      }
    });

    // ── Enhanced stat count-up (80% fast, 20% slow) ──
    const statEls = section.current?.querySelectorAll(".stat-num");
    statEls?.forEach((el, i) => {
      const target = stats[i]?.value || 0;
      const suffix = stats[i]?.suffix || "";
      const proxy = { val: 0 };
      const eightyPct = Math.round(target * 0.8);
      const trigger = ScrollTrigger.create({
        trigger: ".phil-stats",
        start: "top 65%",
        end: "top 35%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          let display: number;
          if (progress < 0.5) {
            display = Math.round((progress / 0.5) * eightyPct);
          } else {
            const remaining = (progress - 0.5) / 0.5;
            display = Math.round(eightyPct + remaining * (target - eightyPct));
          }
          (el as HTMLElement).textContent = display + suffix;
        },
      });
    });

    gsap.fromTo(".stat-card",
      { y: 120, opacity: 0, rotateX: 20, scale: 0.85 },
      { y: 0, opacity: 1, rotateX: 0, scale: 1, stagger: 0.25, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: ".phil-stats", start: "top 65%", end: "top 35%", scrub: 1.5 } }
    );

    if (imgRef2.current) {
      const tl2 = gsap.timeline({ scrollTrigger: { trigger: imgRef2.current, start: "top 65%", end: "top 25%", scrub: 1.5 } });

      tl2.fromTo(imgRef2.current,
        { clipPath: "inset(0 0 100% 0)", scale: 1.25 },
        { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 2.2, ease: "power4.inOut" }, 0
      );

      tl2.fromTo(".phil-img2-border",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.2, ease: "power2.inOut" }, 0.5
      );

      tl2.to(imgRef2.current.querySelector("div"), {
        scale: 1.1, yPercent: -8, ease: "none",
        scrollTrigger: { trigger: imgRef2.current, start: "top bottom", end: "bottom top", scrub: true },
      }, 0);
    }

    gsap.utils.toArray(".phil-img-hover").forEach((imgWrap) => {
      const el = imgWrap as HTMLElement;
      const inner = el.querySelector("div") as HTMLElement;
      el.addEventListener("mouseenter", () => {
        gsap.to(inner, { scale: 1.1, duration: 1, ease: "power2.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(inner, { scale: 1, duration: 1, ease: "power2.out" });
      });
    });
  }, { scope: section });

  return (
    <section ref={section} className="relative bg-bg-2 overflow-hidden">
      <div className="divider" />

      <div className="phil-bg-shift absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, var(--color-accent-dim) 0%, transparent 70%)", backgroundSize: "200% 200%" }} />

      <div className="phil-float absolute right-[8%] top-[15%] w-40 h-40 md:w-64 md:h-64 rounded-full border border-accent/10 pointer-events-none" />
      <div className="phil-float absolute bottom-[25%] left-[5%] w-24 h-24 md:w-36 md:h-36 rounded-full bg-accent-dim pointer-events-none" />
      <div className="phil-float absolute top-[40%] right-[20%] w-16 h-16 md:w-24 md:h-24 rounded-full border border-text/10 pointer-events-none" />

      {/* ── Pinned headline + multi-line body ── */}
      <div className="phil-content" style={{ paddingTop: "clamp(10rem, 18vw, 20rem)" }}>
        <div className="wrap">
          {/* Pinned area: label + headline */}
          <div ref={pinnedRef}>
            <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(4rem, 8vw, 8rem)" }}>
              <div className="lg:col-span-3">
                <div className="phil-line w-14 h-[1px] bg-accent origin-left" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }} />
                <span className="t-label text-accent tracking-[0.35em]">
                  {"Our Philosophy".split(" ").map((w, i) => (<span key={i} className="phil-label-word inline-block mr-[0.3em]">{w}</span>))}
                </span>
              </div>
              <div className="lg:col-span-8 lg:col-start-5">
                <div className="overflow-hidden" style={{ marginBottom: "0.25rem" }}>
                  <h2 className="phil-heading-word t-h1 text-text">Not more.</h2>
                </div>
                <div className="overflow-hidden" style={{ marginBottom: "clamp(2rem, 4vw, 4rem)" }}>
                  <h2 className="phil-heading-word t-h1 text-accent italic">Better.</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll area: multi-line body + quote */}
          <div ref={scrollAreaRef} className="phil-scroll-area">
            <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(4rem, 8vw, 8rem)" }}>
              <div className="lg:col-span-3">
                <div className="phil-border-accent w-[2px] bg-gradient-to-b from-accent via-accent/40 to-transparent origin-top" style={{ height: "clamp(10rem, 20vw, 18rem)", transform: "scaleY(0)" }} />
              </div>
              <div className="lg:col-span-8 lg:col-start-5">
                <div className="phil-body" style={{ marginBottom: "clamp(4rem, 8vw, 8rem)" }}>
                  {bodyLines.map((line, i) => (
                    <div key={i} className="overflow-hidden" style={{ marginBottom: "0.35rem" }}>
                      <p className="phil-line-text t-body-lg">{line}</p>
                    </div>
                  ))}
                </div>

                <div className="phil-quote relative" style={{ paddingLeft: "clamp(3rem, 6vw, 6rem)" }}>
                  <div className="phil-quote-mark absolute left-0 top-0 text-6xl font-serif text-accent/20 leading-none select-none">&ldquo;</div>
                  <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-accent via-accent/40 to-transparent" />
                  <p className="t-h2 text-text-50 italic leading-snug">&ldquo;Every selection is deliberate.<br />Every outcome is elevated.&rdquo;</p>
                  <span className="t-label text-muted block" style={{ marginTop: "clamp(2rem, 4vw, 3.5rem)" }}>&mdash; Raw Select</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Image 1 with caption overlay ── */}
      <div className="wrap" style={{ marginTop: "clamp(6rem, 12vw, 12rem)" }}>
        <div ref={imgRef1} className="phil-img-hover relative w-full overflow-hidden cursor-pointer tap-active" style={{ height: "clamp(350px, 55vh, 700px)" }}
          onClick={() => openZoom("/photo-1616046229478-9901c5536a45.avif")}
        >
          <div className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: 'url("/photo-1616046229478-9901c5536a45.avif")', height: "120%", top: "-10%" }} />
          <div className="phil-img1-overlay absolute inset-0 bg-gradient-to-t from-bg-2/50 to-transparent" style={{ opacity: 0 }} />
          <div className="phil-img1-border absolute inset-0 border border-text/10 pointer-events-none" style={{ margin: "clamp(1rem, 2vw, 1.5rem)", transform: "scaleX(0) scaleY(0)", opacity: 0 }} />
          <div className="phil-caption absolute bottom-6 left-6 z-10" style={{ opacity: 0, transform: "translateY(10px)" }}>
            <p className="t-label text-white/90">Hand-selected materials</p>
            <p className="text-xs text-white/50 mt-1">Curated from global suppliers</p>
          </div>
          <div className="absolute bottom-4 right-4 md:hidden flex items-center gap-2 text-white/60 text-xs pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
            <span>Tap to zoom</span>
          </div>
        </div>
      </div>

      {/* ── Stats section ── */}
      <div className="divider" />
      <div className="phil-stats" style={{ paddingTop: "clamp(6rem, 12vw, 12rem)", paddingBottom: "clamp(6rem, 12vw, 12rem)" }}>
        <div className="wrap">
          <div className="hidden md:grid md:grid-cols-3 gap-0">
            {stats.map((s, i) => (
              <div key={i} className="stat-card relative cursor-default" style={{ padding: "clamp(3rem, 6vw, 6rem) clamp(4rem, 8vw, 8rem)", borderRadius: "8px", transition: "box-shadow 0.5s ease" }}>
                <div className="stat-glow absolute inset-0 rounded-lg bg-accent-dim opacity-0 scale-80 pointer-events-none transition-none" />
                {i > 0 && <div className="hidden md:block absolute left-0 top-[15%] bottom-[15%] w-[1px] bg-text-08" />}
                {i > 0 && <div className="md:hidden absolute top-0 left-[10%] right-[10%] h-[1px] bg-text-08" />}
                <div className="stat-num t-stat text-text" style={{ transition: "color 0.4s ease" }}>0{s.suffix}</div>
                <p className="t-caption text-accent" style={{ marginTop: "clamp(1.25rem, 2.5vw, 2rem)", marginBottom: "clamp(0.5rem, 1vw, 1rem)" }}>{s.label}</p>
                <p className="text-[0.78rem] text-muted tracking-wide">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="md:hidden flex overflow-x-auto scroll-snap-x gap-4 -mx-6 px-6" ref={statsScrollRef} style={{ paddingBottom: "1rem", scrollBehavior: "smooth" }}>
            {stats.map((s, i) => (
              <div key={i} className="stat-card relative cursor-default flex-shrink-0 scroll-snap-center tap-ripple" style={{ minWidth: "80vw", padding: "clamp(2.5rem, 6vw, 4rem) clamp(2rem, 5vw, 3rem)", borderRadius: "16px", background: "var(--color-surface)", borderTop: activeStat === i ? "3px solid var(--color-accent)" : "2px solid var(--color-accent/15)", boxShadow: activeStat === i ? "0 8px 32px var(--color-accent/12)" : "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                <div className="stat-glow absolute inset-0 rounded-2xl bg-accent-dim opacity-0 scale-80 pointer-events-none transition-none" />
                <div className="stat-num t-stat text-text mobile-counter" style={{ transition: "color 0.4s ease" }}>0{s.suffix}</div>
                <p className="t-caption text-accent" style={{ marginTop: "clamp(1.25rem, 2.5vw, 2rem)", marginBottom: "clamp(0.5rem, 1vw, 1rem)" }}>{s.label}</p>
                <p className="text-[0.78rem] text-muted tracking-wide">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="md:hidden flex items-center justify-center gap-2" style={{ marginTop: "clamp(1.5rem, 3vw, 2rem)" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeStat === i ? "w-6 h-2 bg-accent dot-pulse" : "w-2 h-2 bg-text-15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-bleed image moment ── */}
      <div className="w-screen relative left-1/2 -translate-x-1/2" style={{ marginTop: "clamp(6rem, 12vw, 12rem)", marginBottom: "clamp(6rem, 12vw, 12rem)" }}>
        <div ref={imgRef2} className="phil-img-hover relative w-full overflow-hidden cursor-pointer tap-active" style={{ height: "clamp(400px, 55vh, 650px)" }}
          onClick={() => openZoom("/photo-1618221195710-dd6b41faaea6.avif")}
        >
          <div className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: 'url("/photo-1618221195710-dd6b41faaea6.avif")', height: "120%", top: "-10%" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-2/50 to-transparent" />
          <div className="phil-img2-border absolute inset-0 border border-text/10 pointer-events-none" style={{ margin: "clamp(1rem, 2vw, 1.5rem)", transform: "scaleX(0)", opacity: 0 }} />
          <div className="phil-caption absolute bottom-6 left-6 z-10" style={{ opacity: 0, transform: "translateY(10px)" }}>
            <p className="t-label text-white/90">Precision-crafted finishes</p>
            <p className="text-xs text-white/50 mt-1">Every surface tells a story</p>
          </div>
          <div className="absolute bottom-4 right-4 md:hidden flex items-center gap-2 text-white/60 text-xs pointer-events-none">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
            <span>Tap to zoom</span>
          </div>
        </div>
      </div>

      {/* ── Exit horizontal line ── */}
      <div className="phil-exit-line w-full h-[1px] bg-accent/20 origin-left" style={{ transform: "scaleX(0)", opacity: 0 }} />

      <div className="divider" />

      <ImageModal src={zoomedImage || ""} isOpen={zoomedImage !== null} onClose={closeZoom} />
    </section>
  );
}
