import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViabilityAuthGuardService } from './services/viability-auth-guard.service'

import { ViabilityComponent } from './viability.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SnapshotListComponent } from './snapshot/snapshot-list/snapshot-list.component';
import { ScenarioListComponent } from './scenario/scenario-list/scenario-list.component'
import { ScenarioCreateEditComponent } from './scenario/scenario-create-edit/scenario-create-edit.component'



const routes: Routes = [
  {
    path: 'viability',
    component: ViabilityComponent,
    canActivate: [ViabilityAuthGuardService],
    data: {
      title: 'Viability'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivateChild: [],
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'snapshot-list',
        component: SnapshotListComponent,
        data: {
          title: 'Snapshots List'
        }
      },
      {
        path: 'scenario-list',
        component: ScenarioListComponent,
        data: {
          title: 'Scenario List'
        }
      },
      {
        path: 'scenario-edit',
        component: ScenarioCreateEditComponent,
        data: {
          title: 'Scenario Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class ViabilityRoutingModule { }