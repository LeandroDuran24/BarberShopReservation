import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/models/usuario';
import { Observable, ObservedValueOf } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  myAppUrl = '';
  myApiUrl = '';

  constructor(private http: HttpClient) {


    this.myAppUrl = 'https://localhost:7005';
    this.myApiUrl = '/api/Usuario/';

  }


  setLocalStorage(user: string): void {
    localStorage.setItem('token', (user));
  }

  getNombreUsuario(): string {
    return localStorage.getItem('token') as string;
  }

  removeNombreUsuario(): void {

    localStorage.removeItem('token');
  }

  getTokenDecoded(): any {

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token') as string);
    return decodedToken;

  }




  guardarUsuario(usuario: Usuario): Observable<any> {

    return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
  }


  getListUsuarios(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  eliminarUsuario(idUsuario: number): Observable<any> {

    return this.http.delete(this.myAppUrl + this.myApiUrl + idUsuario);
  }

  editarUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl, usuario);
  }

  cambiarPassword(usuario: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + 'cambiarPassword', usuario);
  }

  getUsuario(idUsuario: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + idUsuario);
  }

}
