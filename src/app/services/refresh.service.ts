import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  refreshPage(){

    window.location.reload();
  }
  constructor() { }
}
