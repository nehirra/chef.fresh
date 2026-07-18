import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * AI Tarama sahnesi: telefon + sincap sahneye girer, sincap "Scan Photo"
 * butonunu işaret eder, buton parlar, neon lazer elmayı yukarıdan aşağı
 * tarar; elma buzlu-cam geçişiyle "Item Details" kartına dönüşür, kategori
 * otomatik dolar, Save butonu nabız gibi atarak hazır olduğunu belli eder.
 *
 * Hero'daki aynı kanıtlanmış mimari: position:sticky (pin yok), scrub
 * timeline, transform/opacity/filter üzerinden GPU-dostu animasyon.
 */
export function initAiScan() {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const intro = document.querySelector(".ai-scan__intro");
  const phone = document.querySelector("#scanPhone");
  const squirrel = document.querySelector("#scanSquirrel");
  const apple = document.querySelector("#scanApple");
  const laser = document.querySelector("#scanLaser");
  const scanBtn = document.querySelector("#scanBtn");
  const screenAdd = document.querySelector("#screenAdd");
  const screenDetails = document.querySelector("#screenDetails");
  const saveBtn = document.querySelector("#saveBtn");
  const bgDay = document.querySelector("#ai-scan .bg-day");
  const catCards = gsap.utils.toArray(".cat-card");

  // Kartların 3D eğimi: her kartın data-ry / data-rz'sini oku (sol içe/sağa,
  // sağ içe/sola bakar). transformPerspective ile gerçek 3D derinlik.
  const cardTilt = (card) => ({
    rotationY: parseFloat(card.dataset.ry) || 0,
    rotationZ: parseFloat(card.dataset.rz) || 0,
    transformPerspective: 700,
    transformOrigin: "center center",
  });

  // --- Hareket azaltma: statik son durum ---
  if (prefersReduced) {
    gsap.set(intro, { opacity: 1, y: 0 });
    gsap.set([phone, squirrel, apple], { opacity: 1, y: 0, scale: 1 });
    gsap.set(laser, { opacity: 0 });
    gsap.set(apple, { opacity: 0 });
    gsap.set(screenAdd, { opacity: 0 });
    gsap.set(screenDetails, { opacity: 1, filter: "blur(0px)", scale: 1 });
    gsap.set(bgDay, { opacity: 1 });
    catCards.forEach((c) => gsap.set(c, { opacity: 1, y: 0, ...cardTilt(c) }));
    return;
  }

  // Başlangıç durumları
  gsap.set(intro, { opacity: 0, y: 16 });
  gsap.set(phone, { opacity: 0, scale: 0.85 });
  gsap.set(squirrel, { opacity: 0, y: 24, scale: 0.85 });
  gsap.set(apple, { opacity: 0, y: -10 });
  gsap.set(screenDetails, { opacity: 0, filter: "blur(6px)", scale: 0.94 });

  // Save butonu: sürekli "hazır" nabzı (scroll'dan bağımsız, hero'daki nefes gibi)
  gsap.to(saveBtn, {
    scale: 1.05,
    duration: 0.9,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });

  // Kategori kartları: başlangıçta üstte + görünmez, 3D eğimlerini korur.
  // Ayrıca hafif "süzülme" (yPercent) — scroll'un yönettiği y (px) ile
  // çakışmaz çünkü GSAP ikisini ayrı tutup toplar → nefes alan kartlar.
  catCards.forEach((card, i) => {
    gsap.set(card, { y: -64, opacity: 0, ...cardTilt(card) });
    gsap.to(card, {
      yPercent: 7,
      duration: 2.2 + i * 0.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: i * 0.15,
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ai-scan",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  // 1) Sahneye giriş: başlık, telefon, sincap, elma belirir
  tl.to(intro, { opacity: 1, y: 0, ease: "power2.out", duration: 0.12 }, 0)
    .to(bgDay, { opacity: 1, ease: "power2.inOut", duration: 0.7 }, 0.05)
    .to(phone, { opacity: 1, scale: 1, ease: "back.out(1.4)", duration: 0.18 }, 0.04)
    .to(squirrel, { opacity: 1, y: 0, scale: 1, ease: "back.out(1.5)", duration: 0.18 }, 0.1)
    .to(apple, { opacity: 1, y: 0, ease: "power2.out", duration: 0.16 }, 0.08);

  // 1b) Kategori kartları üstten aşağı kayarak + solarak süzülür (hafif stagger)
  tl.to(catCards, {
    y: 0,
    opacity: 1,
    ease: "power2.out",
    duration: 0.18,
    stagger: 0.025,
  }, 0.06);

  // 2) Sincap "Scan Photo" butonunu işaret eder — buton parlar
  tl.to(scanBtn, {
    scale: 1.08,
    boxShadow: "0 0 0 10px rgba(168, 85, 247, 0.22)",
    ease: "power1.out",
    duration: 0.06,
  }, 0.26).to(scanBtn, {
    scale: 1,
    boxShadow: "0 0 0 0 rgba(168, 85, 247, 0)",
    ease: "power1.in",
    duration: 0.06,
  }, 0.34);

  // 3) Lazer elmayı yukarıdan aşağı tarar
  tl.to(laser, { opacity: 1, duration: 0.04 }, 0.32)
    .fromTo(laser, { top: "0%" }, { top: "100%", ease: "power1.inOut", duration: 0.22 }, 0.32)
    .to(laser, { opacity: 0, duration: 0.05 }, 0.54);

  // 4) Elma buzlu-cam geçişiyle kaybolur, Item Details kartı belirir
  tl.to(apple, {
    opacity: 0,
    scale: 0.9,
    filter: "blur(10px)",
    ease: "power1.in",
    duration: 0.16,
  }, 0.38)
    .to(screenAdd, { opacity: 0, ease: "power1.in", duration: 0.12 }, 0.36)
    .to(screenDetails, {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      ease: "power2.out",
      duration: 0.2,
    }, 0.44);

  // 5) Sincap görevini tamamladı — küçük bir "başardım" sıçraması
  tl.to(squirrel, { y: -14, ease: "power1.out", duration: 0.08 }, 0.62)
    .to(squirrel, { y: 0, ease: "bounce.out", duration: 0.1 }, 0.7);
}
