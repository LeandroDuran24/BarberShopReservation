import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InicioSesionComponent } from './components/usuario/inicio-sesion/inicio-sesion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrarUsuarioComponent } from './components/usuario/registrar-usuario/registrar-usuario.component';

//modulos
import { DataTablesModule } from "angular-datatables";
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { ConsultaUsuarioComponent } from './components/usuario/consulta-usuario/consulta-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    InicioComponent,
    NavbarComponent,
    RegistrarUsuarioComponent,
    LoadingComponent,
    ConsultaUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, RouterModule, BrowserAnimationsModule, NgbModule, NgbPaginationModule, NgbAlertModule,
     DataTablesModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
