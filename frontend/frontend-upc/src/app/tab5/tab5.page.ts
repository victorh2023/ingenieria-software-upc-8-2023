import { Component} from '@angular/core';
import { Proveedor } from '../entidades/proveedor';
import { ProveedorService } from '../servicios-backend/proveedor/proveedor.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page  {

  public id = 0;  
  public razonSocial = "";       
  public nit = "";    
  public direccion = "";   
  public nombreProveedor = "";   
  public telefono = ""; 
  public email = ""; 

  public listaProveedor: Proveedor[] = [];
  public proveedor: Proveedor | null = null;
  

  constructor(private proveedorService: ProveedorService) {


  }


  public  getAll(){
    this.getProveedorFromBackend();
  }
  private getProveedorFromBackend(){
    this.proveedorService.GetAll().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listaProveedor = response.body;
            console.log(this.listaProveedor)
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            //console.log('complete - this.getProveedor()');
        },
    });
  }

 public  getById(id_prov: number){
    this.getByIDFromBackend(id_prov);
  }

  private getByIDFromBackend(id: number) {
    this.proveedorService.GetById(id).subscribe({
      next: (response: HttpResponse<any>) => {
        // Asignar el proveedor obtenido a la propiedad proveedor
        this.proveedor = response.body;
        console.log(this.proveedor)
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

  public addProveedor(){
    this.AddProveedorFromBackend(this.razonSocial, this.nit, this.direccion, this.nombreProveedor, this.telefono, this.email)
   }
  
   private AddProveedorFromBackend(razonSocial: string, nit: string, direccion: string, nombreProveedor: string, telefono: string, email: string){
    var proveedorEntidad = new Proveedor();
    proveedorEntidad.razonSocial = razonSocial;
    proveedorEntidad.nit = nit;
    proveedorEntidad.direccion = direccion;
    proveedorEntidad.nombreProveedor = nombreProveedor;
    proveedorEntidad.telefono = telefono;
    proveedorEntidad.email = email;

    this.proveedorService.Add(proveedorEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
          console.log(response.body)//1
          if(response.body == 1){
              alert("Se agrego el PROVEEDOR con exito :)");
              this.getProveedorFromBackend();//Se actualize el listado
              this.razonSocial = "";
              this.nit = "";
              this.direccion = "";
              this.nombreProveedor = "";
              this.telefono = "";
              this.email = "";
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
  
  public updateProveedor(id: number,razonSocial :string, nit:string, direccion:string, nombreProveedor:string, telefono:string, email:string){
    this.updateProveedorFromBackend(id, razonSocial, nit, direccion, nombreProveedor, telefono, email)
   }
  
   private updateProveedorFromBackend(id: number, razonSocial: string, nit: string, direccion: string, nombreProveedor: string, telefono: string, email: string){
    var proveedorEntidad = new Proveedor();
    proveedorEntidad.id = id;
    proveedorEntidad.razonSocial = razonSocial;
    proveedorEntidad.nit = nit;
    proveedorEntidad.direccion = direccion;
    proveedorEntidad.nombreProveedor = nombreProveedor;
    proveedorEntidad.telefono = telefono;
    proveedorEntidad.email = email;

    this.proveedorService.Update(proveedorEntidad).subscribe({
      next: (response: HttpResponse<any>) => {
          console.log(response.body)//1
          if(response.body == 1){
              alert("Se Actualizó el PROVEEDOR con exito :)");
              this.getProveedorFromBackend();//Se actualize el listado
              this.razonSocial = "";
              this.nit = "";
              this.direccion = "";
              this.nombreProveedor = "";
              this.telefono = "";
              this.email = "";
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

  // Metodo public Eliminar proveedor por ID
  public deleteProveedor(id: number) {
    this.deleteProveedorFromBackend(id);
  }

  // Eliminar proveedor por ID
  private deleteProveedorFromBackend(id: number) {
    this.proveedorService.Delete(id).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.body == 1) {
          alert("Se eliminó el PROVEEDOR con éxito :)");
          this.getProveedorFromBackend(); // Se actualiza el listado
        } else {
          alert("Al eliminar el PROVEEDOR falló :(");
        }
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        //console.log('complete - this.deleteProveedor()');
      },
    });

  }

}
