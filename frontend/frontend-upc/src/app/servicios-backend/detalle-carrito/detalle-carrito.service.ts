import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DetalleCarrito } from 'src/app/entidades/detalle-carrito';

@Injectable({
  providedIn: 'root'
})
export class DetalleCarritoService {

  PATH_BACKEND = "http://localhost:" + "5163"

  URL_GET = this.PATH_BACKEND + "/api/DetalleCarrito/GetAllDetalleCarrito";
  URL_ADD_DETALLE= this.PATH_BACKEND + "/api/DetalleCarrito/AddDetalleCarrito";

  constructor(private httpClient: HttpClient) {
  }

  public GetAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.URL_GET,
        { observe: 'response' })
      .pipe();
  }

  public Add(entidad: DetalleCarrito): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_ADD_DETALLE, entidad,
        { observe: 'response' })
      .pipe();
  }
}
