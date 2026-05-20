import gsap from "gsap";

export const splitText = (text: string, className: string = "") => {
  return text.split(" ").map((word, i) => (
    <span key={i} className={`${className} inline-block mr-[0.3em]`}>
      {word}
    </span>
  ));
};

export const splitLetters = (text: string, className: string = "") => {
  return text.split("").map((letter, i) => (
    <span key={i} className={`${className} inline-block`}>
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));
};

export const animateCounter = (
  element: HTMLElement,
  target: number,
  suffix: string = "",
  duration: number = 2.5
) => {
  gsap.to({ v: 0 }, {
    v: target,
    duration,
    ease: "power2.out",
    onUpdate: function () {
      element.textContent = Math.round(this.targets()[0].v) + suffix;
    },
  });
};

export const magneticElement = (
  element: HTMLElement,
  radius: number = 50,
  strength: number = 0.3
) => {
  const onMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);
    if (distance < radius) {
      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };
  const onLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  };
  element.addEventListener("mousemove", onMove);
  element.addEventListener("mouseleave", onLeave);
  return () => {
    element.removeEventListener("mousemove", onMove);
    element.removeEventListener("mouseleave", onLeave);
  };
};
