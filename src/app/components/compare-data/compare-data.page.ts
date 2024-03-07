import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Measurement } from 'src/app/models/measurement/measurement.model';
import { MeasurementsService } from 'src/app/services/measurements.service';
import { PlugsService } from 'src/app/services/plugs.service';
@Component({
  selector: 'app-compare-data',
  templateUrl: './compare-data.page.html',
  styleUrls: ['./compare-data.page.css'],
})
export class CompareDataPage implements OnInit {

  totalWattFirst: number = 0;
  totalWattSecond: number = 0;
  firstPlugMeasurements: Measurement[] = [];
  secondPlugMeasurements: Measurement[] = [];
  firstPlug_Id: number = 0;
  secondPlug_Id: number = 0;
  firstPlugName: string = "";
  secondPlugName: string = "";

  constructor(private activatedRoute: ActivatedRoute, private measurementService: MeasurementsService, private plugService: PlugsService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.firstPlug_Id = Number(params['firstId']);
        this.secondPlug_Id = Number(params['secondId']);
      }
    );

    this.measurementService.getTotalPowerPlug(this.firstPlug_Id!).subscribe({
      next: data => {
        this.totalWattFirst = (Math.round((data + Number.EPSILON) * 100) / 100);
      },
      error: err =>{

        console.log(err)
      }
    })


    this.measurementService.getTotalPowerPlug(this.secondPlug_Id).subscribe({
      next: data => {
        this.totalWattSecond = (Math.round((data + Number.EPSILON) * 100) / 100);
      },
      error: err =>{

        console.log(err)
      }
    })

    this.plugService.getPlug(this.firstPlug_Id).subscribe({
      next: data =>{
        console.log(data);
        this.firstPlugName = data.name
      }
    })

    this.plugService.getPlug(this.secondPlug_Id).subscribe({
      next: data =>{
        console.log(data);
        this.secondPlugName = data.name
      }
    })
  }

}
