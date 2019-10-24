import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule, MatCardModule, MatProgressBarModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule
  ]
})
export class MaterialModule { }
