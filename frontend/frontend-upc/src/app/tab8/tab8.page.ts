import { Component } from '@angular/core';
import { Funcionalidades } from '../entidades/funcionalidades';
import { RolesUsuarios } from '../entidades/roles-usuarios';
import { FuncionalidadService } from '../servicios-backend/funcionalidades/funcionalidades.service';
import { RolUsuarioService } from '../servicios-backend/roles-usuarios/roles-usuarios.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab8',
  templateUrl: 'tab8.page.html',
  styleUrls: ['tab8.page.scss']
})
export class Tab8Page {

  // Propiedades para Funcionalidades
  public funcionalidadId = 0;
  public funcionalidadNombre = "";
  public funcionalidadDescripcion = "";

  public listaFuncionalidades: Funcionalidades[] = [];
  public funcionalidad: Funcionalidades | null = null;

  // Propiedades para Roles Usuarios
  public rolUsuarioId = 0;
  public rolUsuarioNombre = "";
  public rolUsuarioDescripcion = "";

  public listaRolesUsuarios: RolesUsuarios[] = [];
  public rolUsuario: RolesUsuarios | null = null;

  constructor(
    private funcionalidadService: FuncionalidadService,
    private rolUsuarioService: RolUsuarioService
  ) {
    this.getFuncionalidadesFromBackend();
    this.getRolesUsuariosFromBackend();
  }

  // Métodos para Funcionalidades

  private getFuncionalidadesFromBackend() {
    this.funcionalidadService.GetAll().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaFuncionalidades = response.body;
        console.log(this.listaFuncionalidades);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.getFuncionalidadesFromBackend()');
      },
    });
  }

  public mostrarFuncionalidades() {
    // Llama a la función de obtener Funcionalidades
    this.getFuncionalidadesFromBackend();
  }

  public getFuncionalidadById() {
    this.getFuncionalidadByIdFromBackend(this.funcionalidadId);
  }

  private getFuncionalidadByIdFromBackend(id: number) {
    this.funcionalidadService.GetById(id).subscribe({
      next: (response: HttpResponse<any>) => {
        this.funcionalidad = response.body;
        console.log(this.funcionalidad);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.getFuncionalidadByIdFromBackend()');
      },
    });
  }

  public agregarFuncionalidad() {
    this.addFuncionalidadToBackend(this.funcionalidadNombre, this.funcionalidadDescripcion);
  }

  private addFuncionalidadToBackend(nombre: string, descripcion: string) {
    const funcionalidadEntidad = new Funcionalidades();
    funcionalidadEntidad.nombre = nombre;
    funcionalidadEntidad.descripcion = descripcion;

    this.funcionalidadService.Add(funcionalidadEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body === 1) {
          alert("Se agregó la Funcionalidad con éxito :)");
          this.getFuncionalidadesFromBackend(); // Se actualiza el listado
          this.funcionalidadNombre = "";
          this.funcionalidadDescripcion = "";
        } else {
          alert("Al agregar la Funcionalidad falló :(");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.addFuncionalidad()');
      },
    });
  }

  public editarFuncionalidad() {
    this.updateFuncionalidadInBackend(this.funcionalidadId, this.funcionalidadNombre, this.funcionalidadDescripcion);
  }

  private updateFuncionalidadInBackend(id: number, nombre: string, descripcion: string) {
    const funcionalidadEntidad = new Funcionalidades();
    funcionalidadEntidad.id = id;
    funcionalidadEntidad.nombre = nombre;
    funcionalidadEntidad.descripcion = descripcion;

    this.funcionalidadService.Update(funcionalidadEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body === 1) {
          alert("Se actualizó la Funcionalidad con éxito :)");
          this.getFuncionalidadesFromBackend(); // Se actualiza el listado
          this.funcionalidadId = 0;
          this.funcionalidadNombre = "";
          this.funcionalidadDescripcion = "";
        } else {
          alert("Al actualizar la Funcionalidad falló :(");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.updateFuncionalidad()');
      },
    });
  }

  public eliminarFuncionalidad() {
    this.deleteFuncionalidadFromBackend(this.funcionalidadId);
  }

  private deleteFuncionalidadFromBackend(id: number) {
    this.funcionalidadService.Delete(id).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body === 1) {
          alert("Se eliminó la Funcionalidad con éxito :)");
          this.getFuncionalidadesFromBackend(); // Se actualiza el listado
          this.funcionalidadId = 0;
        } else {
          alert("Al eliminar la Funcionalidad falló :(");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.deleteFuncionalidad()');
      },
    });
  }

  // Métodos para Roles Usuarios

  private getRolesUsuariosFromBackend() {
    this.rolUsuarioService.GetAll().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaRolesUsuarios = response.body;
        console.log(this.listaRolesUsuarios);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.getRolesUsuariosFromBackend()');
      },
    });
  }

  public mostrarRolesUsuario() {
    // Llama a la función de obtener Roles de Usuario
    this.getRolesUsuariosFromBackend();
  }

  public getRolUsuarioById() {
    this.getRolUsuarioByIdFromBackend(this.rolUsuarioId);
  }

  private getRolUsuarioByIdFromBackend(id: number) {
    this.rolUsuarioService.GetById(id).subscribe({
      next: (response: HttpResponse<any>) => {
        this.rolUsuario = response.body;
        console.log(this.rolUsuario);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.getRolUsuarioByIdFromBackend()');
      },
    });
  }

  public agregarRolUsuario() {
    this.addRolUsuarioToBackend(this.rolUsuarioNombre, this.rolUsuarioDescripcion);
  }

  private addRolUsuarioToBackend(nombre: string, descripcion: string) {
    const rolUsuarioEntidad = new RolesUsuarios();
    rolUsuarioEntidad.nombrE_ROL = nombre;
    rolUsuarioEntidad.descripcion = descripcion;

    this.rolUsuarioService.Add(rolUsuarioEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body === 1) {
          alert("Se agregó el Rol Usuario con éxito :)");
          this.getRolesUsuariosFromBackend(); // Se actualiza el listado
          this.rolUsuarioNombre = "";
          this.rolUsuarioDescripcion = "";
        } else {
          alert("Al agregar el Rol Usuario falló :(");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.addRolUsuario()');
      },
    });
  }

  public editarRolUsuario() {
    this.updateRolUsuarioInBackend(this.rolUsuarioId, this.rolUsuarioNombre, this.rolUsuarioDescripcion);
  }

  private updateRolUsuarioInBackend(id: number, nombre: string, descripcion: string) {
    const rolUsuarioEntidad = new RolesUsuarios();
    rolUsuarioEntidad.id = id;
    rolUsuarioEntidad.nombrE_ROL = nombre;
    rolUsuarioEntidad.descripcion = descripcion;

    this.rolUsuarioService.Update(rolUsuarioEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body === 1) {
          alert("Se actualizó el Rol Usuario con éxito :)");
          this.getRolesUsuariosFromBackend(); // Se actualiza el listado
          this.rolUsuarioId = 0;
          this.rolUsuarioNombre = "";
          this.rolUsuarioDescripcion = "";
        } else {
          alert("Al actualizar el Rol Usuario falló :(");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.updateRolUsuario()');
      },
    });
  }

  public eliminarRolUsuario() {
    this.deleteRolUsuarioFromBackend(this.rolUsuarioId);
  }

  private deleteRolUsuarioFromBackend(id: number) {
    this.rolUsuarioService.Delete(id).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body === 1) {
          alert("Se eliminó el Rol Usuario con éxito :)");
          this.getRolesUsuariosFromBackend(); // Se actualiza el listado
          this.rolUsuarioId = 0;
        } else {
          alert("Al eliminar el Rol Usuario falló :(");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.deleteRolUsuario()');
      },
    });
  }
}