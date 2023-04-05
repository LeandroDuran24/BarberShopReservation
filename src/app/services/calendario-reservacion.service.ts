import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarioReservacionService {

  myAppUrl = '';
  myApiUrl = '';

  constructor(private http: HttpClient) {


    this.myAppUrl = 'https://localhost:7005';
    this.myApiUrl = '/api/Calendario/';

  }

  getCalendarioReservacion(idEstilista: number, fechaReserva: any): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + idEstilista + "/" + fechaReserva);
  }


}
