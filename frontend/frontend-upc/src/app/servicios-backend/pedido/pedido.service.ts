import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pedido } from 'src/app/entidades/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  PATH_BACKEND = "http://localhost:" + "5163"

  URL_GET = this.PATH_BACKEND + "/api/Pedido/GetAllPedido";
  URL_GETBYID = this.PATH_BACKEND + "/api/Pedido/GetPedidoById";
  URL_ADD = this.PATH_BACKEND + "/api/Pedido/AddPedido";
  URL_UPDATE = this.PATH_BACKEND + "/api/Pedido/UpdatePedido";
  URL_DELETE = this.PATH_BACKEND + "/api/Pedido/DeletePedido";

  constructor(private httpClient: HttpClient) {
  }

  public GetAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.URL_GET,
        { observe: 'response' })
      .pipe();
  }

  public  GetById(id: number): Observable<HttpResponse<any>> {
    const url = `${this.URL_GETBYID}?id=${id}`;
    return this.httpClient
      .get<any>(url,
        { observe: 'response' })
      .pipe();
  }

  public Add(entidad: Pedido): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_ADD, entidad,
        { observe: 'response' })
      .pipe();
  }
  public Update(entidad: Pedido): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.URL_UPDATE, entidad,
        { observe: 'response' })
      .pipe();
  }

  public Delete(id: number): Observable<HttpResponse<any>> {
    const url = `${this.URL_DELETE}?id=${id}`;
    return this.httpClient
      .delete<any>(url,
        { observe: 'response' })
      .pipe();
  }

 

}
