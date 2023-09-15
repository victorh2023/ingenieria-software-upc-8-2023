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
  ) {}

  // Métodos para Funcionalidades

  public mostrarFuncionalidades() {
    this.cargarFuncionalidades();
  }

  public agregarFuncionalidad() {
    // Implementa la lógica para agregar una nueva funcionalidad aquí.
  }

  public guardarFuncionalidad() {
    if (this.funcionalidadId === 0) {
      this.agregarFuncionalidad();
    } else {
      this.editarFuncionalidadExistente();
    }
  }

  public editarFuncionalidad(funcionalidad: Funcionalidades) {
    this.funcionalidadId = funcionalidad.id;
    this.funcionalidadNombre = funcionalidad.nombre;
    this.funcionalidadDescripcion = funcionalidad.descripcion;
  }

  public eliminarFuncionalidad() {
    // Implementa la lógica para eliminar una funcionalidad aquí.
  }

  private cargarFuncionalidades() {
    this.funcionalidadService.GetAll().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaFuncionalidades = response.body;
        console.log(this.listaFuncionalidades);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  private editarFuncionalidadExistente() {
    // Implementa la lógica para editar una funcionalidad existente aquí.
  }

  // Métodos para Roles Usuarios

  public mostrarRolesUsuario() {
    this.cargarRolesUsuarios();
  }

  public agregarRolUsuario() {
    // Implementa la lógica para agregar un nuevo rol de usuario aquí.
  }

  public guardarRolUsuario() {
    if (this.rolUsuarioId === 0) {
      this.agregarRolUsuario();
    } else {
      this.editarRolUsuarioExistente();
    }
  }

  public editarRolUsuario(rolUsuario: RolesUsuarios) {
    this.rolUsuarioId = rolUsuario.id;
    this.rolUsuarioNombre = rolUsuario.nombrE_ROL;
    this.rolUsuarioDescripcion = rolUsuario.descripcion;
  }

  public eliminarRolUsuario() {
    // Implementa la lógica para eliminar un rol de usuario aquí.
  }

  private cargarRolesUsuarios() {
    this.rolUsuarioService.GetAll().subscribe({
      next: (response: HttpResponse<any>) => {
        this.listaRolesUsuarios = response.body;
        console.log(this.listaRolesUsuarios);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  private editarRolUsuarioExistente() {
    // Implementa la lógica para editar un rol de usuario existente aquí.
  }
}