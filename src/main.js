import "./style.css";
import { gsap } from "gsap";
import { initHero } from "./hero/hero.js";
import { initAiScan } from "./ai-scan/ai-scan.js";

/* ---- Hero sahnesi ---- */
initHero();

/* ---- AI Tarama sahnesi ---- */
initAiScan();

/* ---- Özel imleç (yaprak / renk damlası) ---- */
initCursor();

/* ---- Üst menü: dil / görünüm ikon geçişleri ---- */
initNavToggles();

function initCursor() {
  const cursor = document.querySelector("#cursor");
  if (!cursor) return;

  // Dokunmatik cihazlarda özel imleç yok
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

  // gsap transform'u tamamen yönetir (merkezleme + yaprak rotasyonu dahil)
  gsap.set(cursor, { xPercent: -50, yPercent: -50, rotation: 45 });
  const setX = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3" });
  const setY = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3" });

  window.addEventListener("pointermove", (e) => {
    setX(e.clientX);
    setY(e.clientY);
  });

  // Tıklanabilir alanlarda imleç büyür / şekil değiştirir
  const interactive = "a, button, .card, [data-cursor='grow']";
  document.addEventListener("pointerover", (e) => {
    if (e.target.closest(interactive)) cursor.classList.add("cursor--active");
  });
  document.addEventListener("pointerout", (e) => {
    if (e.target.closest(interactive)) cursor.classList.remove("cursor--active");
  });
}

function initNavToggles() {
  const langBtn = document.querySelector("#langToggle");
  const langIcon = document.querySelector("#langIcon");
  if (langBtn && langIcon) {
    langBtn.addEventListener("click", () => {
      const isTr = document.documentElement.lang === "tr";
      document.documentElement.lang = isTr ? "en" : "tr";
      langIcon.textContent = isTr ? "🇬🇧" : "🇹🇷";
    });
  }

  const themeBtn = document.querySelector("#themeToggle");
  const themeIcon = document.querySelector("#themeIcon");
  if (themeBtn && themeIcon) {
    themeBtn.addEventListener("click", () => {
      const isDark = themeIcon.textContent === "🌙";
      themeIcon.textContent = isDark ? "☀️" : "🌙";
    });
  }
}
