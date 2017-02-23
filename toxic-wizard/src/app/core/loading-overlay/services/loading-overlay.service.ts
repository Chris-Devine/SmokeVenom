import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { LoadingOverlay } from '../models/loading-overlay'

@Injectable()
export class LoadingOverlayService implements OnInit {

  private defaultDisplayMassage: string = "Loading..."
  public loadingState: Subject<LoadingOverlay> = new BehaviorSubject<LoadingOverlay>(new LoadingOverlay);

  constructor() { }

  ngOnInit() {
  }

  public StartLoading(displayMessage: string = null): void {
    let loadingOverlay: LoadingOverlay = new LoadingOverlay();

    loadingOverlay.isLoading = true;
    if (!!displayMessage) {
      loadingOverlay.displayMessage = displayMessage;
    }
    else {
      loadingOverlay.displayMessage = this.defaultDisplayMassage;
    }

    this.loadingState.next(loadingOverlay);
  }

  public StopLoading(): void {
    let loadingOverlay: LoadingOverlay = new LoadingOverlay();
    loadingOverlay.isLoading = false
    this.loadingState.next(loadingOverlay);
  }

}

