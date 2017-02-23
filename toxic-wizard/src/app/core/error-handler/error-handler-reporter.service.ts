import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { LoggerService } from '../logger/logger.service'
import { environment } from '../../../environments/environment'
@Injectable()
export class ErrorHandlerReporterService {

    private _serviceTag: string = "ErrorHandlerReporterService";

    constructor(private _loggerService: LoggerService, private http: Http) {
        _loggerService.info(this._serviceTag, 'has initialised');
    }

    public reportError(error: any): void {
        this.sendToServer(error);
    }

    // TODO: needs implementing once decided on endpoint and such
    private sendToServer(error: any): void {

        this.http
            .post(
            environment.apiUrl + '/some/end/point',
            {
                type: error.name,
                message: error.message,
                stack: error.stack,
                location: window.location.href
            }
            )
            .subscribe(
            (httpResponse: Response): void => {

                // ... nothing to do here.

            },
            (httpError: any): void => {

                // NOTE: We know this will fail in the demo since there is no
                // ability to accept POST requests on GitHub pages.
                // --
                // console.log( "Http error:", httpError );

            }
            )
            ;

    }
}
