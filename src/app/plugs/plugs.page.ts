import { Component, OnInit } from '@angular/core';
import { Plug } from '../models/measurement/plug.model';
import { MeasurementsService } from '../services/measurements.service';

@Component({
  selector: 'app-plugs',
  templateUrl: './plugs.page.html',
  styleUrls: ['./plugs.page.css'],
})
export class PlugsPage implements OnInit {

  plugs: Plug[] = [];

  constructor(private measurementsService: MeasurementsService) { }

  ngOnInit() {
    this.loadPlugs();
  }

  loadPlugs() {
    this.measurementsService.getPlugs(1).subscribe({
      next: data => {
        this.plugs = data;
        console.log(this.plugs);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
