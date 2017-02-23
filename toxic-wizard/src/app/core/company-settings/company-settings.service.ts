import { Injectable } from '@angular/core';
import { CompanySettings } from './models/company-settings'
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class CompanySettingsService {

  private _serviceTag: string = "CompanySettingsService";
  private _companySettings: CompanySettings
  public get companySettings(): CompanySettings {
    return this._companySettings;
  }

  constructor(private _loggerService: LoggerService) {
    _loggerService.info(this._serviceTag, 'has initialised');
    this._companySettings = this.getCompanySettings();
  }

  // TODO: Implement this correctly once the API works
  public getCompanySettings(): CompanySettings {
    let companySettings: CompanySettings = new CompanySettings();
    return companySettings;
  }
}

