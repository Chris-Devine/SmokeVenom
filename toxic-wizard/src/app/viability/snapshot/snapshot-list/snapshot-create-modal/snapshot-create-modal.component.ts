import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';

@Component({
  selector: 'app-snapshot-create-modal',
  templateUrl: './snapshot-create-modal.component.html',
  styleUrls: ['./snapshot-create-modal.component.css']
})
export class SnapshotCreateModalComponent implements OnInit {

  @ViewChild('createModal') public createModal: ModalDirective;
  public radioModel: string = 'No';
  public copySnapshot: string = 'false';

  constructor() { }

  ngOnInit() {
  }
  
  public showChildModal(): void {
    this.createModal.show();
  }

  public hideChildModal(): void {
    this.createModal.hide();
  }
}
