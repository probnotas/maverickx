import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/sections.css";
import { media, site } from "./content";
import { escape } from "./rich";
import { renderDesk, setupDesk } from "./components/desk";
import { renderDesktop, setupDesktop } from "./components/desktop";
import { setupWindows, type WindowId } from "./components/fileWindow";

document.documentElement.classList.add("js");
history.scrollRestoration = "manual";

const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <a class="skip-link" href="#files">${escape(site.skipLink)}</a>
  <a class="logo" href="#desk" aria-label="${escape(site.logoLabel)}">
    <img src="${media.brand.logoOnDark}" alt="${escape(media.brand.alt)}"><span>${escape(site.logo)}</span>
  </a>
  <main>${renderDesk()}${renderDesktop()}</main>`;

// Deep links: #file-economics boots straight to the desktop and opens that file.
let pending = location.hash.match(/^#file-(\w+)$/)?.[1] as WindowId | undefined;

const os = app.querySelector<HTMLElement>(".os")!;
const desktop = setupDesktop(os, () => deskCtl.powerOff());
const windows = setupWindows(os, (id) => desktop.markRead(id));
const deskCtl = setupDesk(app, os, {
  onReached: (instant) => {
    desktop.start(instant);
    if (pending) {
      windows.open(pending);
      pending = undefined;
    }
  },
  onShutdown: () => {
    windows.close();
    desktop.stop();
  },
});

app.querySelector(".skip-link")!.addEventListener("click", (e) => {
  e.preventDefault();
  deskCtl.powerOn(true);
});

if (pending) deskCtl.powerOn(true);
