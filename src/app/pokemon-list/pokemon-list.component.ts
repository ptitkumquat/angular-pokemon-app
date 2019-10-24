import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../shared/model/pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { EquipeService } from '../services/equipe.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  private pokemons: Pokemon[];
  private title: string = "Pokémons";
  private equipe: Pokemon[] = [];


  constructor(
    private router: Router,
    private pokemonsService: PokemonService,
    private pokemonEquipeService: EquipeService
  ) { }

  ngOnInit() {
    this.pokemons = this.pokemonsService.getPokemons();
    this.equipe = this.pokemonEquipeService.getEquipe();
  }

  detailPokemon(pokemon: Pokemon) {
    console.log("details du pokémon " + pokemon.name);
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

  selectPokemon(pokemon: Pokemon) {
    this.pokemonEquipeService.selectPokemon(pokemon);
  }

  addPokemon(pokemon: Pokemon, event: any) {
    event.stopPropagation();
    this.pokemonEquipeService.addPokemon(pokemon);
  }

  removePokemon(pokemon: Pokemon, event: any) {
    event.stopPropagation();
    this.pokemonEquipeService.removePokemon(pokemon);
  }


}
