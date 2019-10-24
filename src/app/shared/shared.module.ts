import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTypeColorPipe } from './pipes/pokemon-type-color.pipe';
import { MaterialModule } from './material/material.module';
import { PokemonHpBarPipe } from './pipes/pokemon-hp-bar.pipe';



@NgModule({
  declarations: [
    PokemonTypeColorPipe,
    PokemonHpBarPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    PokemonTypeColorPipe,
    PokemonHpBarPipe
  ]   
})
export class SharedModule { }
