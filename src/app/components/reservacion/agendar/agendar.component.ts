import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { each } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';
import { EstilistaService } from 'src/app/services/estilista.service';
import { ReservacionService } from 'src/app/services/reservacion.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { Clientes } from 'src/models/cliente';
import { Estilistas } from 'src/models/estilista';
import { Reservacion } from 'src/models/reservacion';
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



  listaServiciosSeleccionado: Servicios[] = [];

  selectedServicios: Servicios[] = [];

  agendarReservacion: FormGroup;
  selectedDate: Date = new Date();


  constructor(private estilistaService: EstilistaService, private clienteService: ClienteService, private servicioService: ServicioService, private toastr: ToastrService, private fb: FormBuilder, private reservacionService: ReservacionService) {

    this.agendarReservacion = fb.group({
      fecha: [''],
      hora: ['', Validators.required],
      estilista: ['', Validators.required],
      cliente: ['', Validators.required],
      servicios: ['']
    })

  }

  ngOnInit(): void {
    this.estilistaService.getEstilistas().subscribe(data => {
      this.listEstilistas = data;

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

  onSelect(evt: any) {
    this.selectedDate = new Date(evt.year, evt.month - 1, evt.day);
    console.log(this.selectedDate.toISOString());
  }


  changeValueServicios(val: Servicios) {


    this.listaServiciosSeleccionado.push(val)
    console.log(this.listaServiciosSeleccionado);
  }


  reset(): any {

    this.agendarReservacion.reset();
  }

  guardarReservacion(): any {

    var tamañoLista = this.listaServiciosSeleccionado.length;
    console.log(this.listaServiciosSeleccionado[tamañoLista - 1]);


    const reservacion: Reservacion = {

      id: 0,
      estilistaId: this.agendarReservacion.value.estilista,
      clienteId: this.agendarReservacion.value.cliente,
      fecha: this.selectedDate,
      hora: this.agendarReservacion.value.hora,
      listReservacionDetalle: this.listaServiciosSeleccionado[tamañoLista - 1],

    }





    this.reservacionService.guardarReservacion(reservacion).subscribe(data => {

      this.toastr.success('Se ha registrado su Reservacion', 'Registro Exitoso!');
      this.reset();
    }, error => {
      console.log(error.error)
      this.toastr.error(error.error, 'Error!');
    })

  }

}
