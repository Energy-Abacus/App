import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Measurement } from 'src/app/models/measurement/measurement.model';
import { Plug } from 'src/app/models/measurement/plug.model';
import { MeasurementsService } from 'src/app/services/measurements.service';
import { PlugsService } from 'src/app/services/plugs.service';

@Component({
  selector: 'app-compare-data',
  templateUrl: './compare-data.page.html',
  styleUrls: ['./compare-data.page.css'],
})
export class CompareDataPage implements OnInit {

  hiddenGraphs: boolean = false;
  avgTempFirst: number = 0;
  avgTempSecond: number = 0;
  avgWattFirst: number = 0;
  avgWattSecond: number = 0;
  dataTempFirst: number[][] = [];
  dataWattFirst: number[][] = [];
  dataTempSecond: number[][] = [];
  dataWattSecond: number[][] = [];
  firstPlugMeasurements: Measurement[] = [];
  secondPlugMeasurements: Measurement[] = [];
  firstPlug_Id: number = 0;
  secondPlug_Id: number = 0;


  constructor(private activatedRoute: ActivatedRoute, private measurementService: MeasurementsService, private plugsService: PlugsService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.firstPlug_Id = Number(params['firstId']);
        this.secondPlug_Id = Number(params['secondId']);
      }
    );

    this.measurementService.getMeasurements(this.firstPlug_Id!, new Date('2023/01/01 00:00:00'), new Date('2023/12/20 00:00:00')).subscribe(
      (data) => {
        this.firstPlugMeasurements = data;

        this.firstPlugMeasurements.forEach(m => { 
          this.dataTempFirst.push([new Date(m.timeStamp).getTime(), (Math.round((m.temperature + Number.EPSILON) * 100) / 100)]);

          this.avgTempFirst += m.temperature;

          this.avgWattFirst += m.wattPower;
          
          this.dataWattFirst.push([new Date(m.timeStamp).getTime(), (Math.round((m.wattPower + Number.EPSILON) * 100) / 100)]);
        });

        this.avgTempFirst = (this.avgTempFirst/this.dataTempFirst.length);
        this.avgTempFirst = Math.round((this.avgTempFirst + Number.EPSILON) * 100) / 100;

        this.avgWattFirst = (this.avgWattFirst/this.dataWattFirst.length);
        this.avgWattFirst = Math.round((this.avgWattFirst + Number.EPSILON) * 100) / 100;

      }
    );

    this.measurementService.getMeasurements(this.secondPlug_Id!, new Date('2023/01/01 00:00:00'), new Date('2023/12/20 00:00:00')).subscribe(
      (data) => {
        this.secondPlugMeasurements = data;

          this.secondPlugMeasurements.forEach(m => { 
          this.dataTempSecond.push([new Date(m.timeStamp).getTime(), (Math.round((m.temperature + Number.EPSILON) * 100) / 100)]);

          this.avgTempSecond += m.temperature;

          this.avgWattSecond += m.wattPower;
          
          this.dataWattSecond.push([new Date(m.timeStamp).getTime(), (Math.round((m.wattPower + Number.EPSILON) * 100) / 100)]);
        });

        this.avgTempSecond = (this.avgTempSecond/this.dataTempSecond.length);
        this.avgTempSecond = Math.round((this.avgTempSecond + Number.EPSILON) * 100) / 100;

        this.avgWattSecond = (this.avgWattSecond/this.dataWattSecond.length);
        this.avgWattSecond = Math.round((this.avgWattSecond + Number.EPSILON) * 100) / 100;

        this.changeGraph(false);
      }
    );
  }

  changeGraph(show: boolean){
    this.hiddenGraphs = show;
  }

}
