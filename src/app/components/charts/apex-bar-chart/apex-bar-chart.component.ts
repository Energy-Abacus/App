import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexYAxis,
  ApexPlotOptions,
  ApexGrid,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  yaxis: ApexYAxis;
};

@Component({
  selector: 'app-apex-bar-chart',
  templateUrl: './apex-bar-chart.component.html',
  styleUrls: ['./apex-bar-chart.component.css'],
})
export class ApexBarChartComponent{

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "basic",
          data: [400, 430, 0, 0]
        }
      ],
      chart: {
        type: "bar",
        height: 150,
        width: 250,
        toolbar:{
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        axisBorder: {
          show: false,
          color: '#31333C'
        },
        type: "datetime",
        tickAmount: 6,
        axisTicks: {
          show: false
        },
        color: "#31333C",
        labels:{
          show: false
        }
      },
      yaxis: {
        opposite: false,
        show: true,
        labels:{}
      },
      grid:{
        borderColor: "#31333C"
      }
    };
  }

}
