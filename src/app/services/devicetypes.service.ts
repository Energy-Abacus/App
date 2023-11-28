import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DeviceType } from '../models/device-type.model';
import { mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicetypesService {

  private url="https://student.cloud.htl-leonding.ac.at/e.gstallnig/abacus/main/api/v1/device-type";


  constructor(private http: HttpClient,private auth: AuthService) { }


  getDeviceTypes(){

    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<DeviceType[]>(this.url, {
        headers:  {'Authorization': 'Bearer ' + token}
      }))
    )
  }

 

}
