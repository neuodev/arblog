import { Renderer } from "marked";

export const markedRenderer: Partial<Renderer> = {
  image(href, _title, text) {
    if (!text) return `<img src="${href}">`;

    return `
        <div class="img-container">
            <img src="${href}" title="${text}" alt="${text}" />
            <p class="img-caption">${text}</p>
        </div>
    `;
  },
};
