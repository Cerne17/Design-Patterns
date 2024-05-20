import {
  HTMLFormatter,
  ITextEditor,
  ITextFormatter,
  MarkdownFormatter,
  PlainTextFormatter,
  TextEditor,
} from "./textFormatting";

describe("Testing text formatting", () => {
  let plainTextFormatter: ITextFormatter;
  let htmlFormatter: ITextFormatter;
  let markdownFormatter: ITextFormatter;
  let textEditor: TextEditor;

  beforeEach(() => {
    plainTextFormatter = new PlainTextFormatter(1);
    htmlFormatter = new HTMLFormatter(2);
    markdownFormatter = new MarkdownFormatter(3);
    textEditor = new TextEditor(1, plainTextFormatter);
  });

  test("Testing the Getters and Setters", () => {
    expect(textEditor.getFormatter()).toBe(plainTextFormatter);

    textEditor.setFormatter(htmlFormatter);
    expect(textEditor.getFormatter()).toBe(htmlFormatter);
  });

  test("Testing the Plain Text Formatter", () => {
    const consoleSpy = jest.spyOn(console, "log");
    textEditor.setFormatter(plainTextFormatter);
    textEditor.format("Testing formatter.");
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("plain text"),
    );
    consoleSpy.mockRestore();
  });

  test("Testing the HTML Formatter", () => {
    const consoleSpy = jest.spyOn(console, "log");
    textEditor.setFormatter(htmlFormatter);
    textEditor.format("Testing formatter.");
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("HTML"),
    );
    consoleSpy.mockRestore();
  });

  test("Testing the Markdown Formatter", () => {
    const consoleSpy = jest.spyOn(console, "log");
    textEditor.setFormatter(markdownFormatter);
    textEditor.format("Testing formatter.");
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Markdown"),
    );
    consoleSpy.mockRestore();
  });
});
