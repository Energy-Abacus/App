import { Injectable } from '@angular/core';
import {mergeMap} from "rxjs";
import {Plug} from "../models/measurement/plug.model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "@auth0/auth0-angular";

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
}