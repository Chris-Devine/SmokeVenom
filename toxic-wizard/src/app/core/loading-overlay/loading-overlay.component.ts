import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core/logger/logger.service'
import { LoadingOverlayService } from './services/loading-overlay.service'

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit {

  private _serviceTag: string = "LoadingOverlayComponent";
  public isLoadingOverlayHidden: boolean = false;
  public displayMessage: string = "test";

  constructor(
    private _loggerService: LoggerService,
    private _loadingOverlayService: LoadingOverlayService
  ) { }

  ngOnInit() {
    this._loggerService.info(this._serviceTag, 'has initialised');
    this.subscribeToLoadingService();
  }

  private subscribeToLoadingService() {
    this._loadingOverlayService.loadingState.subscribe((state) => {
      this._loggerService.debug(this._serviceTag, "loading state", state.isLoading);
      this.isLoadingOverlayHidden = !state.isLoading
      this.displayMessage = state.displayMessage;
    });
  }

}
