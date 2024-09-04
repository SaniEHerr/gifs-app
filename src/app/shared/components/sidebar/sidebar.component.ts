import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  // El servicio que creamos tenemos que "inyectarlo" siempre en el constructor para ya poder usarlo en el componente
  constructor( private GifsService: GifsService ) {}

  get tags(): string[] {
    return this.GifsService.tagsHistory;
  }

  searchTag(tag: string): void {
    this.GifsService.searchTag(tag)
  }
}
