import { Component, OnInit } from '@angular/core';
import { MeasurementsService } from '../services/measurements.service';
import { PlugsService } from '../services/plugs.service';
import { Measurement } from '../models/measurement/measurement.model';
import { Plug } from '../models/measurement/plug.model';
import { GetOutletDto } from '../models/measurement/get-outlet-dto';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.css']
})
export class Tab1Page implements OnInit{
  measurements: Measurement[] = [];
  dataWatt: number[][] = [];
  totalPower: number = 0;
  plugs: Plug[] = [];
  columnData: GetOutletDto[] = [];
  columnDataNames: string[] = [];
  columnDataValues: number[] = [];

  constructor(private measurementService: MeasurementsService, private plugsService: PlugsService) { }
  
  ngOnInit(): void {

    this.plugsService.getColumnChartData().subscribe(
      (data) =>{
        this.columnData = data;
        this.columnData.forEach(c => { this.columnDataNames.push(c.name); this.columnDataValues.push(c.totalPowerUsed)});
      }
    )

    this.loadPlugs();

    this.measurementService.getTotalPowerUsed().subscribe(
      (data) => {
        this.totalPower = Math.trunc(data);
      }
    );
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
