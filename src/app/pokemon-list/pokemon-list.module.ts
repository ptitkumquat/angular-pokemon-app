import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [PokemonListComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    RouterModule,
    ]
})
export class PokemonListModule { }
