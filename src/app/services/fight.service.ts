import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EquipeService } from './equipe.service';
import { PokemonService } from './pokemon.service';
import { TypesService } from './types.service';
import { Pokemon } from '../shared/model/pokemon';
import { TypeEnum } from '../shared/data/type-enum';
import { Fight } from '../shared/model/fight';

@Injectable({
  providedIn: 'root'
})
export class FightService {

  constructor(
    private router: Router,
    private pokemonEquipeService: EquipeService,
    private pokemonEquipeAdvService: EquipeService,
    private pokemonService: PokemonService,
    private mockType: TypesService
  ) { }

  createFight(): Fight {
    return new Fight();
  }

  beginFight(fight:Fight) : Fight{
    this.pokemonEquipeService = this.pokemonEquipeService.createEquipe();
    this.pokemonEquipeAdvService = this.pokemonEquipeAdvService.createEquipe();

    fight.winner = null;
    fight.compteur = 5;
    fight.equipe = this.pokemonEquipeService.createRandomEquip(4);
    fight.equipeAdv = this.pokemonEquipeAdvService.createRandomEquip(6);
    return fight;
  }

  rerollPokemon(fight:Fight, pokemon: Pokemon, event: any) {
    event.stopPropagation();
    this.pokemonEquipeService.removePokemon(pokemon);
    this.pokemonEquipeService.generatePokemon();
    fight.compteur -= 2;
  }

  async combat(fight:Fight, p1: Pokemon, p2: Pokemon) {
    await this.sleep(500);
    if (this.isFirst(p1, p2)) {
      await this.attack(fight, p1, p2);
    }
    while (p1.hp > 0 && p2.hp > 0) {
      await this.attack(fight, p2, p1);
      if (p1.hp > 0)
        await this.attack(fight, p1, p2);
    }
    await this.sleep(500);
  }


  async attack(fight:Fight, attaquant: Pokemon, defenseur: Pokemon) {
    fight.defenseur = defenseur;

    if (Math.random() > 0.1) {
      if (Math.random() > 0.9) {
        await this.blink(fight, 15, 25, "red");
        defenseur.hp -= attaquant.cp * this.getCoeffType(fight, attaquant, defenseur) / (1 + defenseur.def / 25) * 2;
      } else {
        await this.blink(fight, 5, 50, "rgb(172,236,230)");
        defenseur.hp -= attaquant.cp * this.getCoeffType(fight, attaquant, defenseur) / (1 + defenseur.def / 25);
      }
    } else {
      await this.blink(fight, 1, 250, "black");
    }
  }

  getCoeffType(fight:Fight, p1: Pokemon, p2: Pokemon): number {
    fight.coeff = [];
    p1.types.forEach((type) => {
      p2.types.forEach((type2) => {
        fight.coeff.push(this.mockType.getEfficacite()[TypeEnum[type]][TypeEnum[type2]]);
      });
    });
    return fight.coeff.reduce((a, c) => a * c);
  }

  sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  async fullCombat(fight:Fight) {
    fight.compteur = 0;
    while (fight.equipe.length > 0 && fight.equipeAdv.length > 0) {
      await this.combat(fight, fight.equipe[0], fight.equipeAdv[0]);
      this.removeKo(fight);
    }
    if (fight.equipe.length == 0) {
      fight.winner = fight.equipe;
    }
    if (fight.equipeAdv.length == 0) {
      fight.winner = fight.equipeAdv;
    }
  }

  removeKo(fight:Fight) {
    fight.equipe[0].hp > 0 ? fight.equipeAdv.splice(0, 1) : fight.equipe.splice(0, 1);
  }

  isFirst(p1: Pokemon, p2: Pokemon): boolean {
    return p1.speed > p2.speed;
  }

  progress(fight:Fight, pokemon: Pokemon): string {
    const max = this.pokemonService.getPokemon(pokemon.id).hpMax;
    return Math.floor(pokemon.hp / max * 100) + "%";
  }

  detailPokemon(fight:Fight, pokemon: Pokemon) {
    console.log("details du pokémon " + pokemon.name);
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

  color(fight:Fight, pokemon: Pokemon): string {
    const currentHp = pokemon.hp /this.pokemonService.getPokemon(pokemon.id).hpMax * 2 - 1;
    if (fight.blank && pokemon == fight.defenseur) {
      return fight.blinkColor;
    } else {
      if (currentHp > 0)
        return "rgb(" + (240 - 240 * currentHp) + "," + (120 + 60 * currentHp) + "," + (0 + 90 * currentHp) + ")";
      else
        return "rgb(" + (240 + 40 * currentHp) + "," + (120 + 120 * currentHp) + "," + (0 + 0 * currentHp) + ")";
    }
  }

  async blink(fight:Fight, n: number, blinkTime: number, color: string) {
    fight.blinkColor = color;
    for (var i = 0; i < n; i++) {
      fight.blank = true;
      await this.sleep(blinkTime);
      fight.blank = false;
      await this.sleep(blinkTime);
    }
  }

  changeOrder(fight:Fight, p: Pokemon) {
    if (fight.indexP1 === null) {
      fight.indexP1 = fight.equipe.findIndex((pokemon) => pokemon.id === p.id);
    }
    else {
      let indexP2 = fight.equipe.findIndex((pokemon) => pokemon.id === p.id);
      if (fight.indexP1 !== indexP2) {
        [fight.equipe[fight.indexP1], fight.equipe[indexP2]] = [fight.equipe[indexP2], fight.equipe[fight.indexP1]];
        fight.compteur -= 1;
      }
      fight.indexP1 = null;
    }

  }


  evolvePokemon(fight:Fight, pokemon: Pokemon) {
    let index = fight.equipe.findIndex((pk) => pk === pokemon);
    fight.equipe[index] = this.pokemonService.getPokemon(this.validateId(pokemon.id));
    fight.compteur -= 3;
  }

  validateId(id: number): number {
    return id + 1 > 151 ? 1 : id + 1;
  }

}