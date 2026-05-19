"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: "+", label: "Materials", desc: "Hand-selected" },
  { value: 120, suffix: "+", label: "Projects", desc: "Delivered" },
  { value: 98, suffix: "%", label: "Retention", desc: "Rate" },
];

export default function Philosophy() {
  const section = useRef<HTMLElement>(null);
  const imgRef1 = useRef<HTMLDivElement>(null);
  const imgRef2 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // LAYER 1: Floating shapes with organic motion
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

    // LAYER 2: Subtle background gradient shift
    gsap.to(".phil-bg-shift", {
      backgroundPosition: "100% 50%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // LAYER 3: Image 1 multi-layer reveal
    if (imgRef1.current) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: imgRef1.current, start: "top 60%" } });

      // Base image emerges
      tl.fromTo(imgRef1.current,
        { clipPath: "circle(0% at 50% 50%)", scale: 1.4, filter: "blur(20px)" },
        { clipPath: "circle(75% at 50% 50%)", scale: 1, filter: "blur(0px)", duration: 2.8, ease: "power4.inOut" }, 0
      );

      // Border draws around
      tl.fromTo(".phil-img1-border",
        { scaleX: 0, scaleY: 0, opacity: 0 },
        { scaleX: 1, scaleY: 1, opacity: 1, duration: 1.5, ease: "power2.inOut" }, 0.5
      );

      // Overlay gradient fades
      tl.fromTo(".phil-img1-overlay", { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0.8);

      // Parallax on inner image
      tl.to(imgRef1.current.querySelector("div"), {
        scale: 1.15, yPercent: -10, ease: "none",
        scrollTrigger: { trigger: imgRef1.current, start: "top bottom", end: "bottom top", scrub: true },
      }, 0);
    }

    // LAYER 4: Content reveal with sequential build
    const tl = gsap.timeline({ scrollTrigger: { trigger: ".phil-content", start: "top 60%", end: "top 15%", scrub: 2.5 } });

    // Line draws
    tl.fromTo(".phil-line", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, ease: "none" }, 0);

    // Label words rise with rotation
    tl.fromTo(".phil-label-word", { y: "120%", opacity: 0, rotateX: -60 }, { y: "0%", opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "power3.out" }, 0.1);

    // Heading words with dramatic entrance
    tl.fromTo(".phil-heading-word", { y: "140%", opacity: 0, rotateX: -45, skewY: 5 }, { y: "0%", opacity: 1, rotateX: 0, skewY: 0, duration: 1.4, stagger: 0.12, ease: "power4.out" }, 0.2);

    // Body text with blur resolve
    tl.fromTo(".phil-body", { y: 50, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out" }, 0.6);

    // Quote block slides in from side with depth
    tl.fromTo(".phil-quote", { x: -80, opacity: 0, rotateY: 15, scale: 0.95 }, { x: 0, opacity: 1, rotateY: 0, scale: 1, duration: 1.6, ease: "power3.out" }, 0.7);

    // Quote mark animates
    tl.fromTo(".phil-quote-mark", { scale: 0, opacity: 0, rotation: -90 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(3)" }, 0.8);

    // Quote parallax on scroll
    mm.add("(min-width: 768px)", () => {
      gsap.to(".phil-quote", {
        y: -60, ease: "none",
        scrollTrigger: { trigger: ".phil-quote", start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // LAYER 5: Stats counter with 3D entrance
    const statEls = section.current?.querySelectorAll(".stat-num");
    statEls?.forEach((el, i) => {
      const target = stats[i]?.value || 0;
      const suffix = stats[i]?.suffix || "";
      gsap.to({ v: 0 }, {
        v: target, duration: 3.5, ease: "power2.out",
        scrollTrigger: { trigger: ".phil-stats", start: "top 65%" },
        onUpdate: function () { (el as HTMLElement).textContent = Math.round(this.targets()[0].v) + suffix; },
      });
    });

    // Stat cards with staggered 3D entrance
    gsap.fromTo(".stat-card",
      { y: 120, opacity: 0, rotateX: 20, scale: 0.85 },
      { y: 0, opacity: 1, rotateX: 0, scale: 1, stagger: 0.25, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: ".phil-stats", start: "top 65%" } }
    );

    // Stat card hover glow effect
    gsap.utils.toArray(".stat-card").forEach((card) => {
      const el = card as HTMLElement;
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.06)", duration: 0.5, ease: "power2.out" });
        gsap.to(el.querySelector(".stat-num"), { color: "var(--color-accent)", duration: 0.4 });
        gsap.to(el.querySelector(".stat-glow"), { opacity: 1, scale: 1, duration: 0.5 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { y: 0, boxShadow: "none", duration: 0.5, ease: "power2.out" });
        gsap.to(el.querySelector(".stat-num"), { color: "var(--color-text)", duration: 0.4 });
        gsap.to(el.querySelector(".stat-glow"), { opacity: 0, scale: 0.8, duration: 0.5 });
      });
    });

    // LAYER 6: Image 2 reveal with wipe effect
    if (imgRef2.current) {
      const tl2 = gsap.timeline({ scrollTrigger: { trigger: imgRef2.current, start: "top 65%" } });

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

    // Image hover effects
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

      {/* LAYER 0: Background gradient shift */}
      <div className="phil-bg-shift absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, var(--color-accent-dim) 0%, transparent 70%)", backgroundSize: "200% 200%" }} />

      {/* LAYER 1: Floating shapes */}
      <div className="phil-float absolute right-[8%] top-[15%] w-40 h-40 md:w-64 md:h-64 rounded-full border border-accent/10 pointer-events-none" />
      <div className="phil-float absolute bottom-[25%] left-[5%] w-24 h-24 md:w-36 md:h-36 rounded-full bg-accent-dim pointer-events-none" />
      <div className="phil-float absolute top-[40%] right-[20%] w-16 h-16 md:w-24 md:h-24 rounded-full border border-text/10 pointer-events-none" />

      <div style={{ paddingTop: "clamp(10rem, 18vw, 20rem)", paddingBottom: "clamp(10rem, 18vw, 20rem)" }}>
        <div className="wrap">
          <div className="phil-content grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(4rem, 8vw, 8rem)" }}>
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
              <div className="overflow-hidden" style={{ marginBottom: "clamp(4rem, 8vw, 8rem)" }}>
                <h2 className="phil-heading-word t-h1 text-accent italic">Better.</h2>
              </div>

              <p className="phil-body t-body-lg max-w-lg" style={{ marginBottom: "clamp(4rem, 8vw, 8rem)" }}>
                In an industry overwhelmed by endless choices, true quality comes from refined selection — not abundance. Every material has been evaluated, tested, and approved by people who build for a living.
              </p>

              <div className="phil-quote relative" style={{ paddingLeft: "clamp(3rem, 6vw, 6rem)" }}>
                <div className="phil-quote-mark absolute left-0 top-0 text-6xl font-serif text-accent/20 leading-none select-none">&ldquo;</div>
                <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-accent via-accent/40 to-transparent" />
                <p className="t-h2 text-text-50 italic leading-snug">&ldquo;Every selection is deliberate.<br />Every outcome is elevated.&rdquo;</p>
                <span className="t-label text-muted block" style={{ marginTop: "clamp(2rem, 4vw, 3.5rem)" }}>— Raw Select</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 3: Image 1 */}
      <div className="wrap" style={{ marginBottom: "clamp(6rem, 12vw, 12rem)" }}>
        <div ref={imgRef1} className="phil-img-hover relative w-full overflow-hidden cursor-pointer" style={{ height: "clamp(350px, 55vh, 700px)" }}>
          <div className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: 'url("/photo-1616046229478-9901c5536a45.avif")', height: "120%", top: "-10%" }} />
          <div className="phil-img1-overlay absolute inset-0 bg-gradient-to-t from-bg-2/50 to-transparent" style={{ opacity: 0 }} />
          <div className="phil-img1-border absolute inset-0 border border-text/10 pointer-events-none" style={{ margin: "clamp(1rem, 2vw, 1.5rem)", transform: "scaleX(0) scaleY(0)", opacity: 0 }} />
        </div>
      </div>

      {/* LAYER 5: Stats */}
      <div className="divider" />
      <div className="phil-stats" style={{ paddingTop: "clamp(6rem, 12vw, 12rem)", paddingBottom: "clamp(6rem, 12vw, 12rem)" }}>
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
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
        </div>
      </div>

      {/* LAYER 6: Image 2 */}
      <div className="wrap" style={{ marginTop: "clamp(6rem, 12vw, 12rem)", marginBottom: "clamp(6rem, 12vw, 12rem)" }}>
        <div ref={imgRef2} className="phil-img-hover relative w-full overflow-hidden cursor-pointer" style={{ height: "clamp(300px, 45vh, 550px)" }}>
          <div className="absolute inset-0 bg-cover bg-center will-change-transform transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundImage: 'url("/photo-1618221195710-dd6b41faaea6.avif")', height: "120%", top: "-10%" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-2/50 to-transparent" />
          <div className="phil-img2-border absolute inset-0 border border-text/10 pointer-events-none" style={{ margin: "clamp(1rem, 2vw, 1.5rem)", transform: "scaleX(0)", opacity: 0 }} />
        </div>
      </div>

      <div className="divider" />
    </section>
  );
}
