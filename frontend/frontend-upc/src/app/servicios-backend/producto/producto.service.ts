import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Producto } from 'src/app/entidades/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  PATH_BACKEND = "http://localhost:" + "5163"


  URL_GET = this.PATH_BACKEND + "/api/Producto/GetAllProducto";
  URL_GETBYID = this.PATH_BACKEND + "/api/Producto/GetProductoById";
  URL_ADD = this.PATH_BACKEND + "/api/Producto/AddProducto";
  URL_UPDATE = this.PATH_BACKEND + "/api/Producto/UpdateProducto";
  URL_DELETE = this.PATH_BACKEND + "/api/Producto/DeleteProducto";

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

  public Add(entidad: Producto): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_ADD, entidad,
        { observe: 'response' })
      .pipe();
  }

  public Update(entidad: Producto): Observable<HttpResponse<any>> {
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
