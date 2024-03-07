import { Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import { Measurement } from 'src/app/models/measurement/measurement.model';
import { MeasurementsService } from 'src/app/services/measurements.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  legend: ApexLegend;
  yaxis: ApexYAxis;
  fill: ApexFill;
  toolTip: ApexTooltip
};

@Component({
  selector: 'app-apex-spline-chart',
  templateUrl: './apex-spline-chart.component.html',
  styleUrls: ['./apex-spline-chart.component.css'],
})
export class ApexSplineChartComponent implements OnInit{

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  dataWattFirst: number[][] = [];
  dataWattSecond: number[][] = [];
  avgWattFirst: number;
  avgWattSecond: number;
  @Input() firstColor: string = '';
  @Input() secondColor: string = '';
  @Input() firstPlug_Id: number;
  @Input() secondPlug_Id: number;
  @Input() firstPlugName: string = "";
  @Input() secondPlugName: string = "";

  ngOnInit(): void {
    this.showGraph();
    this.getData();
  }

  toDate: Date = new Date('2024/02/02 00:00:00');
  fromDate: Date = this.addHours(this.toDate, -24);

  constructor(private measurementService: MeasurementsService){}

  getData(){
    this.dataWattFirst = [];
    this.dataWattSecond = [];

    this.measurementService.getMeasurements(this.firstPlug_Id!, this.fromDate, this.toDate).subscribe(
      (data) => {
        const plugMeasurements = data;
        plugMeasurements.forEach(m => { 

          this.avgWattFirst += m.wattPower;
          
          this.dataWattFirst.push([new Date(m.timeStamp).getTime(), (Math.round((m.wattPower + Number.EPSILON) * 100) / 100)]);
        });
        this.avgWattFirst = (this.avgWattFirst/this.dataWattFirst.length);
        this.avgWattFirst = Math.round((this.avgWattFirst + Number.EPSILON) * 100) / 100;
        this.updateSeries();
      }
    );

    this.measurementService.getMeasurements(this.secondPlug_Id!, this.fromDate, this.toDate).subscribe(
      (data) => {
        const plugMeasurements = data;

        plugMeasurements.forEach(m => { 

          this.avgWattSecond += m.wattPower;
          
          this.dataWattSecond.push([new Date(m.timeStamp).getTime(), (Math.round((m.wattPower + Number.EPSILON) * 100) / 100)]);
        });

        this.avgWattSecond = (this.avgWattSecond/this.dataWattSecond.length);
        this.avgWattSecond = Math.round((this.avgWattSecond + Number.EPSILON) * 100) / 100;
        this.updateSeries();
      }
    );
  }

  updateSeries() {

    if (this.dataWattFirst.length === 0 || this.dataWattSecond.length === 0) {
      return;
    }

    this.chart.updateSeries([
      {
        name: this.firstPlugName,
        data: this.dataWattFirst,
        color: this.firstColor,
      },
      {
        name: this.secondPlugName,
        data: this.dataWattSecond,
        color: this.secondColor
      }
    ]);
  }

  showGraph(){

    this.chartOptions = {
      series: [
        {
          name: this.firstPlugName,
          data: this.dataWattFirst,
          color: this.firstColor,
        },
        {
          name: this.secondPlugName,
          data: this.dataWattSecond,
          color: this.secondColor
        }
      ],
      chart: {
        toolbar:{
          show: false
        },
        type: "area",
        height: "auto",
        width: 370
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
      },
      fill:{
        type: "gradient",
        gradient: { 
          shade: "light",
          type: "vertical",
          shadeIntensity: 0,
          opacityFrom: 0.7,
          opacityTo: 0.1
        }
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
        min: 0,
        labels: {
          formatter: function (value: number){
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
    }
  }

  addHours(date: Date, hours: number) {
    let newDate = new Date(date);
    newDate.setHours(date.getHours() + hours);
    return newDate;
  }
  
  arrowClicked(hours: number){
    this.fromDate = this.addHours(this.fromDate, hours);
    this.toDate = this.addHours(this.toDate, hours);
  
    this.getData();
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