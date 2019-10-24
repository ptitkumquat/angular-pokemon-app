import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonFightComponent } from './pokemon-fight.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [PokemonFightComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    RouterModule,
  ]
})
export class PokemonFightModule { }
