import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.usuarioService.getNombreUsuario() == null) {
      this.router.navigate(['/inicio/login']);
    }

    return true;
  }


  /**
   *
   */
  constructor(private router: Router, private usuarioService: UsuarioService) {


  }


}
