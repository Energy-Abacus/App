import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

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
  legend: ApexLegend;
};

@Component({
  selector: 'app-apex-line-chart',
  templateUrl: './apex-line-chart.component.html',
  styleUrls: ['./apex-line-chart.component.css'],
})
export class ApexLineChartComponent implements OnInit, AfterViewInit {

  constructor(private measurementsService: MeasurementsService) {

  }
  ngAfterViewInit(): void {
    this.chart.autoUpdateSeries = true;
  }

  @ViewChild('apxchart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  measurements: Measurement[] = [];
  // @Input() data: number[][] = [];
  @Input() firstColor = '';
  @Input() secondColor = '';

  _data: number[][] = [];
  get data(): number[][] {
      return this._data;
  }
  @Input() set data(value: number[][]) {
      this._data = value;
      // this.chart.updateSeries(
      //   [
      //     {
      //       data: this._data,
      //       color: this.firstColor
      //     }
      //   ]
      // );
  }

  ngOnInit(): void {
    this.initGraph();
  }

  initGraph() {

    this.chartOptions = {
      series: [
        {
          data: this.data,
          color: this.firstColor
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
      legend:{
        itemMargin: {
          vertical: 5
        } 
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      xaxis: {
        tooltip:{
          enabled: false
        },
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
        theme: false, 
        enabled: true,
        style:{
          color: '#000000'
        },
        fillSeriesColor: true,
        marker:{
          show: false
        },
        x:{
          format: 'HH:mm'
        },
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
              opacity: 0.5
            },
            { 
              offset: 100,
              color: this.secondColor,
              opacity: 0.5
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

