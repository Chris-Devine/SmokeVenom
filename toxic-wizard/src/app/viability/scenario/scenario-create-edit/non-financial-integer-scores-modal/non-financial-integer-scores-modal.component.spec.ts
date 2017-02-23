/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NonFinancialIntegerScoresModalComponent } from './non-financial-integer-scores-modal.component';

describe('NonFinancialIntegerScoresModalComponent', () => {
  let component: NonFinancialIntegerScoresModalComponent;
  let fixture: ComponentFixture<NonFinancialIntegerScoresModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonFinancialIntegerScoresModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonFinancialIntegerScoresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
