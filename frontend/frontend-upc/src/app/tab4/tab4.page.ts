import { Component, OnInit } from '@angular/core';
import { CarritoCompra } from '../entidades/carrito-compra';
import { DetalleCarrito } from '../entidades/detalle-carrito';
import { CarritoCompraService } from '../servicios-backend/carrito-compra/carrito-compra.service';
import { HttpResponse } from '@angular/common/http';
import { DetalleCarritoService } from '../servicios-backend/detalle-carrito/detalle-carrito.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  public fecha = new Date();
  public idUsuario = 1;

  public cantidad = 1;
  public idProducto = 1;
  public idCarritoCompra= 1;


  public listaCarrito: CarritoCompra[] = []
  public listaDetalle: DetalleCarrito[] = []

  constructor(private carritoService: CarritoCompraService,private detalleService: DetalleCarritoService,) {

    this.getCarritoFromBackend();
    this.getDetalleFromBackend();
  }

  private getCarritoFromBackend(){
    this.carritoService.GetAll().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listaCarrito = response.body;
            console.log(this.listaCarrito)
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            //console.log('complete - this.getCarrito()');
        },
    });
  }

  private getDetalleFromBackend(){
    this.detalleService.GetAll().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listaDetalle = response.body;
            console.log(this.listaDetalle)
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            //console.log('complete - this.getCarrito()');
        },
    });
  }

  public addCarrito(){
    this.AddCarritoFromBackend(this.fecha , this.idUsuario)
  }
  
   private AddCarritoFromBackend(fecha: Date, idUsuario: number){

    var carritoEntidad = new CarritoCompra();
    carritoEntidad.fecha = fecha;
    carritoEntidad.idUsuario = idUsuario;

    this.carritoService.Add(carritoEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
          console.log(response.body)//1
          if(response.body == 1){
              alert("Se agrego el CARRITO con exito :)");
              this.getCarritoFromBackend();//Se actualize el listado
              this.fecha = new Date();
              this.idUsuario = 1;
          }else{
              alert("Al agregar al CARRITO fallo exito :(");
          }
      },
      error: (error: any) => {
          console.log(error);
      },
      complete: () => {
          //console.log('complete - this.Add()');
      },
    });
  }

  public addDetalleCarrito(){
    this.AddDetalleFromBackend(this.cantidad, this.idProducto , this.idCarritoCompra)
  }
  private AddDetalleFromBackend(cantidad: number, idProducto: number , idCarritoCompra: number){

    var detalleEntidad = new DetalleCarrito();
    detalleEntidad.cantidad = cantidad;
    detalleEntidad.idProducto = idProducto;
    detalleEntidad.idCarritoCompra = idCarritoCompra;

  this.detalleService.Add(detalleEntidad).subscribe({
    next: (response: HttpResponse<any>) => {
        console.log(response.body)//1
        if(response.body == 1){
            alert("Se agrego el USUARIO con exito :)");
            this.getDetalleFromBackend();//Se actualize el listado
            this.cantidad = 1;
            this.idProducto=1;
            this.idCarritoCompra = 1;
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
