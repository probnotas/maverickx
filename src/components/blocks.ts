import { files, footer, site, type Block, type ExpertQuote, type Table } from "../content";
import { rich } from "../rich";

export const mailto = () =>
  `mailto:${footer.email}?subject=${encodeURIComponent(footer.emailSubject)}`;

const table = (t: Table) => `
  <figure class="b-table">
    ${t.caption ? `<figcaption class="label">${rich(t.caption)}</figcaption>` : ""}
    <div class="b-table__scroll" tabindex="0">
      <table>
        <thead><tr>${t.head.map((h) => `<th scope="col">${rich(h)}</th>`).join("")}</tr></thead>
        <tbody>${t.rows
          .map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${rich(c)}</th>` : `<td>${rich(c)}</td>`)).join("")}</tr>`)
          .join("")}</tbody>
      </table>
    </div>
    ${t.note ? `<p class="b-note">${rich(t.note)}</p>` : ""}
  </figure>`;

// Names render only once a person has agreed to be named.
const quote = (q: ExpertQuote) => `
  <figure class="b-quote">
    <blockquote>${q.kind === "quote" ? `“${rich(q.quote)}”` : rich(q.quote)}${q.context ? ` <span class="b-quote__context">${rich(q.context)}</span>` : ""}</blockquote>
    <figcaption>
      ${q.permission === "named" ? `<strong class="b-quote__name">${rich(q.name)}</strong>` : ""}
      <span class="b-quote__role">${rich(q.role)}</span>
      <span class="b-quote__org">${rich(q.org)}</span>
      ${q.kind === "paraphrase" ? `<em class="b-tag">${site.paraphraseTag}</em>` : ""}
    </figcaption>
    <p class="b-quote__why">${rich(q.validates)}</p>
  </figure>`;

export function block(b: Block): string {
  switch (b.kind) {
    case "lede":
      return `<p class="b-lede">${rich(b.text)}</p>`;
    case "p":
      return `<p class="b-p">${rich(b.text)}</p>`;
    case "h":
      return `<h3 class="b-h">${rich(b.text)}</h3>`;
    case "stats":
      return `<div class="b-stats">${b.items
        .map((s) => `<div class="b-stat"><p class="b-stat__value display">${rich(s.value)}</p><p class="b-stat__label">${rich(s.label)}</p></div>`)
        .join("")}</div>`;
    case "list": {
      const tag = b.ordered ? "ol" : "ul";
      return `<${tag} class="b-list">${b.items.map((i) => `<li>${rich(i)}</li>`).join("")}</${tag}>`;
    }
    case "table":
      return table(b.table);
    case "flow":
      return `<figure class="b-flow"><ol>${b.steps
        .map((s) => `<li class="${s.ours ? "is-ours" : ""}"><span class="label">${rich(s.who)}</span><span>${rich(s.what)}</span></li>`)
        .join("")}</ol>${b.note ? `<figcaption class="b-note">${rich(b.note)}</figcaption>` : ""}</figure>`;
    case "steps": {
      const total = b.steps.length;
      const count = (n: number) => b.counter.replace("{n}", String(n)).replace("{total}", String(total));
      return `<figure class="b-steps" data-steps tabindex="0">
        <div class="b-steps__track">${b.steps
          .map(
            (st, i) => `<div class="b-steps__slide${st.ours ? " is-ours" : ""}" data-slide="${i}"${i ? " hidden" : ""}>
              <div class="b-steps__media">${
                st.video
                  ? `<video src="${st.video}" poster="${st.poster ?? ""}" muted loop playsinline preload="${i ? "none" : "auto"}" aria-hidden="true"></video>`
                  : st.stat
                    ? `<div class="b-steps__stat"><p class="display">${rich(st.stat.value)}</p><p>${rich(st.stat.label)}</p></div>`
                    : ""
              }</div>
              <div class="b-steps__caption">
                <p class="label">${rich(count(i + 1))}</p>
                <h4 class="b-steps__title display">${rich(st.label)}</h4>
                <p>${rich(st.text)}</p>
              </div>
            </div>`,
          )
          .join("")}</div>
        <div class="b-steps__controls">
          <button class="b-steps__arrow" type="button" data-steps-go="-1" aria-label="${rich(b.prev)}" disabled>←</button>
          <div class="b-steps__dots">${b.steps
            .map((st, i) => `<button type="button" data-steps-to="${i}" aria-label="${rich(count(i + 1))}: ${rich(st.label)}"${i ? "" : ' aria-current="step"'}></button>`)
            .join("")}</div>
          <button class="b-steps__arrow" type="button" data-steps-go="1" aria-label="${rich(b.next)}">→</button>
        </div>
        ${b.note ? `<figcaption class="b-note">${rich(b.note)}</figcaption>` : ""}
      </figure>`;
    }
    case "cards":
      return `<div class="b-cards">${b.items
        .map(
          (c) => `<article class="b-card">
            ${c.img ? `<img class="b-card__cutout" src="${c.img}" alt="" loading="lazy">` : ""}
            <h4 class="b-card__title display">${rich(c.title)}</h4>
            <p>${rich(c.text)}</p>
            <div class="b-chips">${c.chips.map((ch) => `<span class="chip">${rich(ch)}</span>`).join("")}</div>
          </article>`,
        )
        .join("")}</div>`;
    case "gates":
      return `<figure class="b-gates"><ol>${b.phases
        .map(
          (p) => `<li>
            <p class="label">${rich(p.weeks)}</p>
            <h4 class="display">${rich(p.name)}</h4>
            <ul>${p.steps.map((s) => `<li>${rich(s)}</li>`).join("")}</ul>
            <div class="b-gate"><strong>${rich(p.gate)}</strong><span>${rich(p.pass)}</span></div>
          </li>`,
        )
        .join("")}</ol><figcaption class="b-note">${rich(b.note)}</figcaption></figure>`;
    case "quotes":
      return `<div class="b-quotes">${b.items.map(quote).join("")}</div>${
        b.items.some((q) => q.permission === "role-only") ? `<p class="b-note">${rich(b.note)}</p>` : ""
      }`;
    case "feature":
      return `<figure class="b-feature">
        <p class="label">${rich(b.label)}</p>
        <blockquote>“${rich(b.quote)}”</blockquote>
        <figcaption>${rich(b.who)}</figcaption>
        <p>${rich(b.text)}</p>
      </figure>`;
    case "summary":
      return `<div class="b-summary">${b.items
        .map((it) => {
          const f = files.find((x) => x.id === it.file)!;
          return `<section class="b-sum">
            <button class="b-sum__head" type="button" data-open="${f.id}"><span class="label">${rich(f.filename)}</span><span aria-hidden="true">→</span></button>
            <h3 class="b-sum__title display">${rich(f.name)}</h3>
            <p class="b-sum__thesis">${rich(it.thesis)}</p>
            <div class="b-sum__stats">${it.stats
              .map((st) => `<div><p class="b-sum__value display">${rich(st.value)}</p><p class="b-sum__label">${rich(st.label)}</p></div>`)
              .join("")}</div>
          </section>`;
        })
        .join("")}</div>`;
    case "callout":
      return `<aside class="b-callout"><p class="label">${rich(b.title)}</p><p>${rich(b.text)}</p></aside>`;
    case "people":
      return `<dl class="b-people">${b.items.map((p) => `<div><dt>${rich(p.who)}</dt><dd>${rich(p.does)}</dd></div>`).join("")}</dl>`;
    case "button":
      return `<p class="b-cta"><a class="btn" href="${mailto()}">${rich(b.text)}</a><span class="b-cta__email">${rich(footer.email)}</span></p>`;
  }
}
