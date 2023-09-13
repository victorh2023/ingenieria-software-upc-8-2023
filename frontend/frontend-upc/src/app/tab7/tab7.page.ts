import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../entidades/usuarios';
import { UsuariosService } from '../servicios-backend/usuarios/usuarios.service';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab7',
  templateUrl: 'tab7.page.html',
  styleUrls: ['tab7.page.scss']

})
export class Tab7Page {
/* fontSize: number = 16; // Tamaño de fuente predeterminado

  constructor(private storage: Storage) {}

  ionViewDidEnter() {
    // Obtener el tamaño de fuente personalizado del almacenamiento (si existe)
    this.storage.get('fontSize').then((value) => {
      if (value) {
        this.fontSize = value;
      }
    });
  }

  // Manejar cambios en el tamaño de fuente
  fontSizeChanged() {
    // Guardar el tamaño de fuente personalizado en el almacenamiento
    this.storage.set('fontSize', this.fontSize);
  } */


}
