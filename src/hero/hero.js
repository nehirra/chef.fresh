/**
 * Hero sahnesi: sol sütunda başlık/metin, sağ sütunda sürekli döngüde oynayan
 * tanıtım videosu. Video scroll'a bağlı DEĞİL — HTML autoplay/loop ile kendi
 * başına, kesintisiz döner. Bu yüzden burada GSAP scroll timeline'ı yoktur.
 *
 * initHero yalnızca iki şeyi güvenceye alır:
 *  1) Otomatik oynatma engellenirse videoyu elle bir kez tetikler.
 *  2) "Hareket azaltma" tercih eden kullanıcıda videoyu duraklatır (poster kalır).
 */
export function initHero() {
  const video = document.querySelector(".hero__video");
  if (!video) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }

  // Bazı tarayıcılar muted autoplay'i yine de engelleyebilir; nazikçe tetikle.
  const play = () => video.play().catch(() => {});
  if (video.readyState >= 2) play();
  else video.addEventListener("loadeddata", play, { once: true });
}
