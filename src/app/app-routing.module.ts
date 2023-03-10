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

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: InicioSesionComponent },
  {
    path: 'inicio', component: InicioComponent, children: [
      { path: '', component: DashboardComponent },
    ]
  },
  {
    path: 'usuario', component: UsuarioComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'mantenimientoUsuario', component: RegistrarUsuarioComponent },
      { path: 'consultaUsuario', component: ConsultaUsuarioComponent },
      { path: 'editarUsuario/:id', component: EditarUsuarioComponent },

    ]
  },
  {
    path: 'cliente', component: ClienteComponent, children: [
      { path: '', component: InicioComponent },
      { path: 'mantenimientoCliente', component: RegistrarClienteComponent },
      { path: 'consultaCliente', component: ConsultaClienteComponent },
      { path: 'editarCliente/:id', component: EditarClienteComponent },

    ]
  },

  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
