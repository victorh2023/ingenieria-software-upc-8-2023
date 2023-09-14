import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private fontSizeKey = 'font-size';

  constructor(private storage: Storage) {}

  getFontSize() {
    return this.storage.get(this.fontSizeKey).then((fontSize) => fontSize || 16);
  }

  setFontSize(fontSize: number) {
    return this.storage.set(this.fontSizeKey, fontSize);
  }
}
