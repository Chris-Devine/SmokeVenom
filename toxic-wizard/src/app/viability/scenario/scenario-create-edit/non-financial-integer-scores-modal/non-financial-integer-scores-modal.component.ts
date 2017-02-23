import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';


function startBiggerThanEnd(fg: FormGroup) {
  if ((fg.get('EndValue') !== undefined && !!fg.get('EndValue').value) &&
    (fg.get('StartValue') !== undefined && !!fg.get('StartValue').value)) {
    if (fg.get('EndValue').value !== '' && fg.get('StartValue').value !== '') {
      if (fg.get('EndValue').value <= fg.get('StartValue').value) {
        return { 'startBiggerThanEnd': true }
      }
    }
  }
  return null
}

function RangeGap({value}) {
  if (value && value.length > 0) {
    const errors = [];

    value.reduce((last, next, index) => {
      //check values are not empty
      if (last.EndValue !== '' && next.StartValue !== '') {
        //check they are numbers
        if (!isNaN(last.EndValue) && !isNaN(next.StartValue)) {
          //finally check if the last endvalue is only one number less than the next start value
          if (+last.EndValue + 1 !== +next.StartValue) {
            errors.push(`row${index - 1}row${index}`);
          }
        }
      }
      return next;
    });

    return errors.length > 0 ? {
      'rangeGap': errors
    } : null;
  }
}

@Component({
  selector: 'app-non-financial-integer-scores-modal',
  templateUrl: './non-financial-integer-scores-modal.component.html',
  styleUrls: ['./non-financial-integer-scores-modal.component.css']
})
export class NonFinancialIntegerScoresModalComponent implements OnInit {
  @ViewChild('nonFinancialIntegerScoresModal') public nonFinancialIntegerScoresModal: ModalDirective;
  @Output() scoreChangeNumber: EventEmitter<ScenarioKPIVM> = new EventEmitter<ScenarioKPIVM>();

  public form: FormGroup;
  public scenarioKpiVM: ScenarioKPIVM;
  public showErrors: boolean = false;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.scenarioKpiVM = new ScenarioKPIVM();
    this.scenarioKpiVM.Name = "";
    this.scenarioKpiVM.Scores = new Array<ScenarioKPIScoreVM>();
    this.form = this.createForm(this.scenarioKpiVM);
  }

  public showIntegerModal(scenarioKPIVM: ScenarioKPIVM = null): void {
    //this.scenarioKpiVM = scenarioKPIVM;
    this.showErrors = false;
    // reset all states (dirty, touched etc)
    this.form.reset();
    this.scenarioKpiVM = this.fakeScenario();
    this.form = this.createForm(this.scenarioKpiVM);
    this.nonFinancialIntegerScoresModal.show();
  }

  public hideIntegerModal(): void {
    this.nonFinancialIntegerScoresModal.hide();
  }

  public checkAssetsInKpiScoreRange(scenarioKPIScoreVM: ScenarioKPIScoreVM): void {
    /*this._scenarioDataCheckService.checkAssetsInKpiScoreRangeList(this.scenarioKpiVM, scenarioKPIScoreVM)
      .subscribe(
      result => scenarioKPIScoreVM.PercentOfProps = result / 100,
      err => {
        // Log errors if any
        console.log("scenarioListComponent: Error: ", err);
      });*/
    scenarioKPIScoreVM.PercentOfProps = scenarioKPIScoreVM.Score * 12;
  }

  public addScoreObjectToScoresArray(): void {
    const control = <FormArray>this.form.controls['Scores'];

    let tempScoreObjectOldLastEntry: ScenarioKPIScoreVM = new ScenarioKPIScoreVM
    tempScoreObjectOldLastEntry.EndValue = null
    tempScoreObjectOldLastEntry.StartValue = control.value[control.length - 1].StartValue;
    tempScoreObjectOldLastEntry.Score = control.value[control.length - 1].Score;

    let tempScoreObjectNewLastEntry: ScenarioKPIScoreVM = new ScenarioKPIScoreVM;
    tempScoreObjectNewLastEntry.EndValue = control.value[control.length - 1].EndValue;
    tempScoreObjectNewLastEntry.StartValue = null;
    tempScoreObjectNewLastEntry.Score = control.value[control.length - 1].Score;

    control.removeAt(control.length - 1);
    control.push(this.createScoresFormGroup(tempScoreObjectOldLastEntry));
    control.push(this.createScoresFormGroup(tempScoreObjectNewLastEntry));
  }

  public removeScoreObjectToScoresArray(index: number): void {
    const control = <FormArray>this.form.controls['Scores'];
    control.removeAt(index);
  }

  public saveChanges(): void {
    console.log("form valid: " + this.form.valid)
    if (this.form.valid) {
      this.scoreChangeNumber.emit(this.scenarioKpiVM);
      this.hideIntegerModal();
    }
    else {
      this.showErrors = true;
    }
  }

  public checkRangeGapErrorTo(rowIndex): boolean {
    let errorName: string = "row" + rowIndex + "row" + (rowIndex + 1);
    return this.findRangeGapError(errorName);
  }

  public checkRangeGapErrorFrom(rowIndex): boolean {
    let errorName: string = "row" + (rowIndex - 1) + "row" + rowIndex;
    return this.findRangeGapError(errorName);
  }

  private createForm(scenarioKpiVM: ScenarioKPIVM): FormGroup {
    let tempForm: FormGroup;

    tempForm = this._formBuilder.group({
      'Name': [scenarioKpiVM.Name, [
        Validators.required,
        Validators.minLength(4)
      ]],
      'Scores': this._formBuilder.array(
        scenarioKpiVM.Scores.map(scoreObj => this.createScoresFormGroup(scoreObj)),
        RangeGap
      )
    });

    return tempForm;
  }

  private createScoresFormGroup(scoreObj: ScenarioKPIScoreVM): FormGroup {
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
    }, {
        validator:
        startBiggerThanEnd
      });
  }

  private findRangeGapError(errorName: string): boolean {
    let foundError: boolean = false
    if (this.form.get('Scores').errors) {
      let errors = this.form.get('Scores').errors["rangeGap"];
      if (errors && errors.length > 0) {
        errors.forEach(function (element) {
          if (element === errorName)
            foundError = true;
        });
      }
    }
    return foundError;
  }




  private fakeScenario(): ScenarioKPIVM {

    let tempScenarioKPIScoreVM1: ScenarioKPIScoreVM = new ScenarioKPIScoreVM();
    tempScenarioKPIScoreVM1.ListItemName = "list Item A"
    tempScenarioKPIScoreVM1.StartValue = -9999999;
    tempScenarioKPIScoreVM1.EndValue = 999999;
    tempScenarioKPIScoreVM1.Score = 0;

    let arrayScenarioKPIScoreVM: Array<ScenarioKPIScoreVM> = [tempScenarioKPIScoreVM1]

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


