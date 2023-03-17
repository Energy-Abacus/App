import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { map, mergeMap } from 'rxjs';
import { DatePipe, formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MeasurementsService {

  constructor(private http: HttpClient, private auth: AuthService) { }  

  getMeasurements(paramId: number, paramFrom: Date, paramTo: Date) {

    let pipe = new DatePipe('en-US');
    let paramFromFormatted = pipe.transform(paramFrom,'YYYY/MM/dd HH:mm:ss')!;
    let paramToFormatted = pipe.transform(paramTo,'YYYY/MM/dd HH:mm:ss')!;

    console.log(paramFromFormatted);
    console.log(paramToFormatted);

    let httpParams = new HttpParams({fromObject: {from: paramFromFormatted , to: paramToFormatted, outletId: paramId}});


    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => this.http.get('https://student.cloud.htl-leonding.ac.at/e.gstallnig/abacus/main/api/v1/measurements',{
        headers: {'Authorization' : 'Bearer ' + token} , params: httpParams
      }))
    )
  }
}
