export class HttpError extends Error {
  status_code: number;
  constructor(status_code: number, message: string) {
    super(message);
    this.status_code = status_code;
  }
}
