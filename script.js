(function () {
gsap.registerPlugin(ScrollTrigger);
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. Split headline into letters (a11y label stays on h1) ---------- */
const title = document.getElementById("title");
const text = title.textContent.trim();
title.innerHTML = text.split(" ").map(w =>
  '<span class="word" aria-hidden="true">' + [...w].map(c => '<span class="ch">' + c + '</span>').join("") + "</span>"
).join("");

/* ---------- 2. Intro animation (time-based, runs once) ---------- */
const stats = gsap.utils.toArray(".stat");
if (!reduce) {
  gsap.set(".ch", { opacity: 0, y: 24 });
  gsap.set(stats, { opacity: 0, y: 28 });
  gsap.set("#car", { opacity: 0 });

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .to(".ch", { opacity: 1, y: 0, duration: 0.9, stagger: 0.05 })
    .to("#car", { opacity: 1, duration: 0.8 }, "-=0.6")
    .to(stats, { opacity: 1, y: 0, duration: 0.8, stagger: 0.22 }, "-=0.4");

  stats.forEach((s, i) => {
    const el = s.querySelector("[data-to]");
    const o = { v: 0 };
    gsap.to(o, { v: +el.dataset.to, duration: 1.4, delay: 1.5 + i * 0.22, ease: "power2.out",
      onUpdate: () => (el.textContent = Math.round(o.v)) });
  });
} else {
  stats.forEach(s => { const el = s.querySelector("[data-to]"); el.textContent = el.dataset.to; });
}

/* ---------- 3. Scroll-driven timeline (core feature) ---------- */
const tl = gsap.timeline({
  defaults: { ease: "none" },
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "+=260%",
    pin: true,
    scrub: reduce ? true : 1.1,      // scrub:number = built-in smoothing/interpolation
    invalidateOnRefresh: true,
    onUpdate: self => gsap.set("#hint", { opacity: 1 - Math.min(self.progress * 8, 1) })
  }
});

// Car travels down the road (length measured on refresh, no per-scroll reads)
tl.to("#car", { y: () => window.innerHeight * 0.82, scale: 1.12, duration: 4 }, 0);
// Gentle sway so the motion feels like driving, not sliding
tl.to("#car", { x: () => window.innerWidth * -0.012, rotation: -5, duration: 1, ease: "sine.inOut" }, 0)
  .to("#car", { x: () => window.innerWidth * 0.012, rotation: 5, duration: 2, ease: "sine.inOut" }, 1)
  .to("#car", { x: 0, rotation: 0, duration: 1, ease: "sine.inOut" }, 3);
// Road dashes rush upward to sell speed
tl.to(".lane", { y: () => -window.innerHeight * 1.1, duration: 4 }, 0);
// Headline drifts away + fades as the car passes
tl.to("#title", { y: -40, opacity: 0.15, duration: 1.5 }, 0.2);
// Each stat's accent bar fills as the car passes it (progress ≈ vertical position)
[0.27, 0.69, 0.47, 0.89].forEach((p, i) =>
  tl.to(stats[i].querySelector(".bar"), { scaleX: 1, duration: 0.5, ease: "power2.out" }, p * 4)
);

window.addEventListener("load", () => ScrollTrigger.refresh());
})();
