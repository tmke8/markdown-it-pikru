import { Pikru } from "@tmke8/pikru";

/**
 * markdown-it plugin to render pikchr code blocks as SVG diagrams.
 *
 * @param {import('markdown-it')} md - markdown-it instance
 * @param {Object} [options] - Plugin options
 * @param {boolean} [options.cssVariables=false] - Use CSS variables for colors, enabling light/dark mode support.
 * @param {boolean} [options.explicitSize=false] - Add explicit width and height attributes to the SVG element.
 * @param {string} [options.className='pikchr'] - CSS class name for the wrapper div
 */
export default function markdownItPikru(md, options = {}) {
  const { cssVariables = false, explicitSize = false, className = "pikchr" } = options;

  const pikru = new Pikru({ cssVariables, explicitSize });

  const defaultFence =
    md.renderer.rules.fence ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const info = token.info.trim();

    if (info === "pikchr") {
      const svg = pikru.render(token.content);
      return `<div class="${className}">${svg}</div>\n`;
    }

    return defaultFence(tokens, idx, options, env, self);
  };
}
