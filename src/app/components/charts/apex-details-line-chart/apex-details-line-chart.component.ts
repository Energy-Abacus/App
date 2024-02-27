import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnInit, ViewChild } from '@angular/core';

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
import { MeasurementsService } from 'src/app/services/measurements.service';

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
  markers: ApexMarkers;
};

@Component({
  selector: 'app-apex-details-line-chart',
  templateUrl: './apex-details-line-chart.component.html',
  styleUrls: ['./apex-details-line-chart.component.css'],
})
export class ApexDetailsLineChartComponent implements OnInit{

  constructor(private measurementService: MeasurementsService) {}

  @ViewChild('apxchart', { static: false }) chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  measurements: Measurement[] = [];
  @Input() firstColor = '';
  @Input() secondColor = '';
  @Input() _height: any;
  @Input() plugId: number = 0;

  dataWatt: number[][] = [];

  ngOnInit(){
    console.log('ngOnInit called');
    this.fromDate = this.addHours(this.toDate, -24);
    this.initGraph();
  }

  toDate = new Date('2024/02/03 00:00:00');
  fromDate: Date;

  initGraph() {
    this.measurementService.getMeasurements(this.plugId, this.fromDate, this.toDate).subscribe(
      (data) => {
        this.measurements = data;

        this.measurements.forEach(m => {
          this.dataWatt.push([new Date(m.timeStamp).getTime(), (Math.round(( + Number.EPSILON) * 100) / 100)]);
        });
      }
    );

    this.chartOptions = {
      series: [
        {
          name: this.infoText(this.firstColor),
          data: this.dataWatt,
          color: this.firstColor
        }
      ],
      chart: {
        toolbar: {
          show: false
        },
        type: "area",
        width: 350,
        height: this._height
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
          format: 'HH:mm',
          show: false
        }
      },
      yaxis: {
        opposite: true,
        labels:{
          show: true,
          formatter: function (value: number) {
            return value.toFixed(0);
          }
        }
      },
      tooltip: {
        // theme: false, 
        enabled: true,
        style:{
          // color: '#000000'
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
        borderColor: "#31333C",
        show: true
      },
      fill: {
        type: "gradient",
        colors: [this.firstColor],
        gradient: { 
          shade: "light",
          type: "vertical",
          shadeIntensity: 0,
          opacityFrom: 1,
          opacityTo: 0,
        }
      },
      stroke: {
        width: 3,
      }
    };
  }

  addHours(date: Date, hours: number) {
    let newDate = new Date(date);
    newDate.setHours(date.getHours() + hours);
    return newDate;
  }

  arrowClicked(hours: number){
    this.fromDate = this.addHours(this.fromDate, hours);
    this.toDate = this.addHours(this.toDate, hours);

    this.initGraph();
  }

  getType(firstColor: string) {
    if (firstColor === '#A73D2A') {
      return "horizontal"
    }
    return "vertical"
  }
  
  infoText(firstColor: string){
    if(firstColor === '#A73D2A'){
      return "temperature"
    }
    return "watt"
  }
}
