import { Component, OnInit } from '@angular/core';
import { Chart, LinearScale, registerables } from 'chart.js';
import { Estilistas } from 'src/models/estilista';
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
  reservacionesHoy: string[] = [];



  ngOnInit(): void {
    this.createChart();
  }


  constructor(private estilistaService: EstilistaService, private reservacionesService: ReservacionService) {

    this.estilistaService.getEstilistas().subscribe(data => {
      this.listEstilista = data;
      data.forEach((element: Estilistas) => {
        this.nombreEstilista.push(element.nombre + ' ' + element.apellidos);
      });
    })


    this.reservacionesService.reservacionesHoy().subscribe(data => {
      this.reservacionesHoy = data;
      console.log(data);
    })

  }

  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.nombreEstilista,
        datasets: [
          {
            label: "Reservaciones",
            data: ['10', '6'],
            backgroundColor: '#bbdefb'

          }

        ]
      },
      options: {
        aspectRatio: 3.5,


      }

    });
  }

}
