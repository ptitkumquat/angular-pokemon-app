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
  private blinkColor: string = "";
  private defenseur: Pokemon;
  private indexP1: number = null;

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
    this.compteur = 5;
    this.pokemonEquipeService.createRandomEquip(4);
    this.pokemonEquipeAdvService.createRandomEquip(6);
  }

  rerollPokemon(pokemon: Pokemon, event: any) {
    event.stopPropagation();
    this.pokemonEquipeService.removePokemon(pokemon);
    this.pokemonEquipeService.generatePokemon();
    this.compteur -= 2;
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

    if (Math.random() > 0.1) {
      if (Math.random() > 0.9) {
        await this.blink(15, 25, "red");
        defenseur.hp -= attaquant.cp * this.getCoeffType(attaquant, defenseur) / (1 + defenseur.def / 25) * 2;
      } else {
        await this.blink(5, 50, "rgb(172,236,230)");
        defenseur.hp -= attaquant.cp * this.getCoeffType(attaquant, defenseur) / (1 + defenseur.def / 25);
      }
    } else {
      await this.blink(1, 250, "black");
    }

    if (defenseur.hp < 0)
      defenseur.hp = 0;
      
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
      return this.blinkColor;
    } else {
      if (currentHp > 0)
        return "rgb(" + (240 - 240 * currentHp) + "," + (120 + 60 * currentHp) + "," + (0 + 90 * currentHp) + ")";
      else
        return "rgb(" + (240 + 40 * currentHp) + "," + (120 + 120 * currentHp) + "," + (0 + 0 * currentHp) + ")";
    }
  }

  async blink(n: number, blinkTime: number, color: string) {
    this.blinkColor = color;
    for (var i = 0; i < n; i++) {
      this.blank = true;
      await this.sleep(blinkTime);
      this.blank = false;
      await this.sleep(blinkTime);
    }
  }

  changeOrder(p: Pokemon) {
    if(this.indexP1 === null){
       this.indexP1 = this.equipe.findIndex((pokemon) => pokemon.id === p.id);
    }
    else{
      let indexP2 = this.equipe.findIndex((pokemon) => pokemon.id === p.id);
      if(this.indexP1 !== indexP2){
        [this.equipe[this.indexP1], this.equipe[indexP2]] = [this.equipe[indexP2], this.equipe[this.indexP1]];
        this.compteur -= 1;
      }
      this.indexP1 = null;
    }
    
  }
 

  evolvePokemon(pokemon: Pokemon){
    let index = this.equipe.findIndex((pk)=> pk === pokemon);
    this.equipe[index] = this.pokemonService.getPokemon(this.validateId(pokemon.id));
      this.compteur -= 3;
  }

  validateId(id: number):number{
    return id+1 >151 ? 1 : id +1; 
  }

}
