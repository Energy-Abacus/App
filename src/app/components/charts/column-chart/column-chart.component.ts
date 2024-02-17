import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
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
export class ApexColumnChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  @Input() _height: any;

  

  _names: string[] = [];
  get names(): string[] {
      return this._names;
  }
  @Input() set names(value: string[]) {
      this._names = value;
  }

  _values: number[] = [];
  get values(): number[] {
      return this._values;
  }
  @Input() set values(value: number[]) {
      this._values = value;
      
  }

  currentIdx: number = 0;
  arraySize: number = 0;

  ngOnInit(): void {
    this.initGraph();
  }

  initGraph() {
    console.log('newInit');
    var splitNames = [], size = 5;
    var splitValues = [], size = 5;
    this.arraySize = splitNames.length;

    for (let i = 0; i < this.values.length; i += size){
      splitValues.push(this.values.slice(i, i + size));
      splitNames.push(this.names.slice(i, i + size))
    }
   
    this.chartOptions = {
      series: [
        {
          name: "Watt:",
          data: splitValues[this.currentIdx],
          labels: splitNames[this.currentIdx]
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
      zoom: {
        enabled: true,
        type: 'x',
        resetIcon: {
            offsetX: -10,
            offsetY: 0,
            fillColor: '#fff',
            strokeColor: '#37474F'
        },
        selection: {
            background: '#90CAF9',
            border: '#0D47A1'
        }    
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
          distributed: true,
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
        categories: splitNames[this.currentIdx],
        axisBorder: {
          show: true,
          color: '#31333C'
        },
        axisTicks: {
          show: false
        },
        
        labels: {
          show: false,
          style: {
            fontSize: "12px"
          }
        }
      },
      yaxis: {
        opposite: true,
        labels:{
          show: true,
          style:{
            colors:[
              "#595757"
            ],
            fontSize: "10px"
          },
          formatter: function (value: number) {
            return value.toFixed(0);
          },
        }
      },
      tooltip:{
        enabled: 'false'
      },
    };
  }

  newInit(idx: number){
    this.currentIdx = this.currentIdx + idx;
    console.log('newIdx: '+this.currentIdx);
    this.initGraph();
  }
}
