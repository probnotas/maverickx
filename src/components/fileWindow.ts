import { files, footer, site, sourceList, sources, trash, type PitchFile } from "../content";
import { escape, rich } from "../rich";
import { block } from "./blocks";
import { chrome } from "./desktop";

export type WindowId = PitchFile["id"] | "sources" | "trash";

function fileBody(f: PitchFile, i: number): string {
  const next = files[i + 1];
  const nextId = next ? next.id : "sources";
  const nextName = next ? next.filename : site.sourcesFolder;
  const nextQ = next ? next.question : footer.sourcesTitle;
  return `
    <p class="win__q label">${rich(f.question)}</p>
    <h2 class="win__title">${rich(f.name)}</h2>
    <p class="win__subtitle">${rich(f.subtitle)}</p>
    <p class="win__thesis">${rich(f.thesis)}</p>
    ${f.note ? `<p class="win__note">${rich(f.note)}</p>` : ""}
    ${f.blocks.map(block).join("")}
    <aside class="win__bottom"><p class="label">${rich(site.bottomLineLabel)}</p><p>${rich(f.bottomLine)}</p></aside>
    <button class="win__next" type="button" data-open="${nextId}">
      <span class="label">${rich(site.nextPrefix)} · ${rich(nextName)}</span>
      <span class="win__next-q display">${rich(nextQ)} <span aria-hidden="true">→</span></span>
    </button>`;
}

function sourcesBody(): string {
  return `
    <h2 class="win__title">${rich(footer.sourcesTitle)}</h2>
    <ol class="win__sources">
      ${sourceList
        .map((id) => {
          const s = sources[id];
          return `<li>${"href" in s && s.href ? `<a href="${s.href}" target="_blank" rel="noopener">${escape(s.label)}</a>` : escape(s.label)}</li>`;
        })
        .join("")}
    </ol>
    <h3 class="b-h">${rich(footer.teamLabel)}</h3>
    <ul class="b-list">${footer.team.map((t) => `<li>${rich(t)}</li>`).join("")}</ul>
    <div class="win__credits">${footer.credits.map((c) => `<p>${rich(c)}</p>`).join("")}</div>
    <p class="win__wordmark display" aria-hidden="true">${rich(footer.wordmark)}</p>`;
}

function trashBody(): string {
  return `
    <h2 class="win__title">${rich(trash.heading)}</h2>
    ${block({ kind: "people", items: trash.items })}
    ${block({ kind: "callout", title: "", text: trash.why })}`;
}

/** One document window at a time, on top of the desktop. */
export function setupWindows(os: HTMLElement, onOpen: (id: WindowId) => void = () => {}) {
  const layer = os.querySelector<HTMLElement>(".os__windows")!;
  let opener: HTMLElement | null = null;

  const close = () => {
    if (!layer.firstChild) return;
    layer.replaceChildren();
    opener?.focus({ preventScroll: true });
  };

  const open = (id: WindowId, from?: HTMLElement | null) => {
    const i = files.findIndex((f) => f.id === id);
    const f = files[i];
    const title = f ? f.filename : id === "trash" ? trash.title : site.sourcesFolder;
    const body = f ? fileBody(f, i) : id === "trash" ? trashBody() : sourcesBody();
    opener = from ?? opener;
    // In still mode the window covers the viewport, so it can't live inside
    // .os (a size container is the containing block for fixed children).
    const host = document.documentElement.classList.contains("mode-still") ? document.body : os;
    if (layer.parentElement !== host) host.append(layer);
    const steps = `<nav class="win__steps" aria-label="${escape(site.stepsLabel)}">${files
      .map(
        (x) => `<button type="button" data-open="${x.id}"${x.id === id ? ' aria-current="page"' : ""}>${rich(x.filename)}</button>`,
      )
      .join("")}</nav>`;
    layer.innerHTML = chrome(title, `${steps}<div class="mw__body win__body" tabindex="-1">${body}</div>`, {
      cls: "win",
      close: site.closeLabel,
      attrs: `role="dialog" aria-modal="true" aria-label="${escape(title)}"`,
    });
    layer.querySelector<HTMLElement>(".win__body")!.scrollTop = 0;
    layer.querySelector<HTMLElement>(".mw__close")!.focus({ preventScroll: true });
    onOpen(id);
  };

  layer.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest(".mw__close")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // Icons, menu items, "Next" buttons, and in-text links to a file (data-file).
  document.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    const btn = t.closest<HTMLElement>("[data-open]");
    const link = t.closest<HTMLElement>("a[data-file]");
    if (btn) {
      open(btn.dataset.open as WindowId, btn.closest(".win") ? null : btn);
    } else if (link) {
      e.preventDefault();
      open(link.dataset.file as WindowId, null);
    }
  });

  return { open, close };
}
