import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/models/usuario';
import { Observable, ObservedValueOf } from 'rxjs';

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

  getUsuario(idUsuario: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + idUsuario);
  }

}
