# markdown-it-pikru

A [markdown-it](https://github.com/markdown-it/markdown-it) plugin to render [Pikchr](https://pikchr.org/) code blocks as SVG diagrams.

Uses [@tmke8/pikru](https://www.npmjs.com/package/@tmke8/pikru) for Pikchr to SVG conversion.

## Installation

```bash
npm install @tmke8/markdown-it-pikru markdown-it
```

## Usage

```javascript
import MarkdownIt from "markdown-it";
import markdownItPikru from "@tmke8/markdown-it-pikru";

const md = new MarkdownIt();
md.use(markdownItPikru);

const html = md.render(`
\`\`\`pikchr
arrow right 200% "Markdown" "Source"
box rad 10px "Markdown" "Formatter" fit
arrow right 200% "HTML+SVG" "Output"
\`\`\`
`);
```

This renders the Pikchr diagram as an inline SVG wrapped in a `<div class="pikchr">`.

## Options

```javascript
md.use(markdownItPikru, {
  cssVariables: true,
  className: "diagram"
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `cssVariables` | `boolean` | `false` | Use CSS variables for colors, enabling light/dark mode support |
| `className` | `string` | `"pikchr"` | CSS class name for the wrapper `<div>` |

### Dark mode support

When `cssVariables: true` is enabled, the generated SVG uses CSS custom properties for colors. These automatically adapt to light/dark mode using the CSS `light-dark()` function.

## Example

Input:

````markdown
# Architecture

```pikchr
box "Client" fit
arrow right 150%
box "Server" fit
arrow right 150%
cylinder "Database" fit
```
````

Output:

```html
<h1>Architecture</h1>
<div class="pikchr">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="...">
    <!-- SVG content -->
  </svg>
</div>
```

## License

MIT
