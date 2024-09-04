import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '2xoPZEPdErbcnPlvlqqtmHwxKhNRFp9n'
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  // Almacena todo lo que el user va buscando.
  // Lo pongo privado para evitar errores en caso de una mutacion directa fuera de mi servicio
  private _tagsHistory: string[] = [];
  // Almaceno la lista de Gifs
  public gifList: Gif[] = [];

  // Llamada http dentro del constructor
  constructor( private http: HttpClient ) {
    // Cuando mi servicio sea inyectado la primera vez, voy a llamar a mi funcion loadLocalStorage():
    this.loadLocalStorage();
  }

  // Expongo lo que yo quiero
  get tagsHistory() {
    return [...this._tagsHistory]
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();


    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);

    // Aca guardo en el LocalStoarage cuando yo se que mi _tagHistory fue modificado por ultima vez.
    // De esta forma ya tenemos grabada nuestro informacion en el localStorage por mas que nosotros hayamos hecho un refresh a la pagina- A continuacion tendriamos que hacer algo para cargar el localStorage
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    // Tengo que serializar el "this._tagsHistory", ya que como segundo argumento se me pide un string, y "this._tagsHistory" es un array de strings. Entonces aplicamos un JSON.stringify para serializarlo, o sea convertir el objeto a un string.
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(): void {
    // Nuestra constante nos devuelve algo, que puede ser un string o null, lo cual esta bien porque si nosotros entramos por primera vez en la pagina, no vamos a tener nada en el localStorage por lo que ese valor va a ser null.
    // const temporal = localStorage.getItem('history')

    // Primero vamos a verificar si tenemos ese objeto en el localStorage.

    // Si no tengo data, no hacemos nada
    if (!localStorage.getItem('history')) return;

    // Pero si tenemos data, quiero hacer lo siguiente:
    // Antes tenemos que hacer lo opuesto a la serializacion, o sea convertir mi string en un objeto.
    // Null operator para decir que siempre va a venir una data
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)

    // Estas 2 lineas de codigo son para mostrar los Gifs de la ultima busqueda del historial al hacer un refresh de mi pagina web, sin estas lineas de codigo cuando hago refresb en mi app no me mostraria ningun Gif.
    // Primero veo si el el length de _tagsHistory es igual a 0, si se cumple no devulvo nada ya que puede ser que no haya nada en el historial de nuestro user
    if (this._tagsHistory.length === 0) return;
    // Entonces, si el length es mayor a 0 o sea que si hay algo se cumple la siguiente linea de codigo; llamamos a searchTag, que recibe como argumento a "this._tagsHistory[0]", que seria nuestra ultimo item en el historial, o sea nuestro ultima busqueda. Al pasarle ese valor como argumento, se hace una busqueda a partir de ese ultimo item en nuestro historial, por ende cuando hacemos un refresh de la pagina, ahora siempre vamos a tener el fetch de nuestra ultima busqueda del historial.
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag( tag: string ): void {
    if (tag.length === 0) return;

    this.organizeHistory(tag);
    // this._tagsHistory.unshift( tag )
    // console.log(this.tagsHistory);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    // "SearchResponse" es el tipo de dato que tiene la peticion, porque nosotros de antemano ya sabemos que tipos de datos va a tener esta peticion, por ende se hace aca el tipado de dato y no en la respuesta
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
    // this.http.get('https://api.giphy.com/v1/gifs/search?api_key=2xoPZEPdErbcnPlvlqqtmHwxKhNRFp9n&q=valorant&limit=10')
      .subscribe( resp => {
        this.gifList = resp.data;
        console.log({ gifs: this.gifList });
      })
  }
}
