import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../model/pokemon';


/*
* Affiche la couleur correspondant au type du pokémon.
* prend en argument le type du pokémon.
* exemple d'utilisation : 
*  {{ pokemon.type | pokemonTypeColor }}
*/

@Pipe({ name: 'pokemonHpBarPipe' })
export class PokemonHpBarPipe implements PipeTransform {
    transform(pokemon: Pokemon): number {

        return Math.floor(pokemon.hp/pokemon.hpMax *100);

    }
}
