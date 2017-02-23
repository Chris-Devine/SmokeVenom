/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoggerService } from '../../core/logger/logger.service'
import { LoadingOverlayService } from './services/loading-overlay.service'
import { LoadingOverlayComponent } from './loading-overlay.component';

describe('LoadingOverlayComponent', () => {
  let component: LoadingOverlayComponent;
  let fixture: ComponentFixture<LoadingOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
      ],
      providers:[
        LoggerService,
        LoadingOverlayService,
        LoadingOverlayComponent
      ],
      declarations: [ LoadingOverlayComponent ]
    })
    .compileComponents();

    spyOn(LoggerService.prototype, 'info')
    spyOn(LoggerService.prototype, 'debug')
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
