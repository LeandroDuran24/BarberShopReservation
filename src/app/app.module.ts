import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { InicioSesionComponent } from './components/usuario/inicio-sesion/inicio-sesion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { ConsultaUsuarioComponent } from './components/usuario/consulta-usuario/consulta-usuario.component';
import { DashboardComponent } from './components/inicio/dashboard/dashboard.component';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario/usuario.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { RegistrarClienteComponent } from './components/cliente/registrar-cliente/registrar-cliente.component';
import { ConsultaClienteComponent } from './components/cliente/consulta-cliente/consulta-cliente.component';
import { EditarClienteComponent } from './components/cliente/editar-cliente/editar-cliente.component';
import { EstilistaComponent } from './components/estilista/estilista.component';
import { RegistrarEstilistaComponent } from './components/estilista/registrar-estilista/registrar-estilista.component';
import { ConsultaEstilistaComponent } from './components/estilista/consulta-estilista/consulta-estilista.component';
import { EditarEstilistaComponent } from './components/estilista/editar-estilista/editar-estilista.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { RegistroServicioComponent } from './components/servicio/registro-servicio/registro-servicio.component';
import { ConsultaServicioComponent } from './components/servicio/consulta-servicio/consulta-servicio.component';
import { EditarServicioComponent } from './components/servicio/editar-servicio/editar-servicio.component';
import { ReservacionComponent } from './components/reservacion/reservacion.component';
import { AgendarComponent } from './components/reservacion/agendar/agendar.component';
import { CambiarPasswordComponent } from './components/usuario/cambiar-password/cambiar-password.component';
import { RegistrarUsuarioComponent } from './components/usuario/registrar-usuario/registrar-usuario.component';

//modulos
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from "angular-datatables";
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgSelectModule } from '@ng-select/ng-select';




// NGX Multi Select
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


//interceptor
import { AddTokenInterceptorInterceptor } from './helper/add-token-interceptor.interceptor';
import { ConsultaReservacionComponent } from './components/reservacion/consulta-reservacion/consulta-reservacion.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    InicioComponent,
    NavbarComponent,
    RegistrarUsuarioComponent,
    LoadingComponent,
    ConsultaUsuarioComponent,
    DashboardComponent,
    EditarUsuarioComponent,
    UsuarioComponent,
    ClienteComponent,
    RegistrarClienteComponent,
    ConsultaClienteComponent,
    EditarClienteComponent,
    EstilistaComponent,
    RegistrarEstilistaComponent,
    ConsultaEstilistaComponent,
    EditarEstilistaComponent,
    ServicioComponent,
    RegistroServicioComponent,
    ConsultaServicioComponent,
    EditarServicioComponent,
    ReservacionComponent,
    AgendarComponent,
    CambiarPasswordComponent,
    ConsultaReservacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, RouterModule, BrowserAnimationsModule, NgbModule, NgbPaginationModule, NgbAlertModule,
    DataTablesModule,
    ToastrModule.forRoot(), // ToastrModule added
    JwtModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    NgSelectModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
