import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  // Inyectamos el service de GifsService para mandarselo a gifs-card-list y asi poder mostrar los Gifs
  constructor( private GifsService: GifsService ) {}

  // Hacemos un Getter para obtener de GifsService para obtener gifList
  // Ahora teniendo esta propiedad gifs en mi HomePage, voy a poder usarla en el html, pero antes tenemos que decirle al gifs-card-list que va a recibir informacion del padre que es HomePage
  // <gifs-card-list [gifs]="gifs"></gifs-card-list>. Este "gifs" es el segundo.
  get gifs(): Gif[] {
    return this.GifsService.gifList;
  }

}
