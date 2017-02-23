/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NonFinancialDecimalScoresModalComponent } from './non-financial-decimal-scores-modal.component';

describe('NonFinancialDecimalScoresModalComponent', () => {
  let component: NonFinancialDecimalScoresModalComponent;
  let fixture: ComponentFixture<NonFinancialDecimalScoresModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonFinancialDecimalScoresModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonFinancialDecimalScoresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
