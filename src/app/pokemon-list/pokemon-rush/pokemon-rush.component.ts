import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { EquipeService } from '../../services/equipe.service';
import { TypesService } from '../../services/types.service';
import { Pokemon } from '../../shared/model/pokemon';
import { Router } from '@angular/router';
import { FightService } from 'src/app/services/fight.service';
import { Fight } from 'src/app/shared/model/fight';

@Component({
  selector: 'app-pokemon-rush',
  templateUrl: './pokemon-rush.component.html',
  styleUrls: ['./pokemon-rush.component.css']
})
export class PokemonRushComponent implements OnInit {

  private fight: Fight;
  private test: boolean = false;

  constructor(
    private router: Router,
    private pokemonService: PokemonService,
    private equipeAdvService: EquipeService,
    private pokemonFightService: FightService
  ) {
    this.fight = this.pokemonFightService.createFight();
    this.fight.equipe[0] = this.router.getCurrentNavigation().extras.state as Pokemon;
  }

  ngOnInit() {
    this.test = false;
    if (this.fight.equipe[0] === undefined) this.fight.equipe[0] = this.pokemonService.getPokemon(1);
  }

  color(pokemon: Pokemon): string {
    return this.pokemonFightService.color(this.fight, pokemon);
  }

  progress(pokemon: Pokemon): string {
    let progress = this.pokemonFightService.progress(this.fight, pokemon);
    return progress;
  }

  rush(pokemon: Pokemon) {
    if (this.test) {
      pokemon.hp = pokemon.hpMax;
      this.fight.equipe[0] = pokemon;
      this.test = false;
    }
    this.fight.equipeAdv = this.equipeAdvService.createRandomEquip(6);
    this.pokemonFightService.fullCombat(this.fight);
    this.test = true;

  }
}
