import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { HomePageComponent } from './pages/home/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { GifsCardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    CardListComponent,
    GifsCardComponent
  ],
  imports: [
    CommonModule,
    // Si quiero utilizar todo lo que SharedModule nos ofrece, tengo que importarlo. Yo quiero usar su componente LazyImageComponent, por eso necesito importar el modulo que contiene ese componente, y ese modulo es SharedModule
    SharedModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class GifsModule { }
