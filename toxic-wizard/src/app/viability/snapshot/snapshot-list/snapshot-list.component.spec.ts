/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { SnapshotCreateModalComponent } from './snapshot-create-modal/snapshot-create-modal.component'
import { SnapshotEditModalComponent } from './snapshot-edit-modal/snapshot-edit-modal.component'
import { SnapshotListComponent } from './snapshot-list.component';


@Component({
  selector: 'app-snapshot-create-modal',
  template: 'overide snapshot-create-modal'
})
class EmptySnapshotCreateModalComponent { }


@Component({
  selector: 'app-snapshot-edit-modal',
  template: 'overide snapshot-edit-modal'
})
class EmptySnapshotEditModalComponent { }

describe('SnapshotListComponent', () => {
  let component: SnapshotListComponent;
  let fixture: ComponentFixture<SnapshotListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        PaginationModule.forRoot(),
        ModalModule.forRoot()
      ],
      declarations: [
        SnapshotCreateModalComponent,
        EmptySnapshotCreateModalComponent,
        SnapshotEditModalComponent,
        EmptySnapshotEditModalComponent,
        SnapshotListComponent
        ]
    })
      .overrideDirective(SnapshotCreateModalComponent, EmptySnapshotCreateModalComponent)
      .overrideDirective(SnapshotEditModalComponent, EmptySnapshotEditModalComponent)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty component instead of snapshot-create-modal component, with text "overide snapshot-create-modal" inside', async(() => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-snapshot-create-modal').textContent).toContain('overide snapshot-create-modal');
  }));

  it('should render empty component instead of snapshot-edit-modal component, with text "overide snapshot-edit-modal" inside', async(() => {
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-snapshot-edit-modal').textContent).toContain('overide snapshot-edit-modal');
  }));

});
