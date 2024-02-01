import { Injectable } from '@angular/core';
import {mergeMap} from "rxjs";
import {Plug} from "../models/measurement/plug.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "@auth0/auth0-angular";
import { GetOutletDto } from '../models/measurement/get-outlet-dto';
import { DeviceType } from '../models/device-type.model';
import { PlugDto } from '../models/plug-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PlugsService {

  private url = 'https://student.cloud.htl-leonding.ac.at/e.gstallnig/abacus/main/api/v1/outlet';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getPlugs(hubId: number) {
    this.auth.isAuthenticated$.subscribe({
      next: data => {
        console.log(data);
      }
    });
    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<Plug[]>(this.url,{
        headers: {'Authorization' : 'Bearer ' + token} , params: {hubId: hubId}
      }))
    )
  }

  getPlug(id: number | undefined) {
    this.auth.isAuthenticated$.subscribe({
      next: data => {
        console.log(data);
      }
    });
    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<Plug>(this.url + '/' + id,{
        headers: {'Authorization' : 'Bearer ' + token}
      }))
    )
  }
  
  getColumnChartData(){
    this.auth.isAuthenticated$.subscribe({
      next: data => {
        console.log(data);
      }
    });
    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<GetOutletDto[]>(this.url, {
        headers: {'Authorization' : 'Bearer ' + token}
      }))
    )
  }

  updatePlug(plug: Plug){

    let plugDto:  PlugDto = {name: plug.name, outletIdentifier: plug.outletIdentifier, hubId: plug.hubId, deviceTypeIds: []}

    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.put<PlugDto
        >(this.url + '/' + plug.id,plugDto,
      {headers: {'Authorization' : 'Bearer ' + token,
      'Content-Type': 'application/json'}
    }))
    )
  }

 async connectToPlug(ssid: string, password: string){
    return  await this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<string>('http://192.168.1.100/settings/sta?enabled=1'+'&ssid='+ssid+'&key='+password+'!ipv4_method=dhcp',
      {headers: {'Authorization' : 'Bearer ' + token,
      'Content-Type': 'application/json'}}))
    )
  }

  postToHub(payload: string){
     var dummy = "mqtt_enable=true&mqtt_server=1192.168.1.103%3A1883&mqtt_id=shellyplug-s-4022D8892671&mqtt_user=abacustest&mqtt_reconnect_timeout_max=60&mqtt_reconnect_timeout_min=2&mqtt_clean_session=true&mqtt_keep_alive=60&mqtt_max_qos=0&mqtt_retain=false&mqtt_pass=test";
    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.post<string>('http://192.168.1.100/settings',payload ?? dummy,
      {headers: {'Authorization' : 'Bearer ' + token,
    'Content-Type': 'application/json'}}))
    )
  }
}