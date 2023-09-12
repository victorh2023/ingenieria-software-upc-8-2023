import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DetallePedido } from 'src/app/entidades/detalle-pedido';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {


  PATH_BACKEND = "http://localhost:" + "5163"

  URL_GET = this.PATH_BACKEND + "/api/DetallePedido/GetAllDetallePedido";
  URL_GETBYID = this.PATH_BACKEND + "/api/DetallePedido/GetDetallePedidoById";
  URL_ADD = this.PATH_BACKEND + "/api/DetallePedido/AddDetallePedido";
  URL_UPDATE = this.PATH_BACKEND + "/api/DetallePedido/UpdateDetallePedido";
  URL_DELETE = this.PATH_BACKEND + "/api/DetallePedido/DeleteDetallePedido";

  constructor(private httpClient: HttpClient) {
  }

  public GetAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.URL_GET,
        { observe: 'response' })
      .pipe();
  }

  public  GetById(id_pedido: number,id_producto: number): Observable<HttpResponse<any>> {
    const url = `${this.URL_GETBYID}?id_pedido=${id_pedido}&id_producto=${id_producto}`;
    return this.httpClient
      .get<any>(url,
        { observe: 'response' })
      .pipe();
  }

  public Add(entidad: DetallePedido): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_ADD, entidad,
        { observe: 'response' })
      .pipe();
  }
  public Update(entidad: DetallePedido): Observable<HttpResponse<any>> {
    return this.httpClient
      .put<any>(this.URL_UPDATE, entidad,
        { observe: 'response' })
      .pipe();
  }

  public Delete(idPedido: number,idProducto: number): Observable<HttpResponse<any>> {
    const url = `${this.URL_DELETE}?id_pedido=${idPedido}&id_producto=${idProducto}`;
    return this.httpClient
      .delete<any>(url,
        { observe: 'response' })
      .pipe();
  }

}
