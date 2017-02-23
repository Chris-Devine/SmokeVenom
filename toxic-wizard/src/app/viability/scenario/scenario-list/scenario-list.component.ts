import { Component, OnInit } from '@angular/core';



import { Pagnation } from '../../../shared/model/pagnation/pagnation'

@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.css']
})
export class ScenarioListComponent implements OnInit {

  public pagnation: Pagnation;

  constructor() { }

  ngOnInit() {
    this.instantiateProperties();
  }

  instantiateProperties(): void {
    this.pagnation = new Pagnation();
  }

  loadScenarios() {
    // gets the set amount of snapshots for the pagnation set
    /*    this.scenarioService.getScenarioList(this.pagnation.startIndex, this.pagnation.pageNumber, this.pagnation.resultsLength)
          .subscribe(
          result => {
            this.pagnation.totalItems = result.recordsTotal;
            this.scenarioList = result.data;
          }, //Bind to view
          err => {
            // Log errors if any
            console.log("scenarioListComponent: Error: ", err);
          },
          () => console.log('scenarioListComponent: Load Events Completed')
          );*/
  }

  pageChanged(event) {
    let pageNumber: number = event.page;
    this.pagnation.pageNumber = pageNumber;
    this.pagnation.startIndex = (this.pagnation.resultsLength * pageNumber) - this.pagnation.resultsLength;
    this.loadScenarios();
  }

  onSearchResultsLengthChange(resultsLength) {
    this.pagnation.resultsLength = resultsLength;
    this.loadScenarios();
  }

  public createSnapshot(): void {
    //this.snapshotCreateModalComponent.showChildModal();
  }

  public editSnapshot(): void {
    //this.snapshotEditModalComponent.showChildModal();
  }

}
