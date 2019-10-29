import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PokemonRushComponent } from './pokemon-rush/pokemon-rush.component';


@NgModule({
  declarations: [PokemonListComponent, PokemonRushComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    RouterModule,
    ]
})
export class PokemonListModule { }
