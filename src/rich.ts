import { sources, type Source } from "./content";

export const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Turns "[[13,000 kg|titanTeck]]" into a link to that source. Internal
 * sources ("#file-<id>") become links that open that file's window.
 */
export function rich(text: string): string {
  return escape(text).replace(/\[\[(.+?)\|(\w+)\]\]/g, (_, label: string, id: string) => {
    const src: Source | undefined = (sources as Record<string, Source>)[id];
    if (!src) throw new Error(`content.ts: unknown source "${id}"`);
    const title = escape(src.label);
    if (!src.href) return `<span class="src src--private" title="${title}">${label}</span>`;
    if (src.href.startsWith("#file-")) {
      return `<a class="src" href="${src.href}" data-file="${src.href.slice(6)}" title="${title}">${label}</a>`;
    }
    return `<a class="src" href="${src.href}" target="_blank" rel="noopener" title="${title}">${label}</a>`;
  });
}
