import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { EquipeService } from '../services/equipe.service';
import { TypesService } from '../services/types.service';
import { Pokemon } from '../shared/model/pokemon';

@Component({
  selector: 'app-pokemon-rush',
  templateUrl: './pokemon-rush.component.html',
  styleUrls: ['./pokemon-rush.component.css']
})
export class PokemonRushComponent implements OnInit {

  private pokemonUnique : Pokemon;
  private equipeAdvInf : Pokemon[];

  constructor(
    private router: Router,
    private pokemonService : PokemonService,
    private equipeAdvService : EquipeService,
    private mockType : TypesService
  ) { }

  ngOnInit() {
  }


}
