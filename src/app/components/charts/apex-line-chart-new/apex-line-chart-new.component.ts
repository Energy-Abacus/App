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
import { GetWattSumDto } from 'src/app/models/measurement/get-watt-sum-dto';

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
  selector: 'app-apex-line-chart-new',
  templateUrl: './apex-line-chart-new.component.html',
  styleUrls: ['./apex-line-chart-new.component.css'],
})
export class ApexLineChartNewComponent implements OnInit, AfterViewInit {

  constructor(private measurementService: MeasurementsService) {}

  ngAfterViewInit(): void {
    this.chart.autoUpdateSeries = true;
  }

  @ViewChild('apxchart', { static: false }) chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  measurements: GetWattSumDto[] = [];
  // @Input() data: number[][] = [];
  @Input() firstColor = '';
  @Input() secondColor = '';
  @Input() _height: any;

  dataWatt: number[][] = [];

  ngOnInit(){
    console.log('ngOnInit called');
    this.fromDate = this.addHours(this.toDate, -24);
    this.initGraph();
  }

  toDate = new Date('2024/02/03 00:00:00');
  fromDate: Date;

  initGraph() {
    console.log('initGraph called');
    /*this.measurementService.getMeasurements(10, new Date(this.fromDate), new Date(this.toDate)).subscribe(
      (data) => {
        this.measurements = data;
        console.log(this.measurements);

        this.measurements.forEach(m => {
          this.dataWatt.push([new Date(m.timeStamp).getTime(), (Math.round((m.wattPower + Number.EPSILON) * 100) / 100)]);
        });
        console.log('datawatt'+this.dataWatt)
      }
    );*/

    this.measurementService.getWattSum(new Date(this.fromDate), new Date(this.toDate)).subscribe(
      (data) => {
        this.measurements = data;
        this.dataWatt = [];
        data.forEach(m => {
          this.dataWatt.push([new Date(m.time).getTime(), (Math.round((m.wattPowerSum + Number.EPSILON) * 100) / 100)]);
        });
        // console.log('datawatt'+this.dataWatt)

        this.chart.updateSeries(
          [
            {
              name: this.infoText(this.firstColor),
              data: this.dataWatt,
              color: this.firstColor
            }
          ]
        );
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
