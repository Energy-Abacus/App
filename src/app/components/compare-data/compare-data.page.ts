import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Measurement } from 'src/app/models/measurement/measurement.model';
@Component({
  selector: 'app-compare-data',
  templateUrl: './compare-data.page.html',
  styleUrls: ['./compare-data.page.css'],
})
export class CompareDataPage implements OnInit {

  avgWattFirst: number = 0;
  avgWattSecond: number = 0;
  firstPlugMeasurements: Measurement[] = [];
  secondPlugMeasurements: Measurement[] = [];
  firstPlug_Id: number = 0;
  secondPlug_Id: number = 0;


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.firstPlug_Id = Number(params['firstId']);
        this.secondPlug_Id = Number(params['secondId']);
      }
    );
  }

}
