import { Component } from '@angular/core';
import { Producto } from '../entidades/producto';
import { ProductoService } from '../servicios-backend/producto/producto.service';
import { HttpClient, HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

public nombre = ""
public idCategoria = 1;

public listaProducto: Producto[] = []

constructor(private productoService: ProductoService) {

  this.getProductoFromBackend();
}

private getProductoFromBackend(){
  this.productoService.GetAll().subscribe({
      next: (response: HttpResponse<any>) => {
          this.listaProducto = response.body;
          console.log(this.listaProducto)
      },
      error: (error: any) => {
          console.log(error);
      },
      complete: () => {
          //console.log('complete - this.getProducto()');
      },
  });
}

public addProducto(){
  this.AddProductoFromBackend(this.nombre, this.idCategoria)
 }

 private AddProductoFromBackend(nombre: string, idCategoria:number){

  var productoEntidad = new Producto();
  productoEntidad.nombre = nombre;
  productoEntidad.idCategoria = idCategoria;

  this.productoService.Add(productoEntidad).subscribe({
    next: (response: HttpResponse<any>) => {
        console.log(response.body)//1
        if(response.body == 1){
            alert("Se agrego el PRODUCTO con exito :)");
            this.getProductoFromBackend();//Se actualize el listado
            this.nombre = "";
            this.idCategoria=1;
        }else{
            alert("Al agregar al PRODUCTO fallo :(");
        }
    },
    error: (error: any) => {
        console.log(error);
    },
    complete: () => {
        //console.log('complete - this.PRODUCTO()');
    },
});
}

}
