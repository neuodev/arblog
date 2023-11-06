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
  blockquote(quote) {
    // default: `rtl`, when text is starting with `!` it should be `ltr`
    const ltr = quote.startsWith("<p>!");
    const parsed = quote.replace("<p>!", "<p>");

    return `
        <blockquote dir="${ltr ? "ltr" : "rtl"}">
          ${parsed}
        </blockquote>
    `;
  },
};
