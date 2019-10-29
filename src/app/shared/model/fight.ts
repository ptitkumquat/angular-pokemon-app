import { Pokemon } from './pokemon';

export class Fight{
     equipe: Pokemon[]=[];
     equipeAdv: Pokemon[]=[];
     compteur: number=0;
     winner: Pokemon[]=[];
     coeff: number[] = [];
     pokemon: Pokemon;
     blank: boolean;
     blinkColor: string = "";
     defenseur: Pokemon;
     indexP1: number = null;

}