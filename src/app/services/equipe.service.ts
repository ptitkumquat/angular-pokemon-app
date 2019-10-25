import { Injectable } from '@angular/core';
import { Pokemon } from '../shared/model/pokemon';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  private equipe: Pokemon[] = [];
  private miniEquip: Pokemon[] = [];

  constructor(private pokemonsService: PokemonService) { }

  selectPokemon(pokemon: Pokemon) {
    alert("JE TE CHOISIS, " + pokemon.name.toUpperCase() + " !!!!!!!");
  }

  getEquipe(): Pokemon[] {
    return this.equipe;
  }

  addPokemon(pokemon: Pokemon) {
    if (this.equipe.length < 6) {
      pokemon.hp = pokemon.hpMax;
      this.equipe.push(pokemon);
    }
    else {
      alert("TON EQUIPE EST DEJA FULL !!!!");
    }
  }

  getPokemon(pokemon: Pokemon):Pokemon{
    return pokemon;
  }

  removePokemon(pokemon: Pokemon) {
    let pokemonIndex = this.equipe.indexOf(pokemon);
    this.equipe.splice(pokemonIndex, 1);
  }

  createRandomEquip(max: number) {
    this.equipe.splice(0);
    for (let i = 0; i < max; i++) {
      this.generatePokemon();
    }
  }

  generatePokemon() {
    do {
      var id = Math.floor(Math.random() * 151 + 1);
    } while (this.equipe.find((pokemon) => pokemon.id === id))
    this.addPokemon(this.pokemonsService.getPokemon(id));
  }
}
