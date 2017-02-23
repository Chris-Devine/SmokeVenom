import { Component, OnInit, ViewChild } from '@angular/core';

import { SnapshotCreateModalComponent } from './snapshot-create-modal/snapshot-create-modal.component'
import { SnapshotEditModalComponent } from './snapshot-edit-modal/snapshot-edit-modal.component'

import { Pagnation } from '../../../shared/model/pagnation/pagnation'

@Component({
  selector: 'app-snapshot-list',
  templateUrl: './snapshot-list.component.html',
  styleUrls: ['./snapshot-list.component.css']
})
export class SnapshotListComponent implements OnInit {

  @ViewChild(SnapshotCreateModalComponent) snapshotCreateModalComponent: SnapshotCreateModalComponent;
  @ViewChild(SnapshotEditModalComponent) snapshotEditModalComponent: SnapshotEditModalComponent;

  public pagnation: Pagnation;


  constructor() { }

  ngOnInit() {
    this.instantiateProperties();
  }

  instantiateProperties(): void {
    this.pagnation = new Pagnation();
  }


  loadSnapshots() {
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
    this.loadSnapshots();
  }

  onSearchResultsLengthChange(resultsLength) {
    this.pagnation.resultsLength = resultsLength;
    this.loadSnapshots();
  }

  public createSnapshot(): void {
    this.snapshotCreateModalComponent.showChildModal();
  }

  public editSnapshot(): void {
    this.snapshotEditModalComponent.showChildModal();
  }
}
