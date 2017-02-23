/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

import { ButtonsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { SnapshotEditModalComponent } from './snapshot-edit-modal.component';

describe('SnapshotEditModalComponent', () => {
  let component: SnapshotEditModalComponent;
  let fixture: ComponentFixture<SnapshotEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalModule.forRoot(),
        ButtonsModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        SnapshotEditModalComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
