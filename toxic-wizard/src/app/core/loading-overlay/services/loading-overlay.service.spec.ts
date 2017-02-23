/* tslint:disable:no-unused-variable */

import { TestBed, async, tick, fakeAsync, inject } from '@angular/core/testing';
import { LoadingOverlayService } from './loading-overlay.service';

describe('LoadingOverlayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingOverlayService]
    });
  });

  it('should ...', inject([LoadingOverlayService], (service: LoadingOverlayService) => {
    expect(service).toBeTruthy();
  }));

  it('when initiated a default BehaviorSubject should be omited of type "LoadingOverlay" with empty display message and "isLoading" as false and', inject([LoadingOverlayService], fakeAsync((service: LoadingOverlayService) => {
    let isLoadingResult: boolean;
    let displayMessageResult: string;
    let epectedDisplayMessageResult: string = '';

    service.loadingState.subscribe((state) => {
      isLoadingResult = state.isLoading
      displayMessageResult = state.displayMessage;
    });

    expect(displayMessageResult).toBe(epectedDisplayMessageResult);
    expect(isLoadingResult).toBe(false);
  })));

  it('when "StartLoading" is called with a displayMessage param, it should set omit a BehaviorSubject of type "LoadingOverlay" with correct display message and "isLoading" as true', inject([LoadingOverlayService], fakeAsync((service: LoadingOverlayService) => {
    let isLoadingResult: boolean;
    let displayMessageResult: string;
    let epectedDisplayMessageResult: string = 'TestMessage';

    service.loadingState.subscribe((state) => {
      isLoadingResult = state.isLoading
      displayMessageResult = state.displayMessage;
    });

    service.StartLoading(epectedDisplayMessageResult)

    expect(displayMessageResult).toBe(epectedDisplayMessageResult);
    expect(isLoadingResult).toBe(true);
  })));

  it('when "StartLoading" is called with no params, it should set omit a BehaviorSubject of type "LoadingOverlay" with correct display message and "isLoading" as true', inject([LoadingOverlayService], fakeAsync((service: LoadingOverlayService) => {
    let isLoadingResult: boolean;
    let displayMessageResult: string;
    let epectedDisplayMessageResult: string = 'Loading...';

    service.loadingState.subscribe((state) => {
      isLoadingResult = state.isLoading
      displayMessageResult = state.displayMessage;
    });

    service.StartLoading()

    expect(displayMessageResult).toBe(epectedDisplayMessageResult);
    expect(isLoadingResult).toBe(true);
  })));


});
