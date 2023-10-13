import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Measurement } from 'src/app/models/measurement/measurement.model';
import { Plug } from 'src/app/models/measurement/plug.model';
import { MeasurementsService } from 'src/app/services/measurements.service';
import { PlugsService } from 'src/app/services/plugs.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css'],
})
export class ComparisonComponent implements OnInit {

  dataTempFirst: number[][] = [];
  dataWattFirst: number[][] = [];
  dataTempSecond: number[][] = [];
  dataWattSecond: number[][] = [];
  dataTemp: number[][] = [];
  plug_Id: number = 0;
  measurements: Measurement[] = [];
  avgTempFirst: number = 0;
  avgTempSecond: number = 0;
  avgWattFirst: number = 0;
  avgWattSecond: number = 0;
  hiddenGraphs: boolean = false;

  plugs: Plug[] = [];

  constructor(private activatedRoute: ActivatedRoute, private measurementService: MeasurementsService, private plugsService: PlugsService) { }

  ngOnInit() {

    this.loadPlugs();

    this.plug_Id = 7;

    this.measurementService.getMeasurements(this.plug_Id!, new Date('2023/01/01 00:00:00'), new Date('2023/12/20 00:00:00')).subscribe(
      (data) => {
        this.measurements = data;
        console.log(this.measurements)

        this.measurements.forEach(m => { 
          this.dataTempFirst.push([new Date(m.timeStamp).getTime(), (Math.round((m.temperature + Number.EPSILON) * 100) / 100)]);
          this.dataTempSecond.push([new Date(m.timeStamp).getTime(), (Math.round(((m.temperature + 5) + Number.EPSILON) * 100) / 100)]);
          this.avgTempFirst += m.temperature;
          this.avgTempSecond += m.temperature + 5;

          this.avgWattFirst += m.wattPower;
          this.avgWattSecond += m.wattPower + 5;

          
          this.dataWattFirst.push([new Date(m.timeStamp).getTime(), (Math.round((m.wattPower + Number.EPSILON) * 100) / 100)]);
          this.dataWattSecond.push([new Date(m.timeStamp).getTime(), (Math.round(((m.wattPower + 5) + Number.EPSILON) * 100) / 100)]);
        });
        console.log(this.avgWattFirst);

        this.avgTempFirst = (this.avgTempFirst/this.dataTempFirst.length);
        this.avgTempFirst = Math.round((this.avgTempFirst + Number.EPSILON) * 100) / 100;

        this.avgTempSecond = (this.avgTempSecond/this.dataTempSecond.length);
        this.avgTempSecond = Math.round((this.avgTempSecond + Number.EPSILON) * 100) / 100;

        this.avgWattFirst = (this.avgWattFirst/this.dataWattFirst.length);
        this.avgWattFirst = Math.round((this.avgWattFirst + Number.EPSILON) * 100) / 100;

        this.avgWattSecond = (this.avgWattSecond/this.dataWattSecond.length);
        this.avgWattSecond = Math.round((this.avgWattSecond + Number.EPSILON) * 100) / 100;
      }
    );
  }

  changeGraph(show: boolean){
    this.hiddenGraphs = show;
  }

  loadPlugs() {
    this.plugsService.getPlugs(4).subscribe({
      next: data => {
        this.plugs = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

