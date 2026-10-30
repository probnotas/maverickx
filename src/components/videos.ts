import { gsap } from "gsap";
import { videos, type Clip, type PitchFile } from "../content";
import { escape } from "../rich";
import { chrome } from "./desktop";

/**
 * The team's videos, in one small player window. After boot the intro fills
 * most of the screen; once Armaan starts the walkthrough it slides into the
 * corner, and it closes when it ends. Each file then plays its own overview
 * in the corner while it is open.
 */
export function setupVideos(os: HTMLElement) {
  const html = document.documentElement;
  const v = videos;
  const wrap = document.createElement("div");
  wrap.innerHTML = chrome(
    "",
    `<div class="vp__media">
       <video playsinline preload="metadata"></video>
       <button class="vp__sound" type="button" hidden>${escape(v.sound)}</button>
     </div>
     <div class="vp__controls">
       <button type="button" data-vp="back" aria-label="${escape(v.back)}" title="${escape(v.back)}">«5</button>
       <button type="button" data-vp="toggle" class="vp__toggle" aria-label="${escape(v.pause)}">❚❚</button>
       <button type="button" data-vp="skip" aria-label="${escape(v.skip)}" title="${escape(v.skip)}">5»</button>
       <span class="vp__bar" data-vp="seek"><span></span></span>
       <span class="vp__time">0:00</span>
     </div>`,
    { cls: "vp", close: v.close, attrs: `role="region" hidden` },
  );
  const el = wrap.firstElementChild as HTMLElement;
  const video = el.querySelector("video")!;
  const title = el.querySelector<HTMLElement>(".mw__title")!;
  const bar = el.querySelector<HTMLElement>(".mw__bar")!;
  const media = el.querySelector<HTMLElement>(".vp__media")!;
  const controls = el.querySelector<HTMLElement>(".vp__controls")!;
  const toggle = el.querySelector<HTMLButtonElement>(".vp__toggle")!;
  const sound = el.querySelector<HTMLButtonElement>(".vp__sound")!;
  const fill = el.querySelector<HTMLElement>(".vp__bar span")!;
  const time = el.querySelector<HTMLElement>(".vp__time")!;
  // The player lives in its own layer over the screen, not inside it: inside
  // the screen's rounded clip the browser re-masks the edges on every video
  // frame, which made the borders shimmer and the video blink black.
  const layer = document.createElement("div");
  layer.className = "vp-layer";
  layer.append(el);
  document.body.append(layer);

  // What is loaded: the intro, a file's overview, or nothing.
  let current: "intro" | PitchFile["id"] | null = null;
  type Size = "big" | "mini" | "dock";
  let size: Size = "mini";
  let moved = false; // dragged by its title bar: stay where it was put
  let introDone = false;
  const dismissed = new Set<string>();

  const load = (clip: Clip) => {
    title.textContent = clip.title;
    el.setAttribute("aria-label", clip.title);
    if (!video.src.endsWith(clip.src)) {
      video.src = clip.src;
      video.poster = clip.poster;
    }
  };

  // Play with sound; if the browser refuses, play muted and offer sound.
  const play = () => {
    video.muted = false;
    sound.hidden = true;
    video.play().catch(() => {
      video.muted = true;
      sound.hidden = false;
      video.play().catch(() => {});
    });
  };

  // Fits the window to the screen: big and centred (intro), small in the
  // bottom corner (intro over the folder), or docked top right beside a file
  // window, which makes room for it so no text sits underneath.
  const place = (to: Size, animate: boolean) => {
    size = to;
    const still = html.classList.contains("mode-still");
    // Every part of the player in whole pixels: Chromium on Mac (Chrome, Arc)
    // re-snaps a playing video's half-pixel edges each frame, which shows up as
    // shimmering borders and a blink of black.
    const em = Math.round(parseFloat(getComputedStyle(os).fontSize));
    layer.style.fontSize = `${em}px`;
    bar.style.height = `${Math.round(em * 1.7)}px`;
    controls.style.height = `${Math.round(em * 2.3)}px`;
    el.classList.toggle("is-big", to === "big" && !still);
    // Nothing may animate under the big player (the "Start here" nudge did,
    // and every bounce made the video's edges flicker).
    os.classList.toggle("has-big-clip", to === "big" && !still);
    os.classList.toggle("has-clip", to === "dock");
    document.body.classList.toggle("has-clip", to === "dock");
    gsap.killTweensOf(el);
    if (still) {
      el.removeAttribute("style");
      media.style.height = "";
      return;
    }
    if (moved) return;
    const box = os.getBoundingClientRect();
    const W = box.width;
    const H = box.height;
    const top0 = os.querySelector<HTMLElement>(".os__bar")!.offsetHeight;
    const chromeH = bar.offsetHeight + (to === "big" ? 0 : controls.offsetHeight);
    let w: number;
    let x: number;
    let y: number;
    if (to === "big") {
      w = Math.min(W * 0.86, ((H - top0) * 0.88 - chromeH) * (16 / 9));
      x = (W - w) / 2;
      y = top0 + (H - top0 - (w * 9) / 16 - chromeH) / 2;
    } else if (to === "dock") {
      w = W * 0.29;
      x = W - w - W * 0.02;
      y = em * 3.2; // level with the file window's top edge
    } else {
      w = Math.max(220, W * 0.3);
      x = W - w - W * 0.02;
      y = H - (w * 9) / 16 - chromeH - W * 0.02;
    }
    const first = el.getBoundingClientRect();
    w = Math.round(w);
    media.style.height = `${Math.round(((w - 2) * 9) / 16)}px`; // inside the 1px borders
    gsap.set(el, {
      left: Math.round(box.left + x),
      top: Math.round(box.top + y),
      width: w,
      height: "auto",
      inset: "auto",
      margin: 0,
      x: 0,
      y: 0,
      scale: 1,
    });
    if (!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Move with a transform from where it was (no re-layout of the video
    // each frame, which is what made it flash black).
    const last = el.getBoundingClientRect();
    gsap.from(el, {
      x: first.left - last.left,
      y: first.top - last.top,
      scale: first.width / last.width,
      transformOrigin: "0 0",
      duration: 0.7,
      ease: "power3.inOut",
      clearProps: "transform",
    });
  };

  // Fade in once the first frame is ready, so it never opens on black.
  const show = (to: Size) => {
    el.hidden = false;
    place(to, false);
    gsap.set(el, { autoAlpha: 0 });
    // Drop the opacity once visible: a video under any opacity, even 1, can't
    // be drawn straight to the screen and blinks.
    const reveal = () => gsap.to(el, { autoAlpha: 1, duration: 0.25, onComplete: () => void el.style.removeProperty("opacity") });
    if (video.readyState >= 2) reveal();
    else video.addEventListener("loadeddata", reveal, { once: true });
  };

  const hide = () => {
    if (el.hidden) return;
    video.pause();
    current = null;
    os.classList.remove("has-clip", "has-big-clip");
    document.body.classList.remove("has-clip");
    gsap.to(el, {
      autoAlpha: 0,
      duration: 0.3,
      onComplete: () => {
        el.hidden = true;
        moved = false;
      },
    });
  };

  /** Call inside the power-button click, so the browser lets the intro play with sound. */
  const prime = () => {
    if (introDone || current) return;
    load(v.intro);
    video.muted = true;
    video.play().then(() => video.pause(), () => {});
  };

  /** After boot: the intro, once per visit. */
  const intro = (instant: boolean) => {
    if (introDone || current) return;
    introDone = true;
    current = "intro";
    load(v.intro);
    if (video.currentTime > 0) video.currentTime = 0;
    const still = html.classList.contains("mode-still");
    gsap.delayedCall(instant ? 0.3 : 2.1, () => {
      if (current !== "intro") return;
      show(still ? "mini" : "big");
      // On phones nobody has pressed anything yet: wait for a tap on play.
      if (!still) play();
    });
  };

  /** A file window opened: play its overview, docked beside the window. */
  const file = (id: string) => {
    if (current === id) return;
    const clip = v.files[id as PitchFile["id"]];
    if (!clip || dismissed.has(id)) {
      // Let the intro finish, docked beside a file without a video of its own.
      if (current === "intro" && !el.hidden) place("dock", true);
      else if (current !== "intro") hide();
      return;
    }
    const wasOpen = !el.hidden && current !== null;
    current = id as PitchFile["id"];
    moved = false;
    load(clip);
    if (video.currentTime > 0) video.currentTime = 0;
    if (wasOpen) place("dock", size !== "dock");
    else show("dock");
    play();
  };

  /** A file window closed. */
  const closeFile = () => {
    if (current === "intro") place("mini", true);
    else if (current) hide();
  };

  // Controls
  el.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    if (t.closest(".mw__close")) {
      if (current && current !== "intro") dismissed.add(current);
      hide();
      return;
    }
    if (t.closest(".vp__sound")) {
      video.muted = false;
      sound.hidden = true;
      return;
    }
    const act = t.closest<HTMLElement>("[data-vp]")?.dataset.vp ?? (t.closest("video") ? "toggle" : null);
    if (act === "toggle") {
      if (video.paused) play();
      else video.pause();
    } else if (act === "back") {
      video.currentTime = Math.max(0, video.currentTime - 5);
    } else if (act === "skip") {
      video.currentTime = Math.min(video.duration || 0, video.currentTime + 5);
    } else if (act === "seek") {
      const r = t.closest<HTMLElement>(".vp__bar")!.getBoundingClientRect();
      video.currentTime = ((e.clientX - r.left) / r.width) * (video.duration || 0);
    }
  });
  bar.addEventListener("pointerdown", (e) => {
    if (!(e.target as HTMLElement).closest(".mw__close")) moved = true;
  });

  const sync = () => {
    const paused = video.paused;
    toggle.textContent = paused ? "▶" : "❚❚";
    toggle.setAttribute("aria-label", paused ? v.play : v.pause);
  };
  const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  video.addEventListener("play", sync);
  video.addEventListener("pause", sync);
  video.addEventListener("timeupdate", () => {
    const d = video.duration || 1;
    fill.style.transform = `scaleX(${video.currentTime / d})`;
    time.textContent = clock(video.currentTime);
    // The walkthrough starts: get out of the way of the folder.
    if (current === "intro" && size === "big" && video.currentTime >= v.intro.shrinkAt) {
      moved = false; // even if it was dragged while big
      place("mini", true);
    }
  });
  video.addEventListener("ended", () => {
    if (current === "intro") hide();
  });

  // After the screen itself has been re-laid out for the new size.
  window.addEventListener("resize", () => {
    requestAnimationFrame(() => {
      if (!el.hidden) place(size, false);
    });
  });

  return { prime, intro, file, closeFile, stop: hide };
}
