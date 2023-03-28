import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';
import { EstilistaService } from 'src/app/services/estilista.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { Clientes } from 'src/models/cliente';
import { Estilistas } from 'src/models/estilista';
import { Servicios } from 'src/models/servicio';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent implements OnInit {


  listEstilistas: Estilistas[] = [];
  listClientes: Clientes[] = [];
  listServicios: Servicios[] = [];




  selectedCar: any;

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  constructor(private estilistaService: EstilistaService, private clienteService: ClienteService, private servicioService: ServicioService, private toastr: ToastrService, private fb: FormBuilder) {



  }

  ngOnInit(): void {
    this.estilistaService.getEstilistas().subscribe(data => {
      this.listEstilistas = data;
      console.log(this.listEstilistas[0].email);

    }, error => {
      this.toastr.error(error.error, 'Error!');
    });

    this.clienteService.getClientes().subscribe(data => {
      this.listClientes = data;

    }, error => {
      this.toastr.error(error.error, 'Error!');
    })


    this.servicioService.getServicios().subscribe(data => {
      this.listServicios = data;

    }, error => {
      this.toastr.error(error.error, 'Error!');
    })


  }


}
