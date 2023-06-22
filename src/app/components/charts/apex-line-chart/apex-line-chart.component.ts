import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MeasurementsService } from "../../../services/measurements.service";
import { Measurement } from "../../../models/measurement/measurement.model";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexTooltip,
} from "ng-apexcharts";
import * as ApexCharts from 'apexcharts';
import { Color } from 'chart.js';
import { first } from 'rxjs';

export type ChartOptions = {
  tooltip: ApexTooltip
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: any[];
  fill: ApexFill;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-apex-line-chart',
  templateUrl: './apex-line-chart.component.html',
  styleUrls: ['./apex-line-chart.component.css'],
})
export class ApexLineChartComponent implements OnInit {

  constructor(private measurementsService: MeasurementsService) {

  }

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  measurements: Measurement[] = [];
  @Input() data: number[][] = [];
  @Input() firstColor = '';
  @Input() secondColor = '';

  ngOnInit(): void {
    this.initGraph();
  }

  initGraph() {

    this.chartOptions = {
      series: [
        {
          data: this.data,
        }
      ],
      chart: {
        toolbar: {
          show: false
        },
        type: "area",
        height: "auto",
        width: 370
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime",
        tickAmount: 6,
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: true,
          color: '#31333C'
        },
        labels: {
          format: 'HH:mm'
        }
      },
      yaxis: {
        opposite: true,
        labels:{
          formatter: function (value: number) {
            return value.toFixed(0);
          }
        }
      },
      tooltip: {
        x:{
          
        }
      },
      grid:{
        borderColor: "#31333C"
      },
      fill: {
        type: "gradient",
        gradient: { 
          type: getType(this.firstColor),
          colorStops: [
            {
              offset: 0,
              color: this.firstColor,
              opacity: 0.8
            },
            { 
              offset: 100,
              color: this.secondColor,
              opacity: 0.8
            }
          ]
        }
      },
      stroke: {
        width: 2,
        fill: {
          type: "gradient",
        
          gradient: { 
            type: "horizontal",
            shadeIntensity: 0,
            opacityFrom: 1,
            opacityTo: 0.1,
            colorStops: [
              {
                offset: 0,
                color: this.firstColor,
                opacity: 1
              },
              { 
                offset: 100,
                color: this.secondColor,
                opacity: 1
              }
            ]
          }
        }
      }
    };
  }
}
function getType(firstColor: string) {
  if (firstColor === '#A73D2A') {
    return "horizontal"
  }
  return "vertical"
}

function infoText(firstColor: string){
  if(firstColor === '#A73D2A'){
    return "temperature"
  }
  return "watt"
}