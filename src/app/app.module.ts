import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from 'src/service/login.service';
import { AuthGuardService } from 'src/shared/auth-guard-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorAuth } from 'src/shared/http-interceptor';
import { CommonModule } from '@angular/common';
import { EventosPageModule } from './dashboard/eventos/eventos.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule, 
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule,
    CommonModule,
    EventosPageModule
  ],
  providers: [LoginService, AuthGuardService, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorAuth, multi: true }, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
