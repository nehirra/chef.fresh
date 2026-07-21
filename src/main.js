import "./style.css";
import { initHero } from "./hero/hero.js";
import { initAiScan } from "./ai-scan/ai-scan.js";
import { initFeatures } from "./features/features.js";
import { initSections } from "./sections/sections.js";
import { initCursor, initNavToggles } from "./shared/chrome.js";

/* ---- Hero sahnesi ---- */
initHero();

/* ---- AI Tarama sahnesi ---- */
initAiScan();

/* ---- Özellikler sahnesi ---- */
initFeatures();

/* ---- İletişim / İndir: scroll-reveal ---- */
initSections();

/* ---- Custom cursor (leaf / color drop) ---- */
initCursor();

/* ---- Navbar: theme icon toggle ---- */
initNavToggles();
