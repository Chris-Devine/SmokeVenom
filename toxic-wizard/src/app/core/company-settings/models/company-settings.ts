import { ErrorHandlingSettings } from './error-handling-settings'

export class CompanySettings {
  errorHandling: ErrorHandlingSettings

  constructor() {
    this.errorHandling = new ErrorHandlingSettings();
  }
}