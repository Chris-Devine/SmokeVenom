/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { LoggerService } from '../logger/logger.service'
import { CompanySettingsService } from '../company-settings/company-settings.service'
import { CompanySettings } from '../company-settings/models/company-settings'
import { ErrorHandlingSettings } from '../company-settings/models/error-handling-settings'
import { ErrorHandlerReporterService } from "./error-handler-reporter.service";
import { ErrorHandlerService } from './error-handler.service';
import { environment } from '../../../environments/environment'

describe('ErrorHandlerService', () => {

  let testIncomeingError: any = {
    stack: 'I am test incomeing error stack',
    message: 'I am test incomeing error message',
    originalError: 'I am test incomeing error originalError'
  };


  describe("testing logger service is called,", function () {
    beforeEach(() => {
      // Mock company settings class with overrides 
      class MockCompanySettingsService extends CompanySettingsService {
        getCompanySettings(): CompanySettings {
          let errorHandlingSettings: ErrorHandlingSettings = new ErrorHandlingSettings();
          errorHandlingSettings.reportError = false;
          errorHandlingSettings.rethrowError = false;
          errorHandlingSettings.unwrapError = true;

          let companySettings: CompanySettings = new CompanySettings();
          companySettings.errorHandling = errorHandlingSettings;
          return companySettings;
        }
      }
      // Build a service for test
      TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [
          LoggerService,
          { provide: CompanySettingsService, useClass: MockCompanySettingsService },
          ErrorHandlerReporterService,
          ErrorHandlerService,
        ]
      });
      spyOn(LoggerService.prototype, 'info');
    });

    it('should exist', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
      expect(service).toBeTruthy();
    }));

    it('should make a call to the logger service with the error and message', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
      // Arrange 
      spyOn(LoggerService.prototype, 'error');

      // Act
      service.handleError(testIncomeingError)
      spyOn(ErrorHandlerReporterService.prototype, 'reportError');

      // Assert
      expect(LoggerService.prototype.error).toHaveBeenCalled();
    }));

    it('should make a call to the logger service, which will throw an error, which will be caught and a manual console log will be called', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
      // Arrange 
      spyOn(LoggerService.prototype, 'error').and.throwError("test LoggerService error");
      spyOn(console, 'group');
      spyOn(console, 'warn');
      spyOn(console, 'error');
      spyOn(console, 'groupEnd');

      spyOn(ErrorHandlerReporterService.prototype, 'reportError');

      // Act
      service.handleError(testIncomeingError)

      // Assert
      expect(LoggerService.prototype.error).toHaveBeenCalled();
      expect(console.group).toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith("Error when trying to output error.");
      expect(console.error).toHaveBeenCalled();
      expect(console.groupEnd).toHaveBeenCalled();
    }));

  });

  describe("testing error handle reporter service use,", function () {
    describe("when reportError is false,", function () {
      beforeEach(() => {
        // Mock company settings class with overrides 
        class MockCompanySettingsService extends CompanySettingsService {
          getCompanySettings(): CompanySettings {
            let errorHandlingSettings: ErrorHandlingSettings = new ErrorHandlingSettings();
            errorHandlingSettings.reportError = false;
            errorHandlingSettings.rethrowError = false;
            errorHandlingSettings.unwrapError = false;

            let companySettings: CompanySettings = new CompanySettings();
            companySettings.errorHandling = errorHandlingSettings;
            return companySettings;
          }
        }
        // Build a service for test
        TestBed.configureTestingModule({
          imports: [HttpModule],
          providers: [
            LoggerService,
            { provide: CompanySettingsService, useClass: MockCompanySettingsService },
            ErrorHandlerReporterService,
            ErrorHandlerService,
          ]
        });
        spyOn(LoggerService.prototype, 'info');
      });

      it('should exist', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        expect(service).toBeTruthy();
      }));

      it('should not be called', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        // Arrange 
        spyOn(LoggerService.prototype, 'error');
        spyOn(ErrorHandlerReporterService.prototype, 'reportError');

        // Act
        service.handleError(testIncomeingError)

        // Assert
        expect(ErrorHandlerReporterService.prototype.reportError).toHaveBeenCalledTimes(0);
      }));

    });

    describe("when reportError is true and unwrapError false,", function () {
      beforeEach(() => {
        // Mock company settings class with overrides 
        class MockCompanySettingsService extends CompanySettingsService {
          getCompanySettings(): CompanySettings {
            let errorHandlingSettings: ErrorHandlingSettings = new ErrorHandlingSettings();
            errorHandlingSettings.reportError = true;
            errorHandlingSettings.rethrowError = false;
            errorHandlingSettings.unwrapError = false;

            let companySettings: CompanySettings = new CompanySettings();
            companySettings.errorHandling = errorHandlingSettings;
            return companySettings;
          }
        }
        // Build a service for test
        TestBed.configureTestingModule({
          imports: [HttpModule],
          providers: [
            LoggerService,
            { provide: CompanySettingsService, useClass: MockCompanySettingsService },
            ErrorHandlerReporterService,
            ErrorHandlerService,
          ]
        });
        spyOn(LoggerService.prototype, 'info');
      });

      it('should exist', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        expect(service).toBeTruthy();
      }));

      it('should make a call to the ErrorHandlerReporterService with the error', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        // Arrange 
        spyOn(LoggerService.prototype, 'error');
        spyOn(ErrorHandlerReporterService.prototype, 'reportError');

        // Act
        service.handleError(testIncomeingError)

        // Assert
        expect(ErrorHandlerReporterService.prototype.reportError).toHaveBeenCalledWith(testIncomeingError);
      }));

      it('should make a call to the ErrorHandlerReporterService, which will throw an error, which will be caught and a manual console log will be called', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        // Arrange 
        spyOn(LoggerService.prototype, 'error');
        spyOn(ErrorHandlerReporterService.prototype, 'reportError').and.throwError("test ErrorHandlerReporterService");
        spyOn(console, 'group');
        spyOn(console, 'warn');
        spyOn(console, 'error');
        spyOn(console, 'groupEnd');

        // Act
        service.handleError(testIncomeingError)

        // Assert
        expect(ErrorHandlerReporterService.prototype.reportError).toHaveBeenCalledWith(testIncomeingError);
        expect(console.group).toHaveBeenCalled();
        expect(console.warn).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
        expect(console.groupEnd).toHaveBeenCalled();
      }));

    });

    describe("when reportError is true and unwrapError true,", function () {
      beforeEach(() => {
        // Mock company settings class with overrides 
        class MockCompanySettingsService extends CompanySettingsService {
          getCompanySettings(): CompanySettings {
            let errorHandlingSettings: ErrorHandlingSettings = new ErrorHandlingSettings();
            errorHandlingSettings.reportError = true;
            errorHandlingSettings.rethrowError = false;
            errorHandlingSettings.unwrapError = true;

            let companySettings: CompanySettings = new CompanySettings();
            companySettings.errorHandling = errorHandlingSettings;
            return companySettings;
          }
        }
        // Build a service for test
        TestBed.configureTestingModule({
          imports: [HttpModule],
          providers: [
            LoggerService,
            { provide: CompanySettingsService, useClass: MockCompanySettingsService },
            ErrorHandlerReporterService,
            ErrorHandlerService,
          ]
        });
        spyOn(LoggerService.prototype, 'info');
      });

      it('should exist', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        expect(service).toBeTruthy();
      }));

      it('should make a call to the ErrorHandlerReporterService with the unwrapped orginal error', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        // Arrange 
        spyOn(LoggerService.prototype, 'error');
        spyOn(ErrorHandlerReporterService.prototype, 'reportError');

        // Act
        service.handleError(testIncomeingError)

        // Assert
        expect(ErrorHandlerReporterService.prototype.reportError).toHaveBeenCalledWith(testIncomeingError.originalError);
      }));

      it('should make a call to the ErrorHandlerReporterService , which will throw an error, which will be caught and a manual console log will be called', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        // Arrange 
        spyOn(LoggerService.prototype, 'error');
        spyOn(ErrorHandlerReporterService.prototype, 'reportError').and.throwError("test ErrorHandlerReporterService");
        spyOn(console, 'group');
        spyOn(console, 'warn');
        spyOn(console, 'error');
        spyOn(console, 'groupEnd');

        // Act
        service.handleError(testIncomeingError)

        // Assert
        expect(ErrorHandlerReporterService.prototype.reportError).toHaveBeenCalledWith(testIncomeingError.originalError);
        expect(console.group).toHaveBeenCalled();
        expect(console.warn).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();
        expect(console.groupEnd).toHaveBeenCalled();
      }));

    });
  });

  describe("testing error is rethrown,", function () {
    beforeEach(() => {
      // Mock company settings class with overrides 
      class MockCompanySettingsService extends CompanySettingsService {
        getCompanySettings(): CompanySettings {
          let errorHandlingSettings: ErrorHandlingSettings = new ErrorHandlingSettings();
          errorHandlingSettings.reportError = false;
          errorHandlingSettings.rethrowError = true;
          errorHandlingSettings.unwrapError = false;

          let companySettings: CompanySettings = new CompanySettings();
          companySettings.errorHandling = errorHandlingSettings;
          return companySettings;
        }
      }
      // Build a service for test
      TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [
          LoggerService,
          { provide: CompanySettingsService, useClass: MockCompanySettingsService },
          ErrorHandlerReporterService,
          ErrorHandlerService,
        ]
      });
      spyOn(LoggerService.prototype, 'info');
    });

    it('should exist', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
      expect(service).toBeTruthy();
    }));

    it('should rethrow the error', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
      // Arrange 
      spyOn(LoggerService.prototype, 'error');

      // Act/Assert 
      expect(function () { service.handleError(testIncomeingError); }).toThrow();
    }));

  });

});