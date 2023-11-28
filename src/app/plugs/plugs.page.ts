import { Component, OnInit } from '@angular/core';
import { Plug } from 'src/app/models/measurement/plug.model';
import { PlugsService } from "../services/plugs.service";
import { Router } from '@angular/router';
import { MeasurementsService } from '../services/measurements.service';


@Component({
  selector: 'app-plugs',
  templateUrl: './plugs.page.html',
  styleUrls: ['./plugs.page.css'],
})
export class PlugsPage implements OnInit {

  plugs: Plug[] = [];
  comparing: boolean = false;
  plugIds: number[] = [];
  isClick: boolean = false;
  totalPower: number = 0;
  totalPowerBetween: number = 0;
  dateRange: {start: Date, end: Date}

  constructor(private plugsService: PlugsService, private router: Router,private measurementService: MeasurementsService) { }

  ngOnInit() {
    this.loadPlugs();
    this.loadTotalPower();
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


  loadTotalPower(){


    return this.measurementService.getTotalPowerUser().subscribe({
      next: data => {

          this.totalPower = data;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  loadTotalPowerBetween(){

    return this.measurementService.getTotalPowerBetween(this.dateRange.start,this.dateRange.end).subscribe({
      next: data => {
        
        this.totalPowerBetween = data;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
