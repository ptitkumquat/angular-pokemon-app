import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonRushComponent } from './pokemon-rush.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [PokemonRushComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    RouterModule,
  ]
})
export class PokemonRushModule { }