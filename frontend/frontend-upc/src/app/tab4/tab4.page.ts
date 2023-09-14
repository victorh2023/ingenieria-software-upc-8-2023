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

  //Carrito de Compra
  public id = 0;
  public fecha = new Date();
  public idUsuario = 0;

  public listaCarrito: CarritoCompra[] = []
  public carritoCompra: CarritoCompra | null = null;

  // Detalle de Carrito
  public idDetalle = 1;
  public cantidad = 0;
  public idProducto = 0;
  public idCarritoCompra= 0;

  public listaDetalle: DetalleCarrito[] = []
  public detalleCarrito: DetalleCarrito | null = null;

  constructor(private carritoService: CarritoCompraService,private detalleService: DetalleCarritoService,) {

    this.getCarritoFromBackend();
    this.getDetalleFromBackend();
  }

  // Metodos para Carrito de Compra

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
//Obtener Carrito de Compras por ID
public  getCarritoById(){
  this.getCarritoByIDFromBackend(this.id);
}
private getCarritoByIDFromBackend(id: number) {
  this.carritoService.GetById(id).subscribe({
      next: (response: HttpResponse<any>) => {
          // Asignar el Carrito obtenido a la propiedad carrito
          this.carritoCompra = response.body;
          console.log(this.carritoCompra)
          // console.log(response.body);
      },
      error: (error: any) => {
          console.log(error);
      },
      complete: () => {
          //console.log('complete - this.getByIDFromBackend()');
      },
  });
}

// Agregar Carrito de compras
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

  // Actualizar Carrito de Compra
  public updateCarrito(id: number, fecha: Date, idUsuario: number){
      this.updateCarritoFromBackend(id, fecha, idUsuario)
  }    
  private updateCarritoFromBackend(id: number, fecha: Date, idUsuario: number){
      var carritoEntidad = new CarritoCompra();
      carritoEntidad.id=id;
      carritoEntidad.fecha = fecha;
      carritoEntidad.idUsuario = idUsuario;

      this.carritoService.Update(carritoEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
          console.log(response.body)//1
          if(response.body == 1){
              alert("Se Actualizó el Carrito con exito :)");
              this.getCarritoFromBackend();//Se actualize el listado
              this.id = 0;
              this.fecha = new Date();
              this.idUsuario = 0;
          }else{
              alert("Error Al actualizar al Carrito:(");
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


  // Metodos para Detalle de Carrito

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

  //Obtener Detalle Carrito de Compras por ID
  public  getDetalleById(){
    this.getDetalleByIDFromBackend(this.idDetalle);
  }
  private getDetalleByIDFromBackend(idDetalle: number) {
    this.detalleService.GetById(idDetalle).subscribe({
        next: (response: HttpResponse<any>) => {
            // Asignar el Carrito obtenido a la propiedad carrito
            this.detalleCarrito = response.body;
            console.log(this.detalleCarrito)
            // console.log(response.body);
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            //console.log('complete - this.getByIDFromBackend()');
        },
    });
  }

  //Agregar Detalle de Carrito
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
          this.cantidad = 0;
          this.idProducto= 0;
          this.idCarritoCompra = 0;
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

  // Actualizar Carrito de Compra
  public updateDetalle(cantidad: number, idProducto: number , idCarritoCompra: number){
    this.updateDetalleFromBackend(cantidad, idProducto , idCarritoCompra)
  }    
  private updateDetalleFromBackend(cantidad: number, idProducto: number , idCarritoCompra: number){
    var detalleEntidad = new DetalleCarrito();
    detalleEntidad.cantidad = cantidad;
    detalleEntidad.idProducto = idProducto;
    detalleEntidad.idCarritoCompra = idCarritoCompra;

    this.detalleService.Update(detalleEntidad).subscribe({
    next: (response: HttpResponse<any>) => {
        console.log(response.body)//1
        if(response.body == 1){
            alert("Se Actualizó el Detalle de Carrito con exito :)");
            this.getDetalleFromBackend();//Se actualize el listado
            this.cantidad = 0;
            this.idProducto= 0;
            this.idCarritoCompra = 0;
        }else{
            alert("Error Al actualizar el Detalle de Carrito:(");
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
