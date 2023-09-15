import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RolesUsuarios } from 'src/app/entidades/roles-usuarios';

@Injectable({
  providedIn: 'root'
})
export class RolUsuarioService {

  PATH_BACKEND = "http://localhost:" + "5163"

  URL_GET_ALL = this.PATH_BACKEND + "/api/RolesUsuarios/GetAllRolesUsuarios";
  URL_GET_BY_ID = this.PATH_BACKEND + "/api/RolesUsuarios/GetRolUsuarioById";
  URL_ADD = this.PATH_BACKEND + "/api/RolesUsuarios/AddRolUsuario";
  URL_UPDATE = this.PATH_BACKEND + "/api/RolesUsuarios/UpdateRolUsuario";
  URL_DELETE = this.PATH_BACKEND + "/api/RolesUsuarios/DeleteRolUsuario";

  constructor(private httpClient: HttpClient) {
  }

  public GetAll(): Observable<HttpResponse<any>> {
    return this.httpClient
      .get<any>(this.URL_GET_ALL,
        { observe: 'response' })
      .pipe();
  }

  public GetById(id: number): Observable<HttpResponse<any>> {
    const url = `${this.URL_GET_BY_ID}?id=${id}`;
    return this.httpClient
      .get<any>(url,
        { observe: 'response' })
      .pipe();
  }

  public Add(entidad: RolesUsuarios): Observable<HttpResponse<any>> {
    return this.httpClient
      .post<any>(this.URL_ADD, entidad,
        { observe: 'response' })
      .pipe();
  }

  public Update(entidad: RolesUsuarios): Observable<HttpResponse<any>> {
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