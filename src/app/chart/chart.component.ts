import { Component, OnInit } from '@angular/core';
import { Chart, LinearScale, registerables } from 'chart.js';
import { Estilistas } from 'src/models/estilista';
import { Reservacion } from 'src/models/reservacion';
import { ClienteService } from '../services/cliente.service';
import { EstilistaService } from '../services/estilista.service';
import { ReservacionService } from '../services/reservacion.service';
import { ServicioService } from '../services/servicio.service';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public chart: any;
  listEstilista = {};
  nombreEstilista: string[] = [];
  reservacionesHoy: any[] = [];
  estilistaReservacionesHoy: {} = {};
  cantidadCitasEstilistas: number[] = [];


  constructor(private estilistaService: EstilistaService, private reservacionesService: ReservacionService) {

    this.estilistaService.getEstilistas().subscribe(data => {
      this.listEstilista = data;
      data.forEach((element: Estilistas) => {
        this.nombreEstilista.push(element.nombre + ' ' + element.apellidos);
      });
    })

  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {

    this.reservacionesService.reservacionesHoy().subscribe(data => {
      //Recorrera la lista de estilista y comparara por cada estilista las reservaciones.
      this.nombreEstilista.forEach((nameEstilista: any) => {

        let cantidad = 0;
        data.forEach((reservacion: any, index: number) => {

          if (nameEstilista == (reservacion.estilista.nombre + ' ' + reservacion.estilista.apellidos)) {
            ++cantidad;
          }
        });
        this.estilistaReservacionesHoy = { Nombre: nameEstilista, Cantidad: cantidad }
        this.reservacionesHoy.push((this.estilistaReservacionesHoy));
      })

      this.reservacionesHoy.forEach(element => {
        this.cantidadCitasEstilistas.push(element.Cantidad)
      });

      this.chart = new Chart("MyChart", {
        type: 'bar', //this denotes tha type of chart

        data: {// values on X-Axis
          labels: this.nombreEstilista,
          datasets: [
            {
              label: "Reservaciones",
              data: this.cantidadCitasEstilistas,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          aspectRatio: 2.5,
        }

      });

    })
  }

}
