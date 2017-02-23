/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { LoggerService } from '../logger/logger.service'
import { ErrorHandlerReporterService } from './error-handler-reporter.service';

describe('ErrorHandlerReporterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        LoggerService,
        ErrorHandlerReporterService
        ]
    });
    spyOn(LoggerService.prototype, 'info');
  });

  it('should ...', inject([ErrorHandlerReporterService], (service: ErrorHandlerReporterService) => {
    expect(service).toBeTruthy();
  }));
});
