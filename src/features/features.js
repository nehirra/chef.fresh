import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Features: hero/ai-scan'daki aynı sticky-pin mimarisi (position:sticky,
 * scrub timeline). Sahneye girişte başlık + kartlar belirir. Işıklanma
 * (glow) artık scroll'a değil hover'a bağlı — bkz. .feature-card:hover
 * (style.css).
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
    gsap.set(cards, { opacity: 1, y: 0 });
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

  // Sahneye giriş: başlık ve kartlar belirir
  tl.to(intro, { opacity: 1, y: 0, ease: "power2.out", duration: 0.14 }, 0)
    .to(cards, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      duration: 0.16,
      stagger: 0.04,
    }, 0.08);
}
