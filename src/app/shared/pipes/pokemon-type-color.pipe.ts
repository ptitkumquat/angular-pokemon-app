import { Pipe, PipeTransform } from '@angular/core';


/*
* Affiche la couleur correspondant au type du pokémon.
* prend en argument le type du pokémon.
* exemple d'utilisation : 
*  {{ pokemon.type | pokemonTypeColor }}
*/

@Pipe({ name: 'pokemonTypeColor' })
export class PokemonTypeColorPipe implements PipeTransform {
    transform(type: string): string {

        let color: string;

        switch(type) {
            case 'Feu':
                color = '#FF4422';
                break;
            case 'Eau':
                color = '#3399FF';
                break;
            case 'Plante':
                color = '#77CC55';
                break;
            case 'Insecte':
                color = '#AABB22';
                break;
            case 'Normal':
                color = '#BBBBAA';
                break;
            case 'Vol':
                color = '#6699FF';
                break;
            case 'Poison':
                color = '#AA5599';
                break;
            case 'Fée':
                color = '#FFAAFF';
                break;
            case 'Psy':
                color = '#FF5599';
                break;
            case 'Electrik':
                color = '#FFCC33';
                break;
            case 'Combat':
                color = '#BB5544';
                break;
            case 'Sol':
                color = '#BBBB55';
                break;
            case 'Acier':
                color = '#AAAABB';
                break;
            case 'Roche':
                color = '#BBAA66';
                break;
            case 'Glace':
                color= '#77DDFF';
                break;
            case 'Spectre':
                color='#6666BB';
                break;
            case 'Dragon':
                color='#7766DD';
                break;
            case 'Tenebres':
                color='#775544';
                break;
            default:
                color = 'grey';
                break;
        }

        return color;

    }
}
