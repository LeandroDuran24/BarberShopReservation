import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './components/usuario/inicio-sesion/inicio-sesion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistrarUsuarioComponent } from './components/usuario/registrar-usuario/registrar-usuario.component';
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
import { ConsultaReservacionComponent } from './components/reservacion/consulta-reservacion/consulta-reservacion.component';
import { DashComponent } from './components/inicio/dash/dash.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: InicioSesionComponent },
  {
    path: 'inicio', component: InicioComponent, children: [
      { path: '', component: DashComponent },
    ]
  },
  {
    path: 'usuario', component: UsuarioComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'mantenimientoUsuario', component: RegistrarUsuarioComponent },
      { path: 'consultaUsuarios', component: ConsultaUsuarioComponent },
      { path: 'cambiarPassword', component: CambiarPasswordComponent },
      { path: 'editarUsuario/:id', component: EditarUsuarioComponent },

    ]
  },
  {
    path: 'cliente', component: ClienteComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'mantenimientoCliente', component: RegistrarClienteComponent },
      { path: 'consultaClientes', component: ConsultaClienteComponent },
      { path: 'editarCliente/:id', component: EditarClienteComponent },

    ]
  },
  {
    path: 'estilista', component: EstilistaComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'mantenimientoEstilista', component: RegistrarEstilistaComponent },
      { path: 'consultaEstilistas', component: ConsultaEstilistaComponent },
      { path: 'editarEstilista/:id', component: EditarEstilistaComponent },

    ]
  },

  {
    path: 'servicio', component: ServicioComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'mantenimientoServicio', component: RegistroServicioComponent },
      { path: 'consultaServicios', component: ConsultaServicioComponent },
      { path: 'editarServicio/:id', component: EditarServicioComponent },

    ]
  },
  {
    path: 'reservacion', component: ReservacionComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'agendar', component: AgendarComponent },
      { path: 'consultaReservaciones', component: ConsultaReservacionComponent },
      { path: 'editarServicio/:id', component: EditarServicioComponent },

    ]
  },

  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
