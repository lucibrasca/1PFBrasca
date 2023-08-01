import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './dashboard/pages/courses/courses.module';
import eslocale from '@angular/common/locales/es-AR'
import { registerLocaleData } from '@angular/common';
import { UsersModule } from './dashboard/pages/users/users.module';
import { StudentsModule } from './dashboard/pages/students/students.module';


registerLocaleData(eslocale);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule,
    AuthModule,
    CoursesModule, 
    UsersModule,
    StudentsModule,
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
