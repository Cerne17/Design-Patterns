export interface ITextFormatter {
  id: number;
  format(text: string): void;
}
export interface ITextEditor {
  id: number;
  getFormatter(): ITextFormatter;
  setFormatter(formatter: ITextFormatter): void;
  format(text: string): void;
}

export class TextEditor implements ITextEditor {
  constructor(
    public readonly id: number,
    private Formatter: ITextFormatter,
  ) {}
  public getFormatter(): ITextFormatter {
    return this.Formatter;
  }
  public setFormatter(formatter: ITextFormatter): void {
    this.Formatter = formatter;
  }
  public format(text: string): void {
    this.Formatter.format(text);
  }
}

export class PlainTextFormatter implements ITextFormatter {
  constructor(
    public readonly id: number,
  ) {}
  public format(text: string): void {
    console.log(`The text - ${text} - is formatted as plain text.`);
  }
}
export class HTMLFormatter implements ITextFormatter {
  constructor(
    public readonly id: number,
  ) {}
  public format(text: string): void {
    console.log(`The text - ${text} - is formatted as HTML.`);
  }
}
export class MarkdownFormatter implements ITextFormatter {
  constructor(
    public readonly id: number,
  ) {}
  public format(text: string): void {
    console.log(`The text - ${text} - is formatted as Markdown.`);
  }
}
