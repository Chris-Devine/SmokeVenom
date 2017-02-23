import { InMemoryWebApiModule } from 'angular-in-memory-web-api'

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { PaginationModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ButtonsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { SharedModule } from '../shared/shared.module'
import { ViabilityRoutingModule } from './viability-routing.module'

import { ViabilityAuthGuardService } from './services/viability-auth-guard.service'


import { ViabilityComponent } from './viability.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SnapshotListComponent } from './snapshot/snapshot-list/snapshot-list.component';
import { SnapshotEditModalComponent } from './snapshot/snapshot-list/snapshot-edit-modal/snapshot-edit-modal.component';
import { SnapshotCreateModalComponent } from './snapshot/snapshot-list/snapshot-create-modal/snapshot-create-modal.component';
import { ScenarioListComponent } from './scenario/scenario-list/scenario-list.component';
import { ScenarioCreateEditComponent } from './scenario/scenario-create-edit/scenario-create-edit.component';
import { NonFinancialListScoresModalComponent } from './scenario/scenario-create-edit/non-financial-list-scores-modal/non-financial-list-scores-modal.component';
import { NonFinancialIntegerScoresModalComponent } from './scenario/scenario-create-edit/non-financial-integer-scores-modal/non-financial-integer-scores-modal.component';
import { NonFinancialDecimalScoresModalComponent } from './scenario/scenario-create-edit/non-financial-decimal-scores-modal/non-financial-decimal-scores-modal.component';

@NgModule({
  imports: [
    //InMemoryWebApiModule.forRoot(DataManagedByWebAoi),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    SharedModule,
    ViabilityRoutingModule,
  ],
  providers: [
    ViabilityAuthGuardService
  ],
  declarations: [
    ViabilityComponent,
    DashboardComponent,
    SidebarComponent,
    SnapshotListComponent,
    SnapshotListComponent,
    SnapshotEditModalComponent,
    SnapshotCreateModalComponent,
    ScenarioListComponent,
    ScenarioCreateEditComponent,
    NonFinancialListScoresModalComponent,
    NonFinancialIntegerScoresModalComponent,
    NonFinancialDecimalScoresModalComponent
  ]
})
export class ViabilityModule { }
