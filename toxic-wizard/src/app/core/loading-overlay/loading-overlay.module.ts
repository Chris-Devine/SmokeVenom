import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingOverlayComponent } from './loading-overlay.component'

import { LoadingOverlayService } from './services/loading-overlay.service'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadingOverlayComponent
  ],
  exports: [
    LoadingOverlayComponent
  ],
  providers: [
    LoadingOverlayService
  ]
})
export class LoadingOverlayModule { }
