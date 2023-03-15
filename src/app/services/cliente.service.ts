import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from 'src/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  myAppUrl = '';
  myApiUrl = '';

  constructor(private http: HttpClient) {


    this.myAppUrl = 'https://localhost:7005';
    this.myApiUrl = '/api/Cliente';

  }



    guardarCliente(cliente: Clientes): Observable<any>
    {
      return this.http.post(this.myAppUrl + this.myApiUrl, cliente);

    }


    getClientes():Observable<any>
    {
      return this.http.get(this.myAppUrl+this.myApiUrl);
    }

    getCliente(idCliente:number):Observable<any>{

      return this.http.get(this.myAppUrl+this.myApiUrl+idCliente);
    }

    eliminarCliente(idCliente:number):Observable<any>
    {
      return this.http.delete(this.myAppUrl+this.myApiUrl+idCliente);
    }

    editarCliente(cliente:Clientes):Observable<any>
    {
      return this.http.put(this.myAppUrl+this.myApiUrl,cliente);
    }

  }

