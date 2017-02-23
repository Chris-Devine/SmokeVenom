import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';

import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';


@Component({
  selector: 'app-snapshot-edit-modal',
  templateUrl: './snapshot-edit-modal.component.html',
  styleUrls: ['./snapshot-edit-modal.component.css']
})
export class SnapshotEditModalComponent implements OnInit {

  @ViewChild('editModal') public editModal: ModalDirective;
  public radioModel: string = 'No';
  constructor() { }

  ngOnInit() {
  }

  public showChildModal(): void {
    this.editModal.show();
  }

  public hideChildModal(): void {
    this.editModal.hide();
  }
}
