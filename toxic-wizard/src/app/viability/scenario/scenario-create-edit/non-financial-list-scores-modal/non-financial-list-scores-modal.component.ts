import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';



@Component({
  selector: 'app-non-financial-list-scores-modal',
  templateUrl: './non-financial-list-scores-modal.component.html',
  styleUrls: ['./non-financial-list-scores-modal.component.css']
})
export class NonFinancialListScoresModalComponent implements OnInit {

  @ViewChild('nonFinancialListScoresModal') public nonFinancialListScoresModal: ModalDirective;
  @Output() scoreChangeList: EventEmitter<ScenarioKPIVM> = new EventEmitter<ScenarioKPIVM>();
  scenarioKpiVM: ScenarioKPIVM;

  constructor() { }

  ngOnInit() {
    this.scenarioKpiVM = new ScenarioKPIVM();
  }

  public showListModal(scenarioKPIVM: ScenarioKPIVM = null): void {
    //this.scenarioKpiVM = scenarioKPIVM;
    this.scenarioKpiVM = this.fakeScenario();
    this.nonFinancialListScoresModal.show();
  }

  public hideListModal(): void {
    this.nonFinancialListScoresModal.hide();
  }

  public checkAssetsInKpiScoreRange(scenarioKPIScoreVM: ScenarioKPIScoreVM): void {
/*    this.scenarioDataCheckService.checkAssetsInKpiScoreRangeList(this.scenarioKpiVM, scenarioKPIScoreVM)
      .subscribe(
      result => scenarioKPIScoreVM.PercentOfProps = result / 100,
      err => {
        // Log errors if any
        console.log("scenarioListComponent: Error: ", err);
      });*/
    scenarioKPIScoreVM.PercentOfProps = scenarioKPIScoreVM.Score * 12
  }

  public saveChanges(): void {
    this.scoreChangeList.emit(this.scenarioKpiVM);
    this.hideListModal();
  }

  private fakeScenario(): ScenarioKPIVM{

    let tempScenarioKPIScoreVM1: ScenarioKPIScoreVM = new ScenarioKPIScoreVM();
    tempScenarioKPIScoreVM1.ListItemName = "list Item A"
    tempScenarioKPIScoreVM1.Score = 5;

    let tempScenarioKPIScoreVM2: ScenarioKPIScoreVM = new ScenarioKPIScoreVM();
    tempScenarioKPIScoreVM2.ListItemName = "list Item B"
    tempScenarioKPIScoreVM2.Score = 1;

    let arrayScenarioKPIScoreVM: Array<ScenarioKPIScoreVM> = [tempScenarioKPIScoreVM1, tempScenarioKPIScoreVM2]

    let tempScenarioKpiVM: ScenarioKPIVM = new ScenarioKPIVM();
    tempScenarioKpiVM.Name = "Test Kpi";
    tempScenarioKpiVM.Scores = arrayScenarioKPIScoreVM;

    return tempScenarioKpiVM;
  }
}

export class ScenarioKPIVM {
  KPIId: string;
  RelativeWeightage: number;
  Scores: Array<ScenarioKPIScoreVM>;

  Name: string;
  Type: string;
  isSelected: boolean;
}

export class ScenarioKPIScoreVM {
  PercentOfProps: number;
  ListItem: string;
  ListItemName: string;
  StartValue: number;
  EndValue: number;
  Score: number;
}