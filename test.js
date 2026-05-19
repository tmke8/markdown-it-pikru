import { expect } from "chai";
import MarkdownIt from "markdown-it";
import markdownItPikru from "./index.js";

describe("markdown-it-pikru", function () {
  it("renders pikchr code blocks as SVG", function () {
    const md = new MarkdownIt();
    md.use(markdownItPikru);

    const result = md.render("```pikchr\nbox \"Hello\"\n```");

    expect(result).to.include("<div class=\"pikchr\">");
    expect(result).to.include("<svg");
    expect(result).to.include("</svg>");
    expect(result).to.include("Hello");
  });

  it("does not affect other code blocks", function () {
    const md = new MarkdownIt();
    md.use(markdownItPikru);

    const result = md.render("```javascript\nconsole.log('test');\n```");

    expect(result).to.include("<pre>");
    expect(result).to.include("<code");
    expect(result).to.include("console.log");
    expect(result).to.not.include("<svg");
  });

  it("applies custom className option", function () {
    const md = new MarkdownIt();
    md.use(markdownItPikru, { className: "diagram" });

    const result = md.render("```pikchr\nbox\n```");

    expect(result).to.include("<div class=\"diagram\">");
  });

  it("includes CSS variables when enabled", function () {
    const md = new MarkdownIt();
    md.use(markdownItPikru, { cssVariables: true });

    const result = md.render("```pikchr\nbox\n```");

    expect(result).to.include("--pik-black");
    expect(result).to.include("light-dark");
  });

  it("excludes CSS variables when disabled", function () {
    const md = new MarkdownIt();
    md.use(markdownItPikru, { cssVariables: false });

    const result = md.render("```pikchr\nbox\n```");

    expect(result).to.not.include("--pik-black");
  });

  it("doesn't set width and height when not requested", function () {
    const md = new MarkdownIt();
    md.use(markdownItPikru, { explicitSize: false });

    const result = md.render("```pikchr\nbox\n```");

    expect(result).to.not.include("width=\"");
  });

  it("sets width and height when requested", function () {
    const md = new MarkdownIt();
    md.use(markdownItPikru, { explicitSize: true });

    const result = md.render("```pikchr\nbox\n```");

    expect(result).to.include("width=\"");
  });
});
