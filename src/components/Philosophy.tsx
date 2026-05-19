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

    // Floating shapes with complex motion
    gsap.utils.toArray(".phil-float").forEach((shape, i) => {
      gsap.to(shape as Element, {
        y: `random(-50, 50)`,
        x: `random(-30, 30)`,
        rotation: `random(-20, 20)`,
        scale: `random(0.8, 1.2)`,
        duration: `random(5, 9)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.7,
      });
    });

    // Image 1 reveal with complex mask
    if (imgRef1.current) {
      gsap.fromTo(imgRef1.current,
        { clipPath: "circle(0% at 50% 50%)", scale: 1.3, filter: "blur(15px)" },
        {
          clipPath: "circle(75% at 50% 50%)", scale: 1, filter: "blur(0px)", duration: 2.5, ease: "power4.inOut",
          scrollTrigger: { trigger: imgRef1.current, start: "top 65%" },
        }
      );

      // Ken Burns on scroll
      gsap.to(imgRef1.current.querySelector("div"), {
        scale: 1.15, yPercent: -10, ease: "none",
        scrollTrigger: { trigger: imgRef1.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }

    // Content reveal timeline
    const tl = gsap.timeline({ scrollTrigger: { trigger: ".phil-content", start: "top 65%", end: "top 20%", scrub: 2 } });
    tl.fromTo(".phil-line", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "none" }, 0);
    tl.fromTo(".phil-label-word", { y: "100%", opacity: 0, rotateX: -45 }, { y: "0%", opacity: 1, rotateX: 0, duration: 1, stagger: 0.08, ease: "power3.out" }, 0.1);
    tl.fromTo(".phil-heading-word", { y: "120%", opacity: 0 }, { y: "0%", opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }, 0.2);
    tl.fromTo(".phil-body", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 0.5);
    tl.fromTo(".phil-quote", { x: -60, opacity: 0, rotateY: 10 }, { x: 0, opacity: 1, rotateY: 0, duration: 1.4, ease: "power3.out" }, 0.6);

    // Quote parallax
    mm.add("(min-width: 768px)", () => {
      gsap.to(".phil-quote", {
        y: -50, ease: "none",
        scrollTrigger: { trigger: ".phil-quote", start: "top bottom", end: "bottom top", scrub: true },
      });
    });

    // Stats counter with stagger
    const statEls = section.current?.querySelectorAll(".stat-num");
    statEls?.forEach((el, i) => {
      const target = stats[i]?.value || 0;
      const suffix = stats[i]?.suffix || "";
      gsap.to({ v: 0 }, {
        v: target, duration: 3.5, ease: "power2.out",
        scrollTrigger: { trigger: ".phil-stats", start: "top 70%" },
        onUpdate: function () { (el as HTMLElement).textContent = Math.round(this.targets()[0].v) + suffix; },
      });
    });

    // Stat cards 3D entrance
    gsap.fromTo(".stat-card",
      { y: 100, opacity: 0, rotateX: 15, scale: 0.9 },
      { y: 0, opacity: 1, rotateX: 0, scale: 1, stagger: 0.2, duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: ".phil-stats", start: "top 68%" } }
    );

    // Image 2 reveal
    if (imgRef2.current) {
      gsap.fromTo(imgRef2.current,
        { clipPath: "inset(0 0 100% 0)", scale: 1.2 },
        {
          clipPath: "inset(0 0 0% 0)", scale: 1, duration: 2, ease: "power4.inOut",
          scrollTrigger: { trigger: imgRef2.current, start: "top 70%" },
        }
      );

      gsap.to(imgRef2.current.querySelector("div"), {
        scale: 1.1, yPercent: -8, ease: "none",
        scrollTrigger: { trigger: imgRef2.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }
  }, { scope: section });

  return (
    <section ref={section} className="relative bg-bg-2 overflow-hidden">
      <div className="divider" />

      {/* Floating shapes */}
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
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent/40 to-transparent" />
                <p className="t-h2 text-text-50 italic leading-snug">&ldquo;Every selection is deliberate.<br />Every outcome is elevated.&rdquo;</p>
                <span className="t-label text-muted block" style={{ marginTop: "clamp(2rem, 4vw, 3.5rem)" }}>— Raw Select</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image 1 */}
      <div className="wrap" style={{ marginBottom: "clamp(6rem, 12vw, 12rem)" }}>
        <div ref={imgRef1} className="relative w-full overflow-hidden" style={{ height: "clamp(350px, 55vh, 700px)" }}>
          <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: 'url("/photo-1616046229478-9901c5536a45.avif")', height: "120%", top: "-10%" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-2/50 to-transparent" />
        </div>
      </div>

      <div className="divider" />
      <div className="phil-stats" style={{ paddingTop: "clamp(6rem, 12vw, 12rem)", paddingBottom: "clamp(6rem, 12vw, 12rem)" }}>
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {stats.map((s, i) => (
              <div key={i} className="stat-card relative" style={{ padding: "clamp(3rem, 6vw, 6rem) clamp(4rem, 8vw, 8rem)" }}>
                {i > 0 && <div className="hidden md:block absolute left-0 top-[15%] bottom-[15%] w-[1px] bg-text-08" />}
                {i > 0 && <div className="md:hidden absolute top-0 left-[10%] right-[10%] h-[1px] bg-text-08" />}
                <div className="stat-num t-stat text-text">0{s.suffix}</div>
                <p className="t-caption text-accent" style={{ marginTop: "clamp(1.25rem, 2.5vw, 2rem)", marginBottom: "clamp(0.5rem, 1vw, 1rem)" }}>{s.label}</p>
                <p className="text-[0.78rem] text-muted tracking-wide">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image 2 */}
      <div className="wrap" style={{ marginTop: "clamp(6rem, 12vw, 12rem)", marginBottom: "clamp(6rem, 12vw, 12rem)" }}>
        <div ref={imgRef2} className="relative w-full overflow-hidden" style={{ height: "clamp(300px, 45vh, 550px)" }}>
          <div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: 'url("/photo-1618221195710-dd6b41faaea6.avif")', height: "120%", top: "-10%" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-2/50 to-transparent" />
        </div>
      </div>

      <div className="divider" />
    </section>
  );
}
