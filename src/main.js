import "./style.css";
import { initHero } from "./hero/hero.js";
import { initAiScan } from "./ai-scan/ai-scan.js";
import { initSections } from "./sections/sections.js";
import { initCursor } from "./shared/chrome.js";

/* ---- Hero sahnesi ---- */
initHero();

/* ---- AI Tarama sahnesi ---- */
initAiScan();

/* ---- Özellikler / İletişim / İndir: scroll-reveal ---- */
initSections();

/* ---- Custom cursor (leaf / color drop) ---- */
initCursor();
