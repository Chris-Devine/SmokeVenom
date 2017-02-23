/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NonFinancialListScoresModalComponent } from './non-financial-list-scores-modal.component';

describe('NonFinancialListScoresModalComponent', () => {
  let component: NonFinancialListScoresModalComponent;
  let fixture: ComponentFixture<NonFinancialListScoresModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonFinancialListScoresModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonFinancialListScoresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
