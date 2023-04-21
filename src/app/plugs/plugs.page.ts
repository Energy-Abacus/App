import { Component, OnInit } from '@angular/core';
import { Plug } from 'src/app/models/measurement/plug.model';
import { MeasurementsService } from 'src/app/services/measurements.service';


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
    this.measurementsService.getPlugs(2).subscribe({
      next: data => {
        this.plugs = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
