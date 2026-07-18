import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Özellikler / İletişim / İndir: hero ve ai-scan'daki gibi pinlenen sahneler
 * değil, normal akışta duran statik bölümler — bu yüzden yalnızca hafif bir
 * scroll-reveal (fade + translateY) yeterli.
 */
export function initSections() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return;

  reveals.forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: (i % 4) * 0.08,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });
}
