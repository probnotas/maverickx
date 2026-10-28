/* Classic 1-bit style desktop icons, drawn as SVG with crisp black outlines. */

export const atomIcon = `
  <svg class="atom" viewBox="0 0 40 40" aria-hidden="true">
    <ellipse cx="20" cy="20" rx="17" ry="6.5" />
    <ellipse cx="20" cy="20" rx="17" ry="6.5" transform="rotate(60 20 20)" />
    <ellipse cx="20" cy="20" rx="17" ry="6.5" transform="rotate(-60 20 20)" />
    <circle class="atom__core" cx="20" cy="20" r="3.6" />
  </svg>`;

export const docIcon = (label: string) => `
  <svg class="ico" viewBox="0 0 32 40" aria-hidden="true">
    <path class="ico__fill" d="M1.5 1.5h20l9 9v28h-29z"/>
    <path class="ico__line" d="M1.5 1.5h20l9 9v28h-29z M21.5 1.5v9h9"/>
    <path class="ico__rule" d="M6 17h20M6 21h20M6 25h20M6 29h14"/>
    <text x="16" y="13" text-anchor="middle">${label}</text>
  </svg>`;

export const folderIcon = `
  <svg class="ico ico--folder" viewBox="0 0 40 32" aria-hidden="true">
    <path class="ico__fill" d="M1.5 5.5h13l3 3h21v22h-37z"/>
    <path class="ico__line" d="M1.5 5.5h13l3 3h21v22h-37z M1.5 11.5h37"/>
  </svg>`;

export const diskIcon = `
  <svg class="ico ico--disk" viewBox="0 0 40 18" aria-hidden="true">
    <path class="ico__fill" d="M1.5 3.5h37v11h-37z"/>
    <path class="ico__line" d="M1.5 3.5h37v11h-37z"/>
    <path class="ico__dot" d="M5 10h3"/>
  </svg>`;

export const trashIcon = `
  <svg class="ico ico--trash" viewBox="0 0 32 40" aria-hidden="true">
    <path class="ico__fill" d="M5.5 9.5h21l-2 28h-17z"/>
    <path class="ico__line" d="M5.5 9.5h21l-2 28h-17z M3.5 6.5h25v3h-25z M12.5 3.5h7v3h-7z M11 14v20M16 14v20M21 14v20"/>
  </svg>`;
