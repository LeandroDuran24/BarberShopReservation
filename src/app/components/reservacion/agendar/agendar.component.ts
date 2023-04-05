import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { each } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { CalendarioReservacionService } from 'src/app/services/calendario-reservacion.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { EstilistaService } from 'src/app/services/estilista.service';
import { ReservacionService } from 'src/app/services/reservacion.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { Clientes } from 'src/models/cliente';
import { Estilistas } from 'src/models/estilista';
import { Reservacion } from 'src/models/reservacion';
import { ReservacionDetalle } from 'src/models/reservacionDetalle';
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
  listaCalendario: any[] = [];

  precioServicios: any[] = [];

  horarios = [
    { Hora: '08:00 A.M', valor: '8:00', Value: 8, Reservado: false },
    { Hora: '08:30 A.M', valor: '8:30', Value: 8.31, Reservado: false },
    { Hora: '09:00 A.M', valor: '9:00', Value: 9, Reservado: false },
    { Hora: '09:30 A.M', valor: '9:30', Value: 9.31, Reservado: false },
    { Hora: '10:00 A.M', valor: '10:00', Value: 10, Reservado: false },
    { Hora: '10:30 A.M', valor: '10:30', Value: 10.31, Reservado: false },
    { Hora: '11:00 A.M', valor: '11:00', Value: 11, Reservado: false },
    { Hora: '11:30 A.M', valor: '11:30', Value: 11.31, Reservado: false },
    { Hora: '12:00 A.M', valor: '12:00', Value: 12, Reservado: false },
    { Hora: '12:30 A.M', valor: '12:30', Value: 12.31, Reservado: false },
    { Hora: '01:00 P.M', valor: '1:00', Value: 13, Reservado: false },
    { Hora: '01:30 P.M', valor: '1:30', Value: 13.31, Reservado: false },
    { Hora: '02:00 P.M', valor: '2:00', Value: 14, Reservado: false },
    { Hora: '02:30 P.M', valor: '2:30', Value: 14.31, Reservado: false },
    { Hora: '03:00 P.M', valor: '3:00', Value: 15, Reservado: false },
    { Hora: '03:30 P.M', valor: '3:30', Value: 15.31, Reservado: false },
    { Hora: '04:00 P.M', valor: '4:00', Value: 16, Reservado: false },
  ]





  constructor(private estilistaService: EstilistaService, private calendarioService: CalendarioReservacionService, private clienteService: ClienteService, private servicioService: ServicioService, private toastr: ToastrService, private fb: FormBuilder, private reservacionService: ReservacionService) {

    this.agendarReservacion = fb.group({
      fecha: [''],
      hora: ['', Validators.required],
      estilista: ['', Validators.required],
      cliente: ['', Validators.required]
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
    //console.log(this.selectedDate.toLocaleDateString());
  }


  changeValueServicios(val: Servicios) {

    this.listaServiciosSeleccionado.push(val);
    this.precioServicios.push(val);

  }

  changeValueEstilista(idEstilista: Estilistas) {

    //vuelvo false 
    this.horarios.forEach(element => {

      element.Reservado = false;
    });

    this.calendarioService.getCalendarioReservacion(idEstilista.id, this.selectedDate.toISOString()).subscribe(data => {
      this.listaCalendario = data;

    }, error => {
      console.log(error.error.message)
      this.toastr.error(error.error, 'Error!');
    });



    //lo lleno depende de las reservas
    setTimeout(() => {

      var horaFinalConcatenada = 0.0;

      this.horarios.forEach((element: any) => {
        this.listaCalendario.forEach((calendario: any) => {
          horaFinalConcatenada = Number(calendario.horaFinal.split(':')[0] + '.' + calendario.horaFinal.split(':')[1])
          if (element.Value >= calendario.horaInicio.split(':')[0] && element.Value < horaFinalConcatenada) {
            element.Reservado = true;


          }
        })

      });

    }, 300);

  }


  reset(): any {

    this.agendarReservacion.reset();
    this.selectedServicios = [];
  }




  guardarReservacion(): any {

    var arrayService: ReservacionDetalle[] = [];
    var array = [];
    var minutosEstimado = 0;
    var horaEstimada = 0;

    this.selectedServicios.forEach((element) => {
      arrayService.push({ servicioId: Number(element) })
    });


    this.agendarReservacion.value.servicios = this.selectedServicios;

    array = this.precioServicios[this.precioServicios.length - 1];

    array.forEach((element: any) => {
      var [hours, minutes] = element.duracion.split(':');
      horaEstimada += Number(hours);
      minutosEstimado += Number(minutes);

    });

    const reservacion: Reservacion = {

      estilistaId: this.agendarReservacion.value.estilista,
      clienteId: this.agendarReservacion.value.cliente,
      fecha: this.selectedDate,
      hora: this.agendarReservacion.value.hora,
      tiempoEstimadoCita: horaEstimada + ":" + minutosEstimado,
      listReservacionDetalle: arrayService

    }




    this.reservacionService.guardarReservacion(reservacion).subscribe(data => {

      this.toastr.success('Se ha registrado su Reservacion', 'Registro Exitoso!');
      this.reset();
    }, error => {
      this.reset();
      this.toastr.error(error.error, 'Error!');
    })

  }

}
