import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservacion } from 'src/models/reservacion';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  myAppUrl = '';
  myApiUrl = '';


  constructor(private http: HttpClient) {
    this.myAppUrl = 'https://localhost:7005';
    this.myApiUrl = '/api/Reserva/';

  }

  guardarReservacion(reservacion: Reservacion): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, reservacion);
  }

  getReservaciones(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  getReservacionesServicios(id: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + "GetReservacionServicios/" + id);
  }
}
