/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoggerService } from '../logger/logger.service'
import { CompanySettingsService } from './company-settings.service';

describe('CompanySettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggerService,
        CompanySettingsService
        ]
    });
    spyOn(LoggerService.prototype, 'info');
  });

  it('should ...', inject([CompanySettingsService], (service: CompanySettingsService) => {
    expect(service).toBeTruthy();
  }));
});
