import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {

  // Le decimos a gifs-card-list que va a recibir informacion del padre, esto se hace con el decorador @input, permitiendo ahora poder hacer lo siguiente en el html de Home page: <gifs-card-list [gifs]="gifs"></gifs-card-list> donde este "gifs" seria el atributo
  @Input()
  public gifs: Gif[] = [];
}
