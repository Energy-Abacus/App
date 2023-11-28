import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { error } from 'console';
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

  plug_Id: number | undefined = undefined;
  measurements: Measurement[] = [];
  dataTemp: number[][] = [];
  dataWatt: number[][] = [];
  totalWatt: number = 0;
  hidden: boolean = false;
  avgTemp: number = 0;
  deviceTypes: DeviceType[] = [];
  currentDeviceType: DeviceType | undefined;
  totalPowerPlug: number = 0;

  plugDto: PlugDto = {name: "", outletIdentifier: "", hubId: 0, deviceTypeIds: []};


  plug: Plug  = {name: "", id: 0, powerOn: false, outletIdentifier: "", hubId: 0, deviceTypes: []};


  constructor(private activatedRoute: ActivatedRoute, private measurementService: MeasurementsService, private plugService: PlugsService,private devicetypesService: DevicetypesService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.plug_Id = Number(params['id'])
      }
    );


    this.measurementService.getTotalPowerPlug().subscribe({
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

        console.log(this.dataTemp);
        console.log(this.dataWatt);
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

  handleChange(ev: any){

  


    if(ev.target.value != undefined){

      this.plug.deviceTypes = ev.target.value;

      this.plugService.updatePlug(this.plug).subscribe({
        next: data => {

          console.log("Update war erfolgreich" + data);
        },
        error: err => {

          console.log("Konnte nicht aktualisiert werden!" + err);
        }
      })
    }


  

  }
}

