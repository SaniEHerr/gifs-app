import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  // Marco al tagInput para que sea referencia directa del html, a traves del decorador @ViewChild, el cual recibe un argumento en donde yo utilizo el #txtTagInput para hacer referencia a ese input en especifico
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  // El servicio que creamos tenemos que "inyectarlo" siempre en el constructor para ya poder usarlo en el componente
  constructor( private GifsService: GifsService ) {}

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.GifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
