import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GenesisUiModule } from './genesis-ui/genesis-ui.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    FooterComponent,
    ],
  imports: [
    CommonModule,
    GenesisUiModule,
    RouterModule
  ],
  exports:[
    FooterComponent,
    GenesisUiModule
  ]
})
export class SharedModule { }
