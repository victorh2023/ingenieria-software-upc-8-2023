import { Component, OnInit } from '@angular/core';
import { DetallePedido } from '../entidades/detalle-pedido';
import { Pedido } from '../entidades/pedido';
import { PedidoService } from '../servicios-backend/pedido/pedido.service';
import { HttpResponse } from '@angular/common/http';
import { DetallePedidoService } from '../servicios-backend/detalle-pedido/detalle-pedido.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page {
  public id = 1;
  public idUsuario = 1;
  public fechaPedido = new Date();


  public idPedido = 0;
  public idProducto = 0;
  public idProveedor= 0;
  public cantidad= 0;


  public listaPedido: Pedido[] = [];
  public listaDetalle: DetallePedido[] = [];
  public pedido: Pedido | null = null;
  public detalle: DetallePedido | null = null;


  constructor(private pedidoService: PedidoService,private detalleService: DetallePedidoService,) {

    this.getPedidoFromBackend();
    this.getDetalleFromBackend();
  }

  private getPedidoFromBackend(){
    this.pedidoService.GetAll().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listaPedido = response.body;
            console.log(this.listaPedido)
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            //console.log('complete - this.getPedido()');
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
            //console.log('complete - this.getPedido()');
        },
    });
  }

  public addPedido(){
    this.AddPedidoFromBackend( this.idUsuario,this.fechaPedido )
  }
  
   private AddPedidoFromBackend(idUsuario: number, fechaPedido: Date, ){

    var pedidoEntidad = new Pedido();
    pedidoEntidad.idUsuario = idUsuario;    
    pedidoEntidad.fechaPedido = fechaPedido;

    this.pedidoService.Add(pedidoEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
          console.log(response.body)//1
          if(response.body == 1){
              alert("Se agrego el PEDIDO con exito :)");
              this.getPedidoFromBackend();//Se actualize el listado
              this.fechaPedido = new Date();;
              this.idUsuario = 1;
          }else{
              alert("Al agregar al PEDIDO fallo exito :(");
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

  public addDetallePedido(){
    this.AddDetalleFromBackend(this.idPedido, this.idProducto , this.idProveedor, this.cantidad )
  }

  private AddDetalleFromBackend( idPedido: number , idProducto: number, idProveedor: number, cantidad: number,){

    var detalleEntidad = new DetallePedido();
    detalleEntidad.idPedido = idPedido;
    detalleEntidad.idProducto = idProducto;
    detalleEntidad.idProveedor = idProducto;
    detalleEntidad.cantidad = cantidad;

  this.detalleService.Add(detalleEntidad).subscribe({
    next: (response: HttpResponse<any>) => {
        console.log(response.body)//1
        if(response.body == 1){
            alert("Se agrego el DETALLE DE PEDIDO con exito :)");
            this.getDetalleFromBackend();//Se actualize el listado
            this.idPedido = 0;
            this.idProducto=0;
            this.idProveedor = 0;
            this.cantidad = 0;
        }else{
            alert("Al agregar al DETALLE DE PEDIDO fallo :(");
        }
    },
    error: (error: any) => {
        console.log(error);
    },
    complete: () => {
        //console.log('complete - this.AdddETALLE()');
    },
  });
  }

  public updatePedido(id: number, idUsuario: number, fechaPedido: Date){
    this.updatePedidoFromBackend(id, idUsuario, fechaPedido);
   }
  
   private updatePedidoFromBackend(id: number, idUsuario: number, fechaPedido: Date){
    var pedidoEntidad = new Pedido();
    pedidoEntidad.id = id;
    pedidoEntidad.idUsuario = idUsuario;
    pedidoEntidad.fechaPedido = fechaPedido; 

    this.pedidoService.Update(pedidoEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
          console.log(response.body)//1
          if(response.body == 1){
              alert("Se Actualizó el PEDIDO con exito :)");
              this.getPedidoFromBackend();//Se actualize el listado
              this.id = 0;
              this.idUsuario = 0;
              this.fechaPedido = new Date();
          }else{
              alert("Al agregar al PEDIDO fallo exito :(");
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

  // Metodo public Eliminar pedido por ID
  public deletePedido(id: number) {
    this.deletePedidoFromBackend(id);
  }

  // Eliminar Pedido por ID
  private deletePedidoFromBackend(id: number) {
    this.pedidoService.Delete(id).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body == 1) {
          alert("Se eliminó el Pedido con éxito :)");
          this.getPedidoFromBackend(); // Se actualiza el listado
        } else {
          alert("Al eliminar el Pedido falló :(");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.deletePedido()');
      },
    });

  }

  public updateDetalle( idPedido: number, idProducto: number, idProveedor: number, cantidad: number){
    this.updateDetalleFromBackend(idPedido, idProducto, idProveedor, cantidad);
   }
  
   private updateDetalleFromBackend(idPedido: number, idProducto: number, idProveedor: number, cantidad: number){
    var detalleEntidad = new DetallePedido();
    detalleEntidad.idPedido = idPedido;
    detalleEntidad.idProducto = idProducto; 
    detalleEntidad.idProveedor = idProveedor; 
    detalleEntidad.cantidad = cantidad;

    this.detalleService.Update(detalleEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
          console.log(response.body)//1
          if(response.body == 1){
              alert("Se Actualizó el Detalle de Pedido con exito :)");
              this.getDetalleFromBackend();//Se actualize el listado
              this.idPedido = 1;
              this.idProducto = 1;
              this.idProveedor = 1;
              this.cantidad = 5;

          }else{
              alert("Al agregar al Detalle Pedido fallo exito :(");
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

  // Metodo public Eliminar Detalle por ID
  public deleteDetalle(idPedido: number,idProducto: number) {
    this.deleteDetalleFromBackend(idPedido, idProducto);
  }

  // Eliminar Detalle por ID
  private deleteDetalleFromBackend(idPedido: number, idProducto: number,) {
    this.detalleService.Delete(idPedido, idProducto).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body == 1) {
          alert("Se eliminó el Detalle con éxito :)");
          this.getDetalleFromBackend(); // Se actualiza el listado
        } else {
          alert("Al eliminar el Detalle falló :(");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.deleteDetalle()');
      },
    });

  }

  public  getPedidoById(id: number){
    this.getPedidoByIDFromBackend(id);
  }

  private getPedidoByIDFromBackend(id: number) {
    this.pedidoService.GetById(id).subscribe({
      next: (response: HttpResponse<any>) => {
        // Asignar el proveedor obtenido a la propiedad proveedor
        this.pedido = response.body;
        console.log(this.pedido)
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

  public  getDetalleById(idPedido: number,idProducto: number){
    this.getDetalleByIDFromBackend(idPedido, idProducto);
  }

  private getDetalleByIDFromBackend(idPedido: number,idProducto: number) {
    this.detalleService.GetById(idPedido, idProducto).subscribe({
      next: (response: HttpResponse<any>) => {
        // Asignar el proveedor obtenido a la propiedad proveedor
        this.detalle = response.body;
        console.log(this.detalle)
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




}

