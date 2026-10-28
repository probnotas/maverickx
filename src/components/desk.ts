import { gsap } from "gsap";
import { boot, desk, media } from "../content";
import { escape, rich } from "../rich";
import { screenBox, screenClip } from "../screenShape";

const img = media.desk;
const sc = screenBox;
const pw = img.power;

// A fine hairline arrow from the note up to the button.
const arrow = `
  <svg class="desk__arrow" viewBox="0 0 80 48" aria-hidden="true">
    <path class="desk__arrow-line" pathLength="1" d="M78 46 C 56 46, 30 40, 7 7" />
    <path class="desk__arrow-head" d="M7 7 L 15.5 9.5 M7 7 L 7.5 15.8" />
  </svg>`;

export function renderDesk(): string {
  return `
  <section class="desk" id="desk" aria-label="${escape(desk.headline)}">
    <div class="desk__stage">
      <div class="desk__scene">
        <img class="desk__img" src="${img.src}" srcset="${img.srcSmall} 1440w, ${img.src} 2560w"
             sizes="(max-width: 900px) 1440px, 2560px" alt="${escape(img.alt)}" fetchpriority="high">
        <div class="desk__screen" aria-hidden="true">
          <div class="desk__boot"><img class="boot-logo" src="${media.brand.logo}" alt=""><p>${rich(boot.title)}</p></div>
          <div class="desk__crt"></div>
          <div class="desk__off"></div>
        </div>
        <button class="desk__power" type="button" aria-label="${escape(desk.powerLabel)}"
                style="left:${pw.x * 100}%;top:${pw.y * 100}%"></button>
        <p class="desk__callout" style="left:${pw.x * 100}%;top:${pw.y * 100}%" aria-hidden="true">
          ${arrow}
          <span class="desk__note">
            <small>${rich(desk.powerKicker)}</small>
            <em class="desk__callout-mouse">${rich(desk.powerArrow)}</em>
            <em class="desk__callout-touch">${rich(desk.powerArrowTouch)}</em>
          </span>
        </p>
      </div>
      <div class="desk__vignette" aria-hidden="true"></div>
      <header class="desk__intro">
        <h1 class="desk__headline">${rich(desk.headline)}</h1>
      </header>
      <div class="desk__foot">
        <p class="desk__sub">${rich(desk.sub)}</p>
      </div>
      <button class="desk__skip" type="button">${rich(desk.skip)}<span aria-hidden="true">→</span></button>
    </div>
  </section>`;
}

/** Where things sit for the current viewport. All in CSS px. */
function geometry() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const ar = img.width / img.height;
  const sceneW = Math.max(vw, vh * ar);
  const sceneH = sceneW / ar;
  const left = (vw - sceneW) / 2;
  const top = (vh - sceneH) / 2;
  const sw = sceneW * sc.width;
  const sh = sceneH * sc.height;
  const cx = left + sceneW * (sc.left + sc.width / 2);
  const cy = top + sceneH * (sc.top + sc.height / 2);
  const aspect = sw / sh;
  const tw = Math.min(vw * 0.96, vh * 0.92 * aspect);
  const th = tw / aspect;
  return {
    scene: { width: sceneW, height: sceneH, left, top },
    scale: tw / sw,
    dx: vw / 2 - cx,
    dy: vh / 2 - cy,
    os: { left: (vw - tw) / 2, top: (vh - th) / 2, width: tw, height: th },
  };
}

interface Hooks {
  /** The camera has reached the screen (or there is no zoom): start the OS. */
  onReached: (instant: boolean) => void;
  /** Shut down began: hide the OS. */
  onShutdown: () => void;
}

/**
 * Click the monitor to power on: CRT flash, camera pushes into the screen,
 * then the desktop boots. Still mode (phones, reduced motion) skips the zoom.
 */
export function setupDesk(root: HTMLElement, os: HTMLElement, hooks: Hooks) {
  const html = document.documentElement;
  const section = root.querySelector<HTMLElement>(".desk")!;
  const scene = section.querySelector<HTMLElement>(".desk__scene")!;
  const q = (s: string) => section.querySelector<HTMLElement>(s)!;
  const still = window.matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)");
  let g = geometry();
  let on = false;
  let tl: gsap.core.Timeline | undefined;

  const layout = () => {
    g = geometry();
    Object.assign(scene.style, {
      width: `${g.scene.width}px`,
      height: `${g.scene.height}px`,
      left: `${g.scene.left}px`,
      top: `${g.scene.top}px`,
    });
    // Scene-relative unit for the button and callout, so they scale with the photo.
    scene.style.setProperty("--su", `${g.scene.width / 100}px`);
    scene.style.setProperty("--pw", `${pw.size * 100}`);
    Object.assign(q(".desk__screen").style, {
      left: `${sc.left * 100}%`,
      top: `${sc.top * 100}%`,
      width: `${sc.width * 100}%`,
      height: `${sc.height * 100}%`,
      clipPath: screenClip,
    });
    gsap.set(scene, { transformOrigin: `${(sc.left + sc.width / 2) * 100}% ${(sc.top + sc.height / 2) * 100}%` });
    if (html.classList.contains("mode-zoom")) {
      Object.assign(os.style, {
        left: `${g.os.left}px`,
        top: `${g.os.top}px`,
        width: `${g.os.width}px`,
        height: `${g.os.height}px`,
      });
      if (on && !tl?.isActive()) gsap.set(scene, { x: g.dx, y: g.dy, scale: g.scale });
    } else {
      os.removeAttribute("style");
      gsap.set(scene, { clearProps: "transform" });
    }
  };

  const setMode = () => {
    const zoom = !still.matches;
    html.classList.toggle("mode-zoom", zoom);
    html.classList.toggle("mode-still", !zoom);
    tl?.kill();
    layout();
    if (!zoom) {
      // Still mode: the desktop is simply there, below the desk.
      gsap.set(".desk__intro, .desk__foot, .desk__skip", { clearProps: "all" });
      hooks.onReached(true);
    } else if (on) {
      gsap.set(".desk__intro, .desk__foot, .desk__skip", { autoAlpha: 0 });
      gsap.set(".desk__off", { opacity: 0 });
      gsap.set(".desk__vignette", { opacity: 1 });
      hooks.onReached(true);
    } else {
      gsap.set(os, { autoAlpha: 0 });
    }
  };

  const powerOn = (instant = false) => {
    if (html.classList.contains("mode-still")) {
      document.getElementById("files")?.scrollIntoView({ behavior: instant ? "auto" : "smooth" });
      return;
    }
    if (on) return;
    on = true;
    html.classList.add("is-on");
    tl?.kill();
    tl = gsap
      .timeline({ onComplete: () => hooks.onReached(instant) })
      .to(".desk__intro, .desk__foot, .desk__skip", { autoAlpha: 0, y: -16, duration: 0.3 }, 0)
      .to(".desk__callout", { autoAlpha: 0, duration: 0.2 }, 0)
      // CRT: a thin bright line opens into a lit screen.
      .fromTo(".desk__crt", { opacity: 1, scaleX: 0, scaleY: 0.01 }, { scaleX: 1, duration: 0.18, ease: "power2.out" }, 0.1)
      .set(".desk__off", { opacity: 0 }, 0.28)
      .to(".desk__crt", { scaleY: 1, duration: 0.2, ease: "power2.in" }, 0.28)
      .to(".desk__crt", { opacity: 0, duration: 0.35 }, 0.48)
      .fromTo(".desk__boot", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.55)
      // Camera pushes into the screen.
      .to(scene, { x: () => g.dx, y: () => g.dy, scale: () => g.scale, duration: 1.6, ease: "power2.inOut" }, 0.6)
      .to(".desk__vignette", { opacity: 1, duration: 1.2 }, 0.6);
    if (instant) tl.progress(1);
  };

  const powerOff = () => {
    if (!on || html.classList.contains("mode-still")) return;
    on = false;
    hooks.onShutdown();
    tl?.kill();
    tl = gsap
      .timeline({ onComplete: () => html.classList.remove("is-on") })
      .to(scene, { x: 0, y: 0, scale: 1, duration: 1.3, ease: "power2.inOut" }, 0.2)
      .to(".desk__vignette", { opacity: 0.4, duration: 1 }, 0.2)
      .to(".desk__boot", { opacity: 0, duration: 0.3 }, 1.2)
      .set(".desk__off", { opacity: 1 }, 1.5)
      .to(".desk__intro, .desk__foot, .desk__skip, .desk__callout", { autoAlpha: 1, y: 0, duration: 0.4 }, 1.4);
  };

  // The power button presses in, then the computer starts.
  const power = q(".desk__power");
  power.addEventListener("click", () => {
    power.classList.add("is-pressed");
    setTimeout(() => {
      power.classList.remove("is-pressed");
      powerOn();
    }, 160);
  });
  q(".desk__skip").addEventListener("click", () => powerOn(true));
  window.addEventListener("resize", layout);
  still.addEventListener("change", setMode);
  setMode();

  return { powerOn, powerOff };
}
