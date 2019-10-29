import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../shared/model/pokemon';
import { FightService } from '../services/fight.service';
import { Fight } from '../shared/model/fight';

@Component({
  selector: 'app-pokemon-fight',
  templateUrl: './pokemon-fight.component.html',
  styleUrls: ['./pokemon-fight.component.css']
})
export class PokemonFightComponent implements OnInit {

  private fight : Fight;

  constructor(
    private pokemonFightService : FightService
  ) { }

  ngOnInit() {
    this.fight = this.pokemonFightService.createFight();
    this.beginFight();
  }

  beginFight() {
     this.fight = this.pokemonFightService.beginFight(this.fight);
  }

  rerollPokemon(pokemon: Pokemon, event: any) {
    this.pokemonFightService.rerollPokemon(this.fight, pokemon, event);
  }
 
  async combat(p1: Pokemon, p2: Pokemon) {
    this.pokemonFightService.combat(this.fight, p1, p2);
  }

  async attack(attaquant: Pokemon, defenseur: Pokemon) {
    this.pokemonFightService.attack(this.fight, attaquant, defenseur);
  }

  getCoeffType(p1: Pokemon, p2: Pokemon): number{
    return this.pokemonFightService.getCoeffType(this.fight, p1, p2);
  }

  async fullCombat() {
   this.pokemonFightService.fullCombat(this.fight);
  }

  sleep(milliseconds: number) {
    this.pokemonFightService.sleep(milliseconds);
  }

  removeKo() {
    this.pokemonFightService.removeKo(this.fight);
  }

  isFirst(p1: Pokemon, p2: Pokemon) : boolean{
    return this.pokemonFightService.isFirst(p1, p2);
  }

  progress(pokemon: Pokemon):string{
    return this.pokemonFightService.progress(this.fight, pokemon);
  }

  detailPokemon(pokemon: Pokemon) {
    this.pokemonFightService.detailPokemon(this.fight, pokemon);
  }

  color(pokemon: Pokemon):string{
    return this.pokemonFightService.color(this.fight, pokemon);
  }

  async blink(n: number, blinkTime: number, color: string) {
    this.pokemonFightService.blink(this.fight, n, blinkTime, color);
  }

  changeOrder(p: Pokemon) {
    this.pokemonFightService.changeOrder(this.fight, p);
  }
 

  evolvePokemon(pokemon: Pokemon){
   this.pokemonFightService.evolvePokemon(this.fight, pokemon);
  }

  validateId(id: number): number{
    return this.pokemonFightService.validateId(id);
  }

}
