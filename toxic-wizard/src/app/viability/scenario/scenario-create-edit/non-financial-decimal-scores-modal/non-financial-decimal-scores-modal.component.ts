import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';

@Component({
  selector: 'app-non-financial-decimal-scores-modal',
  templateUrl: './non-financial-decimal-scores-modal.component.html',
  styleUrls: ['./non-financial-decimal-scores-modal.component.css']
})
export class NonFinancialDecimalScoresModalComponent implements OnInit {
  @ViewChild('nonFinancialDecimalScoresModal') public nonFinancialDecimalScoresModal: ModalDirective;
  @Output() scoreChangeNumber: EventEmitter<ScenarioKPIVM> = new EventEmitter<ScenarioKPIVM>();

  form: FormGroup;
  scenarioKpiVM: ScenarioKPIVM;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.scenarioKpiVM = new ScenarioKPIVM();
    this.scenarioKpiVM.Name = "";
    this.scenarioKpiVM.Scores = new Array<ScenarioKPIScoreVM>();
    this.createForm();
  }

  createForm(): void {
    this.form = this._formBuilder.group({
      'Name': [this.scenarioKpiVM.Name, [
        Validators.required,
        Validators.minLength(4)
      ]],
      'Scores': this._formBuilder.array([])
    });

    this.scenarioKpiVM.Scores.forEach(
      (scoreObj) => {
        const control = <FormArray>this.form.controls['Scores'];
        control.push(this.createScoresFormGroup(scoreObj));
      }
    );
  }


  createScoresFormGroup(scoreObj: ScenarioKPIScoreVM): FormGroup {
    return this._formBuilder.group({
      StartValue: [scoreObj.StartValue, [
        Validators.required
      ]],
      EndValue: [scoreObj.EndValue, [
        Validators.required,
      ]],
      Score: [scoreObj.Score, [
        Validators.required,
      ]],
      PercentOfProps: scoreObj.PercentOfProps
    });
  }



  public showDecimalModal(scenarioKPIVM: ScenarioKPIVM = null): void {
    //this.scenarioKpiVM = scenarioKPIVM;
    this.scenarioKpiVM = this.fakeScenario();
    this.createForm();
    this.nonFinancialDecimalScoresModal.show();
  }

  public hideDecimalModal(): void {
    this.nonFinancialDecimalScoresModal.hide();
  }

  checkAssetsInKpiScoreRange(scenarioKPIScoreVM: ScenarioKPIScoreVM): void {
    /*this._scenarioDataCheckService.checkAssetsInKpiScoreRangeList(this.scenarioKpiVM, scenarioKPIScoreVM)
      .subscribe(
      result => scenarioKPIScoreVM.PercentOfProps = result / 100,
      err => {
        // Log errors if any
        console.log("scenarioListComponent: Error: ", err);
      });*/
    scenarioKPIScoreVM.PercentOfProps = scenarioKPIScoreVM.Score * 12;
  }

  addScoreObjectToScoresArray(): void {
    const control = <FormArray>this.form.controls['Scores'];
    let tempScoreObject: ScenarioKPIScoreVM = new ScenarioKPIScoreVM;
    let tempScore: number = control.value[control.length - 1].EndValue;
    tempScoreObject.StartValue = tempScore;
    tempScoreObject.EndValue = null;
    this.scenarioKpiVM.Scores.push(tempScoreObject);
    control.push(this.createScoresFormGroup(tempScoreObject));
  }

  removeScoreObjectToScoresArray(index: number): void {
    const control = <FormArray>this.form.controls['Scores'];
    this.scenarioKpiVM.Scores.splice(index, 1);
    control.removeAt(index);
  }

  saveChanges(): void {
    this.scoreChangeNumber.emit(this.scenarioKpiVM);
    this.hideDecimalModal();
  }

  private fakeScenario(): ScenarioKPIVM {

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