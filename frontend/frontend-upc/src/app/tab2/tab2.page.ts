import { Component } from '@angular/core';
import { CategoriaProducto } from '../entidades/categoria-producto';
import { CategoriaProductoService } from '../servicios-backend/categoria-producto/categoria-producto.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public nombre = ""

  public listaCategoria: CategoriaProducto[] = []

  constructor(private categoriaProductoService: CategoriaProductoService) {

    this.getCategoriaFromBackend();
  }

  private getCategoriaFromBackend(){
    this.categoriaProductoService.GetAll().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listaCategoria = response.body;
            console.log(this.listaCategoria)
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            //console.log('complete - this.getCategoria()');
        },
    });
  }

  public addCategoria(){
    this.AddUsuarioFromBackend(this.nombre)
   }
  
   private AddUsuarioFromBackend(nombre: string){

    var categoriaEntidad = new CategoriaProducto();
    categoriaEntidad.nombre = nombre;

    this.categoriaProductoService.Add(categoriaEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
          console.log(response.body)//1
          if(response.body == 1){
              alert("Se agrego el CATEGORIA con exito :)");
              this.getCategoriaFromBackend();//Se actualize el listado
              this.nombre = "";
          }else{
              alert("Al agregar al CATEGORIA fallo :(");
          }
      },
      error: (error: any) => {
          console.log(error);
      },
      complete: () => {
          //console.log('complete - this.addCategoria()');
      },
  });
  }
}
