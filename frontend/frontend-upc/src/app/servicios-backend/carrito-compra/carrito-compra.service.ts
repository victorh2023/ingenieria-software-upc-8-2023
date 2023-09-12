import { HttpClient,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CarritoCompra } from 'src/app/entidades/carrito-compra';

@Injectable({
  providedIn: 'root'
})
export class CarritoCompraService {

  PATH_BACKEND = "http://localhost:" + "5163"

  URL_GET = this.PATH_BACKEND + "/api/CarritoCompra/GetAllCarritoCompra";
  URL_ADD_CARRITO = this.PATH_BACKEND + "/api/CarritoCompra/AddCarritoCompra";

  constructor(private httpClient: HttpClient) {
  }

  public GetAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.URL_GET,
        { observe: 'response' })
      .pipe();
  }

  public Add(entidad: CarritoCompra): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_ADD_CARRITO, entidad,
        { observe: 'response' })
      .pipe();
  }

}
