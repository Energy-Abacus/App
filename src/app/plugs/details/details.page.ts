import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { error } from 'console';
import { ApexDetailsLineChartComponent } from 'src/app/components/charts/apex-details-line-chart/apex-details-line-chart.component';
import { ApexDetailsTermperatureComponent } from 'src/app/components/charts/apex-details-temperature/apex-details-temperature.component';
import { DeviceType } from 'src/app/models/device-type.model';
import { Measurement } from 'src/app/models/measurement/measurement.model';
import { Plug } from 'src/app/models/measurement/plug.model';
import { PlugDto } from 'src/app/models/plug-dto.model';
import { DevicetypesService } from 'src/app/services/devicetypes.service';
import { MeasurementsService } from 'src/app/services/measurements.service';
import { PlugsService } from 'src/app/services/plugs.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.css'],
})
export class DetailsPage implements OnInit {

  plug_Id: number = 0;
  measurements: Measurement[] = [];
  dataTemp: number[][] = [];
  avgTemp: number = 0;
  dataWatt: number[][] = [];
  hidden: boolean = true;
  totalWatt: number = 0;
  deviceTypes: DeviceType[] = [];
  currentDeviceType: DeviceType | undefined;
  totalPowerPlug: number = 0;
  toDate = new Date('2024/02/03 00:00:00');
  fromDate: Date;

  @ViewChild(ApexDetailsLineChartComponent) lineGraph: ApexDetailsLineChartComponent
  @ViewChild(ApexDetailsTermperatureComponent) lineTempGraph: ApexDetailsLineChartComponent

  plugDto: PlugDto = {name: "", outletIdentifier: "", hubId: 0, deviceTypeIds: []};
  plug: Plug  = {name: "", id: 0, powerOn: false, outletIdentifier: "", hubId: 0, deviceTypes: []};

  notifyDataChanged: EventEmitter<any> = new EventEmitter<any>()

  constructor(private activatedRoute: ActivatedRoute, private measurementService: MeasurementsService, private plugService: PlugsService,private devicetypesService: DevicetypesService) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.plug_Id = Number(params['id'])
      }
    );

    this.measurementService.getTotalPowerPlug(this.plug_Id!).subscribe({
      next: data => {
        this.totalPowerPlug = data;
      },
      error: err =>{

        console.log(err)
      }
    })


      
    this.devicetypesService.getDeviceTypes().subscribe(
      (data) => {

        this.deviceTypes = data;
        this.deviceTypes.forEach(d => console.log(d.name))

      },
      error => {

        console.log(error);
      }
    )

    
    this.plugService.getPlug(this.plug_Id).subscribe(
      (data) => {
        this.plug = data;
      }
    );
  }

  // initMeasurements(){
  //   this.showBothGraphs = false;
  //   this.changeGraph(false);
  //   this.measurementService.getMeasurements(this.plug_Id!, this.fromDate, this.toDate).subscribe(
  //     (data) => {
  //       this.measurements = data;

  //       this.measurements.forEach(m => { 
  //         this.dataTemp.push([new Date(m.timeStamp).getTime(), (Math.round((m.temperature + Number.EPSILON) * 100) / 100)]);
  //         this.avgTemp += m.temperature;
  //         this.dataWatt.push([new Date(m.timeStamp).getTime(), (Math.round((m.wattPower + Number.EPSILON) * 100) / 100)]);
  //       });

  //       this.avgTemp = (this.avgTemp/this.dataTemp.length);
  //       this.avgTemp = Math.round((this.avgTemp + Number.EPSILON) * 100) / 100;

  //       this.totalWatt = this.measurements[this.measurements.length - 1].totalPowerUsed;

  //       this.changeGraph(true);
  //       this.showBothGraphs = true;
  //       this.notifyDataChanged.emit({title: "measurement data changed", id: 1});
  //     }
    // );
  // }

  changeGraph(show: boolean){
    this.hidden = show;
    this.totalWatt = this.lineGraph?.totalWatt ?? this.lineTempGraph?.totalWatt;
  }
}

