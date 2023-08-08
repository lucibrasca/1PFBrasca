import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import eslocale from '@angular/common/locales/es-AR'
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';


registerLocaleData(eslocale);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatMenuModule,
    HttpClientModule
 
  ],
  providers: [

    {

      provide: LOCALE_ID,

      useValue: 'es-AR'

    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
