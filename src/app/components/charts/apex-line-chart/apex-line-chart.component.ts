import {Component, OnInit, ViewChild} from '@angular/core';

import { MeasurementsService} from "../../../services/measurements.service";
import {Measurement} from "../../../models/measurement/measurement.model";

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

export type ChartOptions = {
  tooltip: ApexTooltip
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
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
  dates: Date[] = [];
  dataTemp: number[][] = [];

  ngOnInit(): void {
    this.measurementsService.getMeasurements(4, new Date('2022/01/01 00:00:00'), new Date('2023/05/01 00:00:00')).subscribe(
      (data) => {
        this.measurements = data;
        this.measurements.forEach(m => {
          this.dataTemp.push([new Date(m.timeStamp).getTime(), m.temperature]);
        });
      }
    );
    this.initGraph();
  }

  initGraph(){
    this.chartOptions = {
      series: [
        {
          data: this.dataTemp
        }
      ],
      chart: {
        type: "area",
        height: 350
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
            borderColor: "#999",
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
        tickAmount: 6
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      }
    };
  }
}
