import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
// Implemento el OnInit, que es parte del ciclo de vida de los componentes de Angular, que basicamente se ejecuta cuando el componente se esta inicializando o mejor dicho se ha inicializado
export class GifsCardComponent implements OnInit {

  // @Input()
  // Podria poner el !, diciendole que siempre va a tener un valor, pero esta vez voy a usar el ciclo de vida del componente de Angular
  // public gif!: Gif;

  @Input()
  // Entonces hago una validacion, en donde valido que tenga que venir el elemento gif si o si, y si no vieene, mando un error
  public gif!: Gif;

  // Validacion de que siempre wa a tener que proporcionar el gif, ya que si no existe, manda error
  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif property is required');
  }

}
