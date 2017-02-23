// Import the core angular services.
import { ErrorHandler, Inject, Injectable } from "@angular/core";
import { HttpModule } from '@angular/http';

// Import the application components and services.
import { CompanySettingsService } from '../company-settings/company-settings.service'
import { LoggerService } from '../logger/logger.service'
import { ErrorHandlerReporterService } from "./error-handler-reporter.service";


@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  private _serviceTag: string = "ErrorHandlerService";
  private _rethrowError: boolean = false;
  private _unwrapError: boolean = false;
  private _reportError: boolean = true;
  // I initialize the service.

  constructor(
    private _errorHandlerReporterService: ErrorHandlerReporterService,
    private _loggerService: LoggerService,
    private _companySettingsService: CompanySettingsService
  ) {
    _loggerService.info(this._serviceTag, 'has initialised');
    this._rethrowError = _companySettingsService.companySettings.errorHandling.rethrowError
    this._unwrapError = _companySettingsService.companySettings.errorHandling.unwrapError
    this._reportError = _companySettingsService.companySettings.errorHandling.reportError
  }

  // I handle the given error.
  public handleError(error: any): void {

    // Log to the console.
    try {
      this._loggerService.error(this._serviceTag, error.message, error.stack)
    }
    catch (handlingError) {
      console.group("ErrorHandler");
      console.warn("Error when trying to output error.");
      console.error(handlingError);
      console.groupEnd();
    }

    // Send to the error-logging service.
    if (this._reportError) {
      try {
        this._unwrapError
          ? this._errorHandlerReporterService.reportError(this.findOriginalError(error))
          : this._errorHandlerReporterService.reportError(error);
      }
      catch (loggingError) {
        console.group("ErrorHandler");
        console.warn("Error when trying to log error to", this._errorHandlerReporterService);
        console.error(loggingError);
        console.groupEnd();
      }
    }

    // I throw the error if told to do so
    if (this._rethrowError) {
      throw (error);
    }

  }

  // I attempt to find the underlying error in the given Wrapped error.
  private findOriginalError(error: any): any {
    while (error && error.originalError) {
      error = error.originalError;
    }
    return (error);
  }

}