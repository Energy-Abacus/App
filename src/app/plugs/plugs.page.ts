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

  plugClicked(id: number) {

    if (!this.comparing) {
      this.router.navigate(['tabs/plugs/details', id]);
    } else
      this.plugIds.push(id);

    if (this.plugIds.length == 2) {

      console.log(this.plugIds[0]);
      console.log(this.plugIds[1]);
      this.comparing = false;
      this.router.navigate(['tabs/plugs/plug-comparism', this.plugIds[0], this.plugIds[1]])
      this.plugIds = [];
    }
  }

  isClicked() {
    return this.isClick;
  }

  onClick() {
    this.isClick = !this.isClick;
    console.log(this.isClick);
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
