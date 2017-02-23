/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";

import { ButtonsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { SnapshotCreateModalComponent } from './snapshot-create-modal.component';

describe('SnapshotCreateModalComponent', () => {
  let component: SnapshotCreateModalComponent;
  let fixture: ComponentFixture<SnapshotCreateModalComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalModule.forRoot(),
        ButtonsModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ SnapshotCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
