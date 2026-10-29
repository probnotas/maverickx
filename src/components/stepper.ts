/**
 * The "how it works" explainer: one step visible at a time, its video looping,
 * with arrows, dots, keyboard arrows and swipe to move back and forth.
 */
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function show(fig: HTMLElement, to: number) {
  const slides = [...fig.querySelectorAll<HTMLElement>("[data-slide]")];
  const i = Math.max(0, Math.min(slides.length - 1, to));
  slides.forEach((s, n) => {
    s.hidden = n !== i;
    const v = s.querySelector("video");
    if (!v) return;
    if (n === i) {
      v.muted = true;
      if (reduced()) {
        v.controls = true; // no autoplay: the viewer can press play
      } else {
        v.preload = "auto";
        v.play().catch(() => (v.controls = true));
      }
    } else {
      v.pause();
    }
  });
  // Warm up the next clip so it starts instantly.
  const nextVideo = slides[i + 1]?.querySelector("video");
  if (nextVideo && nextVideo.preload === "none") nextVideo.preload = "auto";

  fig.dataset.index = String(i);
  fig.querySelectorAll<HTMLElement>("[data-steps-to]").forEach((d, n) => {
    if (n === i) d.setAttribute("aria-current", "step");
    else d.removeAttribute("aria-current");
  });
  const [prev, next] = fig.querySelectorAll<HTMLButtonElement>("[data-steps-go]");
  prev.disabled = i === 0;
  next.disabled = i === slides.length - 1;
}

const go = (fig: HTMLElement, delta: number) => show(fig, Number(fig.dataset.index ?? 0) + delta);

/** Call after a window's HTML is inserted. */
export function initSteps(root: ParentNode) {
  root.querySelectorAll<HTMLElement>("[data-steps]").forEach((fig) => {
    show(fig, 0);

    // Swipe left/right on the media (phones)
    let x0: number | null = null;
    const track = fig.querySelector<HTMLElement>(".b-steps__track")!;
    track.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    track.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 40) go(fig, dx < 0 ? 1 : -1);
    });
  });
}

// Arrows, dots and keyboard, delegated so they work in any window.
document.addEventListener("click", (e) => {
  const t = e.target as HTMLElement;
  const fig = t.closest<HTMLElement>("[data-steps]");
  if (!fig) return;
  const goBtn = t.closest<HTMLElement>("[data-steps-go]");
  const toBtn = t.closest<HTMLElement>("[data-steps-to]");
  if (goBtn) go(fig, Number(goBtn.dataset.stepsGo));
  else if (toBtn) show(fig, Number(toBtn.dataset.stepsTo));
});

document.addEventListener("keydown", (e) => {
  const fig = (e.target as HTMLElement).closest?.<HTMLElement>("[data-steps]");
  if (!fig || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
  e.preventDefault();
  go(fig, e.key === "ArrowRight" ? 1 : -1);
});
