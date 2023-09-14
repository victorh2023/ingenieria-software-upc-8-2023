import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { IonicStorageModule } from '@ionic/storage-angular';
import {Drivers} from '@ionic/storage';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ROUTES, RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

/*   bootstrapApplication(AppComponent,{
    providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
      importProvidersFrom(IonicModule.forRoot({})),

      importProvidersFrom(IonicStorageModule.forRoot({
        name: 'testdb',
        driverOrder: [Drivers.IndexedDB]
      })
      ),
      
      
    ],
  }); */
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));