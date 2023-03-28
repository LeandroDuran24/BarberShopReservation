import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert, NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NgbCarouselConfig],
})
export class NavbarComponent {

  isCollapsedMantenimiento = false;
  isCollapsedConsulta = false;

  /**
   *
   */
  constructor(private usuarioService: UsuarioService, private router: Router) {


  }

  logout(): void {

    this.usuarioService.removeNombreUsuario();
    this.router.navigate(['/login']);

  }


}
