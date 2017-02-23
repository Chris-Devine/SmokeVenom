import { Component, OnInit, ViewChild } from '@angular/core';

import { NonFinancialListScoresModalComponent } from './non-financial-list-scores-modal/non-financial-list-scores-modal.component'
import { NonFinancialDecimalScoresModalComponent } from './non-financial-decimal-scores-modal/non-financial-decimal-scores-modal.component'
import { NonFinancialIntegerScoresModalComponent } from './non-financial-integer-scores-modal/non-financial-integer-scores-modal.component'

@Component({
  selector: 'app-scenario-create-edit',
  templateUrl: './scenario-create-edit.component.html',
  styleUrls: ['./scenario-create-edit.component.css']
})
export class ScenarioCreateEditComponent implements OnInit {

  @ViewChild(NonFinancialListScoresModalComponent) nonFinancialListScoresModalComponent: NonFinancialListScoresModalComponent;
  @ViewChild(NonFinancialDecimalScoresModalComponent) nonFinancialDecimalScoresModalComponent: NonFinancialDecimalScoresModalComponent;
  @ViewChild(NonFinancialIntegerScoresModalComponent) nonFinancialIntegerScoresModalComponent: NonFinancialIntegerScoresModalComponent;

  activeTab: number = 0;
  maxActiveTab: number = 3;
  minActiveTab: number = 0;

  constructor() { }

  ngOnInit() {
  }



  public nextTab(): void {
    if (this.activeTab <= this.maxActiveTab) {
      this.activeTab += 1;
    }
  }

  public previousTab(): void {
    if (this.activeTab >= this.minActiveTab) {
      this.activeTab -= 1;
    }
  }

  public tabClick(tabNumber: number): void {
    this.activeTab = tabNumber;
  }

  public tempShowNonFinancialListScoresModalComponent(): void {
    this.nonFinancialListScoresModalComponent.showListModal();
  }
  public tempShowNonFinancialIntScoresModalComponent(): void {
    this.nonFinancialIntegerScoresModalComponent.showIntegerModal();
  }
  public tempShowNonFinancialDecScoresModalComponent(): void {
    this.nonFinancialDecimalScoresModalComponent.showDecimalModal();
  }
  
}
