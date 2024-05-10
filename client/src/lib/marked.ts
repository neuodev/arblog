import { Renderer } from "marked";
import marked from "marked";

export const renderer: Partial<Renderer> = {
  image(href, _title, text) {
    if (!text) return `<img src="${href}" title="Image" alt="Image...">`;

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

marked.use({ renderer });

export default marked;
