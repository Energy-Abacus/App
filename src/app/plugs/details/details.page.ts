import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Measurement } from 'src/app/models/measurement/measurement.model';
import { Plug } from 'src/app/models/measurement/plug.model';
import { MeasurementsService } from 'src/app/services/measurements.service';
import { PlugsService } from 'src/app/services/plugs.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.css'],
})
export class DetailsPage implements OnInit {

  plug_Id: number | undefined = undefined;
  measurements: Measurement[] = [];
  dataTemp: number[][] = [];
  dataWatt: number[][] = [];
  totalWatt: number = 0;
  hidden: boolean = false;
  avgTemp: number = 0;

  plug: Plug  = {name: "", id: 0, powerOn: false, outletIdentifier: "", hubId: 0};

  constructor(private activatedRoute: ActivatedRoute, private measurementService: MeasurementsService, private plugService: PlugsService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.plug_Id = Number(params['id'])
      }
    );

    this.measurementService.getMeasurements(this.plug_Id!, new Date('2023/01/01 00:00:00'), new Date('2023/12/20 00:00:00')).subscribe(
      (data) => {
        this.measurements = data;
        console.log(this.measurements)

        this.measurements.forEach(m => { 
          this.dataTemp.push([new Date(m.timeStamp).getTime(), (Math.round((m.temperature + Number.EPSILON) * 100) / 100)]);
          this.avgTemp += m.temperature;
          this.dataWatt.push([new Date(m.timeStamp).getTime(), (Math.round((m.wattPower + Number.EPSILON) * 100) / 100)]);
        });

        this.avgTemp = (this.avgTemp/this.dataTemp.length);
        this.avgTemp = Math.round((this.avgTemp + Number.EPSILON) * 100) / 100;

        this.totalWatt = this.measurements[this.measurements.length - 1].totalPowerUsed;

        this.changeGraph(false);
      }
    );
    this.plugService.getPlug(this.plug_Id).subscribe(
      (data) => {
        this.plug = data;
      }
    );
  }

  changeGraph(show: boolean){
    this.hidden = show;
  }
}
