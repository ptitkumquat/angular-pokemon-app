import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PokemonListModule } from './pokemon-list/pokemon-list.module';
import { PokemonFightModule } from './pokemon-fight/pokemon-fight.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonRushComponent } from './pokemon-rush/pokemon-rush.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonRushComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    PokemonListModule,
    PokemonFightModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
