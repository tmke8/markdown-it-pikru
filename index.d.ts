import type MarkdownIt from "markdown-it";

export interface MarkdownItPikruOptions {
  /**
   * Use CSS variables for colors, enabling light/dark mode support.
   * @default false
   */
  cssVariables?: boolean;

  /**
   * Add explicit width and height attributes to the SVG element.
   * @default false
   */
  explicitSize?: boolean;

  /**
   * CSS class name for the wrapper div.
   * @default "pikchr"
   */
  className?: string;
}

/**
 * markdown-it plugin to render pikchr code blocks as SVG diagrams.
 */
declare function markdownItPikru(
  md: MarkdownIt,
  options?: MarkdownItPikruOptions
): void;

export default markdownItPikru;
