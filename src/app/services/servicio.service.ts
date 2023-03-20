import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Servicios } from 'src/models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  myAppUrl = '';
  myApiUrl = '';

  constructor(private http: HttpClient) {


    this.myAppUrl = 'https://localhost:7005';
    this.myApiUrl = '/api/Servicio/';

  }

  guardarServicio(servicio: Servicios): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, servicio);

  }

  getServicios(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  getServicio(idServicio: number): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl + idServicio);
  }

  eliminarServicio(idServicio: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + idServicio);
  }

  editarServicio(servicio: Servicios): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl, servicio);
  }

}
