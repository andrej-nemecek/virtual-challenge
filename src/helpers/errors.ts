export class ErrorHandler extends Error {
  public statusCode: number;
  public statusMessage: string;

  constructor(statusCode: number, statusMessage: string) {
    super();
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
  }
}

export class ValidationError extends Error {
  public statusCode: number;
  public statusMessages: string[];

  constructor(statusCode: number, statusMessages: string[]) {
    super();
    this.statusCode = statusCode;
    this.statusMessages = statusMessages;
  }
}
