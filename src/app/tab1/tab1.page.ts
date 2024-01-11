import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeasurementsService } from '../services/measurements.service';
import { PlugsService } from '../services/plugs.service';
import { Measurement } from '../models/measurement/measurement.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.css']
})
export class Tab1Page implements OnInit{
  measurements: Measurement[] = [];
  dataWatt: number[][] = [];
  totalPower: number = 0;

  constructor(private measurementService: MeasurementsService) { }
  
  ngOnInit(): void {
    this.measurementService.getMeasurements(10, new Date('2020/11/21 10:00:00'), new Date('2024/11/21 12:00:00')).subscribe(
      (data) => {
        this.measurements = data;

        this.measurements.forEach(m => { 
          this.dataWatt.push([new Date(m.timeStamp).getTime(), (Math.round((m.wattPower + Number.EPSILON) * 100) / 100)]);
        });
        console.log(this.dataWatt)
      }
    );

    this.measurementService.getTotalPowerUsed().subscribe(
      (data) => {
        this.totalPower = data;
      }
    );
  }

}
