import { Component, ViewChild } from "@angular/core";
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  tooltip: ApexTooltip;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-apex-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css'],
})
export class ApexColumnChartComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "distibuted",
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }
      ],
      chart: {
        toolbar:{
          show: false
        },
        height: 165,
        width: 350,
        type: "bar",
      },
      fill: {
        type: "gradient",

        gradient: {
          type: "vertical",
         
          colorStops:[
            {
              offset: 0,
              color: "#6510cc",
              opacity: 0.4
            },
            {
              offset: 70,
              color: "#5710ad",
              opacity: 0.5
            }
          ],
        }
      },
      stroke:{
        width: 3,
        colors: ["#7d12ff"]
      },
      plotOptions: {
        bar: {
          columnWidth: "80%",
          distributed: false,
          borderRadius: 4,
          borderRadiusApplication: 'end' 
        }
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false
      },
      grid: {
        show: false,
        borderColor: "#31333C"
      },
      xaxis: {
        tooltip:{
          enabled: false
        },
        axisBorder: {
          show: true,
          color: '#31333C'
        },
        axisTicks: {
          show: false
        },
        categories: [
          ["Plug 1", ""],
          ["Plug 2", ""],
          ["Plug 3", ""],
          "Plug4 ",
          ["Plug 5", ""],
          ["Plug 6", ""],
          ["Plug 7", ""],
          ["Plug 8", ""]
        ],
        labels: {
          show: true,
          style: {
            colors: [
              "#595757",
              "#595757",
              "#595757",
              "#595757",
              "#595757",
              "#595757",
              "#595757",
              "#595757"
            ],
            fontSize: "12px"
          }
        }
      },
      yaxis: {
        opposite: true,
        labels:{
          show: false,
          formatter: function (value: number) {
            return value.toFixed(0);
          },
          style:{
            fontSize: "10px"
          }
        }
      },
      tooltip:{
        enabled: 'false'
      },
    };
  }
}
