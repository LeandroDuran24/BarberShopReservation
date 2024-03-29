import { Component } from '@angular/core';
import { count } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReservacionService } from 'src/app/services/reservacion.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  totalClientes: number = 0;
  totalReservaciones: number = 0;
  totalServicios: number = 0;
  constructor(private clienteService: ClienteService, private serviciosService: ServicioService, private reservaService: ReservacionService) {

    this.clienteService.getClientes().subscribe(data => {
      this.totalClientes = (data).length;

    });

    this.serviciosService.getServicios().subscribe(data => {
      this.totalServicios = data.length;
    })

    this.reservaService.getReservaciones().subscribe(data => {

      const fechaHoy = Date.now();
      const hoy = new Date(fechaHoy);

      data.forEach((element: any) => {
        var fecha = new Date(element.fecha);

        if (fecha.toLocaleDateString() == hoy.toLocaleDateString()) {
          this.totalReservaciones += 1;
        }

      });

      if (data.fecha == Date.now) {
        this.totalReservaciones += 1;
      }

    })

  }



}
