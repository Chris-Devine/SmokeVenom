export class ErrorHandlingSettings {
  rethrowError: boolean;
  unwrapError: boolean;
  reportError: boolean;

  constructor() {
    this.rethrowError = false;
    this.unwrapError = false;
    this.reportError = false;
  }
}