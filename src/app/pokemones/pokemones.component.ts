import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemones',
  templateUrl: './pokemones.component.html',
  styleUrls: ['./pokemones.component.css']
})
export class PokemonesComponent {
private url =`https://pokeapi.co/api/v2/pokemon-form`
  pokemones:any[]=[]
  public page!:number;
  filtrado:string='';
  categoria:string = ''
  loading:boolean=false;
  PokemonCantidad:number=0;
  opciones: string[] = ["All", "normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];


constructor(private http:HttpClient){
this.getData().subscribe(e=>{
e.forEach((element:any)=> {
this.pokemones.push(element)
  
});
this.loading =true;
});


}

  applyTransformations() {
  let transformedData = this.pokemones;
      transformedData = transformedData.filter(item => item.name.toLowerCase().includes(this.filtrado.toLowerCase()));
if(this.categoria != 'All'){

      transformedData=transformedData.filter(item => item.types.some((e: { type: { name: string,url:string }; }) => e.type.name.toLowerCase().includes(this.categoria.toLowerCase())));
}

this.PokemonCantidad = transformedData.length;

    return transformedData;
  }

public getData():Observable<any>{
const datos:Observable<any>[] = [];

for (let index = 1; index < 1011; index++) {
 datos.push(this.http.get<any>(this.url+'/'+index));
}  

return forkJoin(datos);
}

}
