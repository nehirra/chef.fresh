import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REST_SHADOW = "0 14px 34px rgba(20, 30, 22, 0.06)";
const REST_BORDER = "rgba(31, 42, 32, 0.06)";
const GLOW_SHADOW = "0 26px 54px rgba(34, 197, 94, 0.3)";
const GLOW_BORDER = "rgba(34, 197, 94, 0.45)";

/**
 * Features: hero/ai-scan'daki aynı sticky-pin mimarisi (position:sticky,
 * scrub timeline). Sahneye girişte başlık + kartlar belirir, ardından
 * scroll ilerledikçe kartlar sırayla (spot ışığı gibi) öne çıkar.
 */
export function initFeatures() {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const intro = document.querySelector(".features__intro");
  const cards = document.querySelectorAll(".feature-card");
  if (!intro || !cards.length) return;

  if (prefersReduced) {
    gsap.set(intro, { opacity: 1, y: 0 });
    gsap.set(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      boxShadow: REST_SHADOW,
      borderColor: REST_BORDER,
    });
    return;
  }

  gsap.set(intro, { opacity: 0, y: 16 });
  gsap.set(cards, { opacity: 0, y: 24 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".features",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  // 1) Sahneye giriş: başlık ve kartlar belirir
  tl.to(intro, { opacity: 1, y: 0, ease: "power2.out", duration: 0.14 }, 0)
    .to(cards, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      duration: 0.16,
      stagger: 0.04,
    }, 0.08);

  // 2) Scroll ilerledikçe kartlar sırayla öne çıkar (spot ışığı)
  const perCard = 0.2;
  let t = 0.3;
  cards.forEach((card) => {
    tl.to(card, {
      y: -10,
      scale: 1.035,
      boxShadow: GLOW_SHADOW,
      borderColor: GLOW_BORDER,
      ease: "power2.out",
      duration: perCard / 2,
    }, t).to(card, {
      y: 0,
      scale: 1,
      boxShadow: REST_SHADOW,
      borderColor: REST_BORDER,
      ease: "power2.in",
      duration: perCard / 2,
    }, t + perCard / 2);
    t += perCard;
  });
}
