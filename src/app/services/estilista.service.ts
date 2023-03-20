import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estilistas } from 'src/models/estilista';

@Injectable({
  providedIn: 'root'
})
export class EstilistaService {


  myAppUrl = '';
  myApiUrl = '';

  constructor(private http: HttpClient) {
    this.myAppUrl = 'https://localhost:7005';
    this.myApiUrl = '/api/Estilista/';

  }

  guardarEstilista(estilista: Estilistas): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, estilista);
  }

  editarEstilista(estilista: Estilistas): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl, estilista);
  }

  getEstilistas(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  getEstilista(idEstilista: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + idEstilista);
  }

  eliminarEstilista(idEstilista: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + idEstilista);
  }

}
