import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonFightComponent } from './pokemon-fight/pokemon-fight.component';
import { PokemonRushComponent } from './pokemon-rush/pokemon-rush.component';


const appRoutes: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "pokemons" },
	{ path: "pokemons", component: PokemonListComponent },
	{ path: "fight", component: PokemonFightComponent },
	{ path: "rush", component: PokemonRushComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }