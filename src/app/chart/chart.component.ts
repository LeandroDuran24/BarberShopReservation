import { Component, OnInit } from '@angular/core';
import { Chart, LinearScale, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  public chart: any;



  ngOnInit(): void {
    this.createChart();
  }

  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Juan', 'Pedro', 'Maria', 'Jesus',
          'Mercedes'],
        datasets: [
          {
            label: "Reservaciones",
            data: ['17', '6', '21', '9', '2'],
            backgroundColor: '#00DDFF'

          }

        ]
      },
      options: {
        aspectRatio: 2.1
      }

    });
  }

}
