import {OnInit, Component, ViewChild, Input } from "@angular/core";
import { Console } from "console";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { Measurement } from "src/app/models/measurement/measurement.model";
import { MeasurementsService } from "src/app/services/measurements.service";

export type ChartOptions = {
  tooltip: ApexTooltip
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: any[];
  fill: ApexFill;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-comparism-chart',
  templateUrl: './comparism-chart.component.html',
  styleUrls: ['./comparism-chart.component.css'],
})
export class ComparismChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  @Input() firstId :number  = 0;
  @Input() secondId :number  = 0;
  firstMeasurements: Measurement[] = [];
  secondMeasurements: Measurement[] = [];
  firstDataTemp: number[][] = [];
  secondDataTemp: number[][] = [];

  constructor(private measurementService: MeasurementsService) {
 
  }
  ngOnInit(): void {
    
    this.measurementService.getMeasurements(this.firstId,new Date('2022/01/01 00:00:00'),new Date('2023/05/01 00:00:00')).subscribe(
      (data) => {
        this.firstMeasurements = data;
        console.log(this.firstMeasurements);
        this.firstMeasurements.forEach(m => {
          this.firstDataTemp.push([new Date(m.timeStamp).getTime(), (Math.round((m.temperature + Number.EPSILON) * 100) / 100)]);
        })
      }
    )

    this.measurementService.getMeasurements(this.secondId,new Date('2022/01/01 00:00:00'),new Date('2023/05/01 00:00:00')).subscribe(
      (data) => {
        this.secondMeasurements = data;
        console.log(this.secondMeasurements);
        this.secondMeasurements.forEach(m => {
          this.secondDataTemp.push([new Date(m.timeStamp).getTime(), (Math.round((m.temperature + Number.EPSILON) * 100) / 100)]);
        })
      }
    )

    this.initGraph();
  }

  initGraph(){

    this.chartOptions = {
      series: [
        {
          name: this.firstId,
          data: this.firstDataTemp
        },
        {
          name: this.secondId,
          data: this.secondDataTemp
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
            label: {
              text: "Support",
              style: {
                color: "#fff",
                background: "#00E396"
              }
            }
          }
        ],
        xaxis: [
          {
            x: new Date("14 Nov 2012").getTime(),
            label: {
              text: "Rally",
              style: {
                color: "#fff",
                background: "#775DD0"
              }
            }
          }
        ]
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
        }
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0,
          opacityFrom: 1,
          opacityTo: 0.1,
          stops: [0, 100]
        }
      },
    };
  }
}