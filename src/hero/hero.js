import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero sahnesini kurar: sol sütunda sabit kalan başlık/metin, sağ sütunda
 * scroll ile açılan buzdolabı — kapaklar açılır, sincap çıkar, kartlar süzülür,
 * arka plan koyudan (gece) açığa (krem/gündüz) geçer.
 *
 * .hero__stage `position:sticky` ile sabitlenir (GSAP `pin:true` yerine) —
 * native sticky, JS spacer/fixed-position takasından kaynaklanan boş kare
 * sorununu ortadan kaldırır ve tamamen compositor'da çalışır.
 *
 * Katman mimarisi swappable: her .layer içindeki <img> ileride <spline-viewer>/<canvas>
 * ile değiştirilebilir; timeline yalnızca sarmalayıcı .layer'ları hareket ettirir.
 */
export function initHero() {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const fridge = document.querySelector("#fridge");
  const doorLeft = document.querySelector(".fridge__door--left");
  const doorRight = document.querySelector(".fridge__door--right");
  const glow = document.querySelector(".glow");
  const squirrel = document.querySelector(".squirrel");
  const cardFresh = document.querySelector(".card--fresh");
  const cardExpired = document.querySelector(".card--expired");
  const logoText = document.querySelector(".hero__logo-text");
  const title = document.querySelector(".hero__title");
  const subtitle = document.querySelector(".hero__subtitle");
  const bgDay = document.querySelector(".bg-day");
  const navLinks = document.querySelectorAll(".navbar__link");
  const navBrandText = document.querySelector(".navbar__brand-text");
  const navItems = document.querySelectorAll(".navbar__item");

  const inkNight = "#f5fbf3";
  const inkDay = "#1f2a20";
  const subtitleNight = "rgba(245, 251, 243, 0.66)";
  const subtitleDay = "rgba(31, 42, 32, 0.62)";
  const navItemBgDay = "rgba(31, 42, 32, 0.08)";

  // --- Hareket azaltma: statik "açılmış" son durumu göster, animasyon yok ---
  if (prefersReduced) {
    gsap.set(doorLeft, { rotationY: -115 });
    gsap.set(doorRight, { rotationY: 115 });
    gsap.set(glow, { opacity: 0.9, scale: 1 });
    gsap.set(squirrel, { opacity: 1, y: "-6%", scale: 1 });
    gsap.set([cardFresh, cardExpired], { opacity: 1, x: 0, y: 0, scale: 1 });
    gsap.set(bgDay, { opacity: 1 });
    gsap.set([logoText, title], { color: inkDay });
    gsap.set(subtitle, { color: subtitleDay });
    gsap.set([...navLinks, navBrandText], { color: inkDay });
    gsap.set(navItems, { backgroundColor: navItemBgDay });
    return;
  }

  // Kartların başlangıcı: buzdolabının içinde (merkeze yakın, küçük, görünmez)
  gsap.set(cardFresh, { x: 90, y: 50, scale: 0.6 });
  gsap.set(cardExpired, { x: -80, y: -40, scale: 0.6 });

  // --- Sürekli "nefes alma": kapalı buzdolabı hafifçe süzülür ---
  gsap.to(fridge, {
    y: "-2.2%",
    duration: 2.4,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });

  // --- Ana scroll timeline (sticky ile senkron, pin yok) ---
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  if (import.meta.env.DEV) {
    window.ScrollTrigger = ScrollTrigger;
    window.gsap = gsap;
  }

  // 1) Aşağı kaydır ipucu, scroll başlar başlamaz kaybolur
  tl.to("#scrollHint", { opacity: 0, duration: 0.15 }, 0);

  // 2) Arka plan gece -> krem (opacity crossfade, compositor) + metin rengi
  // Üst menü de aynı ilerlemeyle senkron crossfade olur.
  tl.to(bgDay, { opacity: 1, ease: "power2.inOut", duration: 0.55 }, 0.1)
    .to([logoText, title], { color: inkDay, ease: "power2.inOut", duration: 0.55 }, 0.1)
    .to(subtitle, { color: subtitleDay, ease: "power2.inOut", duration: 0.55 }, 0.1)
    .to([...navLinks, navBrandText], { color: inkDay, ease: "power2.inOut", duration: 0.55 }, 0.1)
    .to(navItems, { backgroundColor: navItemBgDay, ease: "power2.inOut", duration: 0.55 }, 0.1);

  // 3) Kapaklar menteşeden 3D döner (perspective ile) + soğuk parıltı süzülür
  tl.to(doorLeft, { rotationY: -115, ease: "power2.inOut" }, 0.05)
    .to(doorRight, { rotationY: 115, ease: "power2.inOut" }, 0.05)
    .to(glow, { opacity: 0.9, scale: 1, ease: "power1.out" }, 0.15);

  // 4) Sincap içeriden neşeyle çıkar
  tl.to(squirrel, { opacity: 1, y: "-6%", scale: 1, ease: "back.out(1.6)" }, 0.35);

  // 5) Bilgi kartları buzdolabından fırlar ve süzülür
  tl.to(cardFresh, { opacity: 1, x: 0, y: 0, scale: 1, ease: "back.out(1.4)" }, 0.5)
    .to(cardExpired, { opacity: 1, x: 0, y: 0, scale: 1, ease: "back.out(1.4)" }, 0.58);
}
