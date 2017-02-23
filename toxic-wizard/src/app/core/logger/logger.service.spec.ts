/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let loggerInfoSpy: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    });
    loggerInfoSpy = spyOn(LoggerService.prototype, 'info');
  });

  it('LoggerService should be avaliable when injected', inject([LoggerService], (service: LoggerService) => {
    expect(service).toBeTruthy();
  }));

  it('should call consle log when LoggerService.log is called', inject([LoggerService], (service: LoggerService) => {
    spyOn(console, 'log');
    service.log('component', 'is broken');
    expect(console.log).toHaveBeenCalledWith('component: is broken');
  }));

  it('should call consle log when LoggerService.info is called', inject([LoggerService], (service: LoggerService) => {
    loggerInfoSpy.and.callThrough();
    spyOn(console, 'info');
    service.info('component', 'is broken');
    expect(console.info).toHaveBeenCalledWith('component: is broken');
  }));

  it('should call consle debug when LoggerService.debug is called', inject([LoggerService], (service: LoggerService) => {
    spyOn(console, 'debug');
    service.debug('component', 'is broken');
    expect(console.debug).toHaveBeenCalledWith('component: is broken');
  }));

  it('should call consle warn twice debug LoggerService.debug is called with the optional object, once with message and once with object', inject([LoggerService], (service: LoggerService) => {
    let someObject: any = {
      name: 'test passed'
    }
    spyOn(console, 'debug');
    service.debug('component', 'is broken', someObject);
    expect(console.debug).toHaveBeenCalledTimes(2);
    expect(console.debug).toHaveBeenCalledWith('component: is broken');
    expect(console.debug).toHaveBeenCalledWith(someObject);
  }));

  it('should call consle warn when LoggerService.warn is called', inject([LoggerService], (service: LoggerService) => {
    spyOn(console, 'warn');
    service.warn('component', 'is broken');
    expect(console.warn).toHaveBeenCalledWith('component: is broken');
  }));

  it('should call consle warn twice when LoggerService.warn is called with the optional object, once with message and once with object', inject([LoggerService], (service: LoggerService) => {
    let someObject: any = {
      name: 'test passed'
    }
    spyOn(console, 'warn');
    service.warn('component', 'is broken', someObject);
    expect(console.warn).toHaveBeenCalledTimes(2);
    expect(console.warn).toHaveBeenCalledWith('component: is broken');
    expect(console.warn).toHaveBeenCalledWith(someObject);

  }));

  it('should call consle error when LoggerService.error is called', inject([LoggerService], (service: LoggerService) => {
    spyOn(console, 'error');
    service.error('component', 'is broken');
    expect(console.error).toHaveBeenCalledWith('component: is broken');
  }));

  it('should call consle error twice when LoggerService.error is called with the optional object, once with message and once with object', inject([LoggerService], (service: LoggerService) => {
    let someObject: any = {
      name: 'test passed'
    }
    spyOn(console, 'error');
    service.error('component', 'is broken', someObject);
    expect(console.error).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledWith('component: is broken');
    expect(console.error).toHaveBeenCalledWith(someObject);
  }));

  it('should call consle log when LoggerService.log is called', inject([LoggerService], (service: LoggerService) => {
    spyOn(console, 'log');
    service.log('component', 'is broken');
    expect(console.log).toHaveBeenCalledWith('component: is broken');
  }));



});
