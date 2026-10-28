import { gsap } from "gsap";
import { boot, desktop, files, media, site, type PitchFile } from "../content";
import { escape, rich } from "../rich";
import { mailto } from "./blocks";
import { docIcon, folderIcon, trashIcon } from "./icons";

/** Classic window chrome: striped title bar, optional close box. */
export function chrome(title: string, body: string, opts: { cls?: string; close?: string; attrs?: string } = {}) {
  return `
    <div class="mw ${opts.cls ?? ""}" ${opts.attrs ?? ""}>
      <header class="mw__bar">
        ${opts.close ? `<button class="mw__close" type="button" aria-label="${escape(opts.close)}"></button>` : ""}
        <span class="mw__title">${rich(title)}</span>
      </header>
      ${body}
    </div>`;
}

const d = desktop;
const f = d.folder;

// The one window: six files in reading order, joined by arrows.
const folder = chrome(
  f.title,
  `<div class="mw__body fd">
     <p class="fd__guide">${rich(f.guide)}</p>
     <ol class="fd__steps">
       ${files
         .map(
           (file, i) => `<li class="fd__step" data-step="${file.id}">
             <span class="fd__tag" aria-hidden="true"></span>
             <button class="icon" type="button" data-open="${file.id}">
               <span class="fd__glyph">${docIcon(String(i + 1).padStart(2, "0"))}<span class="fd__check" aria-hidden="true">✓</span></span>
               <span class="icon__name">${rich(file.name)}</span>
               <span class="fd__q">${rich(file.question)}</span>
             </button>
           </li>`,
         )
         .join("")}
     </ol>
     <footer class="fd__foot">
       <span class="fd__progress" aria-live="polite"></span>
       <button class="icon icon--inline" type="button" data-open="sources">${folderIcon}<span class="icon__name">${rich(site.sourcesFolder)}</span></button>
     </footer>
   </div>`,
  { cls: "os__win os__win--folder", attrs: `data-win="folder"` },
);

export function renderDesktop(): string {
  return `
  <section class="os" id="files" aria-label="${escape(site.openHint)}">
    <header class="os__bar">
      <img class="os__logo" src="${media.brand.mark}" alt="" aria-hidden="true">
      <strong class="os__brand">${rich(d.menu.brand)}</strong>
      <button type="button" data-open="sources">${rich(d.menu.sources)}</button>
      <button type="button" class="os__shutdown">${rich(d.menu.shutdown)}</button>
      <span class="os__spacer"></span>
      <a class="os__run" href="${mailto()}">${rich(d.menu.runTest)}</a>
      <time class="os__clock" aria-hidden="true"></time>
    </header>
    <div class="os__desk">
      ${folder}
      <button class="icon icon--drive os__trash" type="button" data-open="trash">${trashIcon}<span class="icon__name">${rich(d.trash)}</span></button>
    </div>
    <div class="os__boot" aria-hidden="true">
      <div class="os__boot-box">
        <img class="boot-logo" src="${media.brand.logo}" alt="">
        <p class="os__boot-title">${rich(boot.title)}</p>
        <p class="os__boot-sub">${rich(boot.sub)}</p>
        <span class="os__boot-bar"><span></span></span>
      </div>
      <div class="os__boot-icons">${boot.icons.map((src) => `<img src="${src}" alt="">`).join("")}</div>
    </div>
    <div class="os__windows"></div>
  </section>`;
}

/** Boot sequence, clock, reading-order guide and window dragging. */
export function setupDesktop(os: HTMLElement, onShutdown: () => void) {
  const html = document.documentElement;
  let z = 10;

  // Clock in the menu bar
  const clock = os.querySelector<HTMLElement>(".os__clock")!;
  const tick = () => (clock.textContent = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
  tick();
  setInterval(tick, 15_000);

  // Reading-order guide: tick off opened files, highlight the next one.
  const read = new Set<PitchFile["id"]>();
  const steps = [...os.querySelectorAll<HTMLElement>(".fd__step")];
  const progress = os.querySelector<HTMLElement>(".fd__progress")!;
  const refresh = () => {
    const next = files.find((file) => !read.has(file.id));
    steps.forEach((li) => {
      const id = li.dataset.step as PitchFile["id"];
      const isNext = id === next?.id;
      li.classList.toggle("is-read", read.has(id));
      li.classList.toggle("is-next", isNext);
      li.querySelector(".fd__tag")!.textContent = isNext ? (read.size ? f.nextUp : f.startHere) : read.has(id) ? f.read : "";
    });
    progress.textContent = f.progress.replace("{n}", String(read.size));
  };
  refresh();
  const markRead = (id: string) => {
    if (files.some((file) => file.id === id)) {
      read.add(id as PitchFile["id"]);
      refresh();
    }
  };

  // Bring a window to the front when touched
  os.addEventListener("pointerdown", (e) => {
    const w = (e.target as HTMLElement).closest<HTMLElement>(".mw");
    if (w) w.style.zIndex = String(++z);
  });

  // Drag windows by their title bar (zoom mode only). One drag at a time; it
  // ends on release, cancel, lost capture, or as soon as no button is held,
  // so a window can never keep following the cursor.
  let drag: { w: HTMLElement; id: number; dx: number; dy: number; box: DOMRect; width: number } | null = null;

  const endDrag = () => {
    if (!drag) return;
    drag.w.classList.remove("is-dragging");
    drag = null;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", endDrag);
    window.removeEventListener("pointercancel", endDrag);
    window.removeEventListener("blur", endDrag);
  };

  const onMove = (ev: PointerEvent) => {
    if (!drag || ev.pointerId !== drag.id) return;
    if (ev.buttons === 0) return endDrag();
    const { w, dx, dy, box, width } = drag;
    const x = Math.min(Math.max(ev.clientX - box.left - dx, -width + 80), box.width - 80);
    const y = Math.min(Math.max(ev.clientY - box.top - dy, 0), box.height - 30);
    w.style.left = `${x}px`;
    w.style.top = `${y}px`;
  };

  os.addEventListener("pointerdown", (e) => {
    const t = e.target as HTMLElement;
    const bar = t.closest<HTMLElement>(".mw__bar");
    if (!bar || t.closest(".mw__close") || e.button !== 0 || !html.classList.contains("mode-zoom")) return;
    e.preventDefault(); // no text selection while dragging
    endDrag();
    const w = bar.parentElement as HTMLElement;
    gsap.killTweensOf(w);
    // Measure from the element the window is positioned in (the desktop area
    // below the menu bar, or the windows layer), so grabbing never jumps.
    const box = ((w.offsetParent as HTMLElement | null) ?? os).getBoundingClientRect();
    const r = w.getBoundingClientRect();
    // Pin the window where it is, in plain left/top pixels, with no transform
    // or auto margins left over from its starting layout.
    Object.assign(w.style, {
      inset: "auto",
      margin: "0",
      left: `${r.left - box.left}px`,
      top: `${r.top - box.top}px`,
      width: `${r.width}px`,
      height: `${r.height}px`,
      transform: "none",
    });
    drag = { w, id: e.pointerId, dx: e.clientX - r.left, dy: e.clientY - r.top, box, width: r.width };
    w.classList.add("is-dragging");
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    window.addEventListener("blur", endDrag);
  });

  os.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest(".os__shutdown")) onShutdown();
  });

  let tl: gsap.core.Timeline | undefined;

  const start = (instant: boolean) => {
    tl?.kill();
    os.classList.add("is-live");
    const wins = os.querySelectorAll(".os__win, .os__trash");
    if (instant) {
      gsap.set(os, { autoAlpha: 1 });
      gsap.set(".os__boot", { autoAlpha: 0 });
      gsap.set(wins, { autoAlpha: 1, y: 0 });
      return;
    }
    tl = gsap
      .timeline()
      .set(os, { autoAlpha: 1 })
      .set(".os__boot", { autoAlpha: 1 })
      .set(wins, { autoAlpha: 0, y: 8 })
      .fromTo(".os__boot-bar span", { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: "steps(12)" }, 0.1)
      .fromTo(".os__boot-icons img", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, stagger: 0.35 }, 0.25)
      .to(".os__boot", { autoAlpha: 0, duration: 0.25 }, 1.55)
      .to(wins, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.08, ease: "power2.out" }, 1.7);
  };

  const stop = () => {
    tl?.kill();
    os.classList.remove("is-live");
    gsap.to(os, { autoAlpha: 0, duration: 0.25 });
  };

  return { start, stop, markRead };
}
