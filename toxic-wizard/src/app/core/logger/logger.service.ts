import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { Logger } from './logger.enum'

@Injectable()
export class LoggerService {

  private _serviceTag: string = "LoggerService"

  constructor() {
    this.info(this._serviceTag, 'has initialised');
  }

  private messageOutput: string

  public info(tag: string, message: string): void {
    this.messageOutput = this.CreateMessage(tag, message);
    this.consoleOutput(Logger.info, this.messageOutput)
  }

  public debug(tag: string, message: string, inputObject: any = null): void {
    this.messageOutput = this.CreateMessage(tag, message);
    this.consoleOutput(Logger.debug, this.messageOutput, inputObject)
  }

  public warn(tag: string, message: string, inputObject: any = null): void {
    this.messageOutput = this.CreateMessage(tag, message);
    this.consoleOutput(Logger.warn, this.messageOutput, inputObject)
  }

  public error(tag: string, message: string, inputObject: any = null): void {
    this.messageOutput = this.CreateMessage(tag, message);
    this.consoleOutput(Logger.error, this.messageOutput, inputObject)
  }

  public log(tag: string, message: string): void {
    this.messageOutput = this.CreateMessage(tag, message);
    this.consoleOutput(Logger.log, this.messageOutput)
  }

  private CreateMessage(tag: string, message: string): string {
    return tag + ': ' + message;
  }

  private consoleOutput(logger: Logger, message: string, object: any = null): void {
    if (!environment.production) {
      switch (logger) {
        case Logger.info:
          console.info(message);
          break;
        case Logger.debug:
          console.debug(message);
          if (!!object) {
            console.debug(object)
          }
          break;
        case Logger.warn:
          console.warn(message);
          if (!!object) {
            console.warn(object)
          }
          break;
        case Logger.error:
          console.error(message);
          if (!!object) {
            console.error(object)
          }
          break;
        case Logger.log:
          console.log(message);
          break;
        default:
          console.log(message);
          break;
      }
    }
  }

}
