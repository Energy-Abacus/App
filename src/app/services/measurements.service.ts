import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { from, map, mergeMap } from 'rxjs';
import { DatePipe, formatDate } from '@angular/common';
import { Measurement } from '../models/measurement/measurement.model';
import { Plug } from '../models/measurement/plug.model';

@Injectable({
  providedIn: 'root',
})
export class MeasurementsService {

  private url = 'https://student.cloud.htl-leonding.ac.at/e.gstallnig/abacus/main/api/v1/measurement';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getMeasurements(outletId: number, paramFrom: Date, paramTo: Date) {
    let httpParams = new HttpParams({fromObject: {from: paramFrom.getTime() / 1000 , to: paramTo.getTime() / 1000, outletId: outletId}});

    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<Measurement[]>(this.url,{
        headers: {'Authorization' : 'Bearer ' + token} , params: httpParams
      }))
    )
  }

  getTotalPowerPlug(outletId: number){

    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<number>(this.url + '/total-power-plug-id?outletId=' + outletId,{
        headers: {'Authorization' : 'Bearer ' + token}
      }))
    )

  }

  getTotalPowerUser(){

    
    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<number>(this.url + '/total-power-user',{
        headers: {'Authorization' : 'Bearer ' + token}
      }))
    )
  }


  getTotalPowerBetween(fromDate: Date, toDate: Date){


    let httpParams = new HttpParams({ fromObject: { from: fromDate.getTime() / 1000, to: toDate.getTime() / 1000 } });


    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<number>(this.url + '/total-power-user-between',{
        headers: {'Authorization' : 'Bearer ' + token}, params: httpParams
      }))
    )
  }  
}
