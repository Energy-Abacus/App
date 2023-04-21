import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { map, mergeMap } from 'rxjs';
import { DatePipe, formatDate } from '@angular/common';
import { Measurement } from '../models/measurement/measurement.model';
import { Plug } from '../models/measurement/plug.model';

@Injectable({
  providedIn: 'root',
})
export class MeasurementsService {

  private url = 'https://student.cloud.htl-leonding.ac.at/e.gstallnig/abacus/elig-add-total-watt-consumption/api/v1/measurements';

  constructor(private http: HttpClient, private auth: AuthService) { }  

  getMeasurements(outletId: number, paramFrom: Date, paramTo: Date) {
    let httpParams = new HttpParams({fromObject: {from: paramFrom.getTime() / 1000 , to: paramTo.getTime() / 1000, outletId: outletId}});

    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<Measurement[]>(this.url,{
        headers: {'Authorization' : 'Bearer ' + token} , params: httpParams
      }))
    )
  }

  getPlugs(hubId: number) {
    this.auth.isAuthenticated$.subscribe({
      next: data => {
        console.log(data);
      }
    });
    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get<Plug[]>(this.url + '/outlet',{
        headers: {'Authorization' : 'Bearer ' + token} , params: {hubId: hubId}
      }))
    )
  }
}
