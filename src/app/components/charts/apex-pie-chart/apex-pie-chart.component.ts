import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-apex-pie-chart',
  templateUrl: './apex-pie-chart.component.html',
  styleUrls: ['./apex-pie-chart.component.css'],
})
export class ApexPieChartComponent implements OnInit{
  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  _values: number[] = [];
  get values(): number[] {
      return this._values;
  }
  @Input() set values(value: number[]) {
      this._values = value;
  }

  _names: string[] = [];
  get names(): string[] {
      return this._names;
  }
  @Input() set names(value: string[]) {
      this._names = value;
  }

  ngOnInit(): void {
    this.initGraph();
  }

  initGraph(){
    this.chartOptions = {
      series: this._values,
      labels: this._names,
      chart: {
        width: 380,
        type: "donut",
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 11,
          color: '#99c5c4',
          opacity: 0.3
      }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        colors:['#5710ad', '#99c5c4', '#ff7416'],
        opacity: 0.8
      },
      stroke:{
        width: 0
      },
      legend: {
        show: false
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}