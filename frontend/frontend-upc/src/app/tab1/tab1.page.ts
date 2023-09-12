import { Component } from '@angular/core';
import { Usuarios } from '../entidades/usuarios';
import { UsuariosService } from '../servicios-backend/usuarios/usuarios.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public nombreCompleto = ""
  public userName = ""
  public password = ""

  public listaUsuarios: Usuarios[] = []

  constructor(private usuariosService: UsuariosService) {

   /* let usuario: Usuarios = new Usuarios();
    usuario.nombreCompleto = "Eddy Escalante"
    usuario.userName = "eescalante"
    usuario.password = "2023"

    this.listaUsuarios.push(usuario)
    this.listaUsuarios.push(usuario)*/

    this.getUsuariosFromBackend();
  }

  private getUsuariosFromBackend(){
    this.usuariosService.GetUsuarios().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listaUsuarios = response.body;
            console.log(this.listaUsuarios)
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            //console.log('complete - this.getUsuarios()');
        },
    });
  }

  public addUsuario(){
    this.AddUsuarioFromBackend(this.nombreCompleto, this.userName, this.password)
   }
  
   private AddUsuarioFromBackend(nombreCompleto: string, userName: string, password: string){

    var usuarioEntidad = new Usuarios();
    usuarioEntidad.nombreCompleto = nombreCompleto;
    usuarioEntidad.userName = userName;
    usuarioEntidad.password = password;

    this.usuariosService.AddUsuario(usuarioEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
          console.log(response.body)//1
          if(response.body == 1){
              alert("Se agrego el USUARIO con exito :)");
              this.getUsuariosFromBackend();//Se actualize el listado
              this.nombreCompleto = "";
              this.userName = "";
              this.password = "";
          }else{
              alert("Al agregar al USUARIO fallo exito :(");
          }
      },
      error: (error: any) => {
          console.log(error);
      },
      complete: () => {
          //console.log('complete - this.AddUsuario()');
      },
  });
  }

}
