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

  ngOnInit(): void {
    this.initGraph();
  }

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  @Input() dataFirst: number[][] = [];
  @Input() dataSecond: number[][] = [];
  @Input() firstColor: string = '';
  @Input() secondColor: string = '';

  initGraph(){
    this.chartOptions = {
      series: [
        {
          name: "user 1",
          data: this.dataFirst,
          color: this.firstColor
        },
        {
          name: "user 2",
          data: this.dataSecond,
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