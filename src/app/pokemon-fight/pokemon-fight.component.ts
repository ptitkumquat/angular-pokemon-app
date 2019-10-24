import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../shared/model/pokemon';
import { Router } from '@angular/router';
import { EquipeService } from '../services/equipe.service';
import { PokemonService } from '../services/pokemon.service';
import { TypesService } from '../services/types.service';
import { TypeEnum } from '../shared/data/type-enum';

@Component({
  selector: 'app-pokemon-fight',
  templateUrl: './pokemon-fight.component.html',
  styleUrls: ['./pokemon-fight.component.css']
})
export class PokemonFightComponent implements OnInit {

  private equipe: Pokemon[];
  private equipeAdv: Pokemon[];
  private compteur: number;
  private winner: Pokemon[];
  private coeff: number[] = [];
  private pokemon: Pokemon;
  private blank: boolean;
  private defenseur: Pokemon;

  constructor(
    private router: Router,
    private pokemonEquipeService: EquipeService,
    private pokemonEquipeAdvService: EquipeService,
    private pokemonService: PokemonService,
    private mockType: TypesService
  ) { }

  ngOnInit() {
    this.pokemonEquipeAdvService = new EquipeService(this.pokemonService);
    this.equipe = this.pokemonEquipeService.getEquipe();
    this.equipeAdv = this.pokemonEquipeAdvService.getEquipe();
    this.beginFight();
  }

  beginFight() {
    this.winner = null;
    this.compteur = 2;
    this.pokemonEquipeService.createRandomEquip();
    this.pokemonEquipeAdvService.createRandomEquip();
  }

  rerollPokemon(pokemon: Pokemon, event: any) {
    event.stopPropagation();
    this.pokemonEquipeService.removePokemon(pokemon);
    this.pokemonEquipeService.generatePokemon();
    this.compteur -= 1;
  }

  async combat(p1: Pokemon, p2: Pokemon) {
    await this.sleep(500);
    if (this.isFirst(p1, p2)) {
      await this.attack(p1, p2);
    }
    while (p1.hp > 0 && p2.hp > 0) {
      await this.attack(p2, p1);
      if (p1.hp > 0)
        await this.attack(p1, p2);
    }
    await this.sleep(500);
  }

  async attack(attaquant: Pokemon, defenseur: Pokemon) {
    this.defenseur = defenseur;
    await this.blink(5);
    defenseur.hp -= attaquant.cp * this.getCoeffType(attaquant, defenseur) / (1 + defenseur.def / 25);
    if (defenseur.hp < 0)
      defenseur.hp = 0;
    console.log(defenseur.hp);
    await this.sleep(500);
  }

  getCoeffType(p1: Pokemon, p2: Pokemon): number {
    this.coeff = [];
    p1.types.forEach((type) => {
      p2.types.forEach((type2) => {
        this.coeff.push(this.mockType.getEfficacite()[TypeEnum[type]][TypeEnum[type2]]);
      });
    });
    return this.coeff.reduce((a, c) => a * c);
  }

  async fullCombat() {
    this.compteur = 0;
    while (this.equipe.length > 0 && this.equipeAdv.length > 0) {
      await this.combat(this.equipe[0], this.equipeAdv[0]);
      this.removeKo();
    }
    if (this.equipe.length == 0) {
      this.winner = this.equipe;
    }
    if (this.equipeAdv.length == 0) {
      this.winner = this.equipeAdv;
    }
  }

  sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  removeKo() {
    this.equipe[0].hp > 0 ? this.equipeAdv.splice(0, 1) : this.equipe.splice(0, 1);
  }

  isFirst(p1: Pokemon, p2: Pokemon): boolean {
    return p1.speed > p2.speed;
  }

  progress(pokemon: Pokemon): string {
    const max = this.pokemonService.getPokemon(pokemon.id).hpMax;
    return Math.floor(pokemon.hp / max * 100) + "%";
  }

  detailPokemon(pokemon: Pokemon) {
    console.log("details du pokémon " + pokemon.name);
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

  color(pokemon: Pokemon): string {
    const currentHp = pokemon.hp / this.pokemonService.getPokemon(pokemon.id).hpMax * 2 - 1;
    if (this.blank && pokemon == this.defenseur) {
      return "rgb(172,236,230)";
    } else {
      if (currentHp > 0)
        return "rgb(" + (240 - 240 * currentHp) + "," + (120 + 60 * currentHp) + "," + (0 + 90 * currentHp) + ")";
      else
        return "rgb(" + (240 + 40 * currentHp) + "," + (120 + 120 * currentHp) + "," + (0 + 0 * currentHp) + ")";
    }
  }

  async blink(n: number) {
    for (var i = 0; i < n; i++) {
      this.blank = true;
      await this.sleep(50);
      this.blank = false;
      await this.sleep(50);
    }
  }

}
