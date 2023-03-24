import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { mergeMap } from 'rxjs/operators';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import { MeasurementsService } from './services/measurements.service';
import config from "../../capacitor.config";

const callbackUri = `${config.appId}://dev-3adocs3bconafo8d.us.auth0.com/capacitor/${config.appId}/callback`;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  // Import the AuthService module from the Auth0 Angular SDK
  constructor(public auth: AuthService, private ngZone: NgZone, private measurementsService: MeasurementsService) {}

  ngOnInit(): void {

    const strFrom = '01.01.1999 00:00:00';
    const dateFrom = new Date(strFrom);
    const strTo = '01.01.2024 00:00:00';
    const dateTo = new Date(strTo);


    this.measurementsService.getMeasurements(1,dateFrom,dateTo).subscribe({
      next: data =>{
        console.log(data);
      }
    });

    // Use Capacitor's App plugin to subscribe to the `appUrlOpen` event
    App.addListener('appUrlOpen', ({ url }) => {
      // Must run inside an NgZone for Angular to pick up the changes
      // https://capacitorjs.com/docs/guides/angular
      this.ngZone.run(() => {
        if (url?.startsWith(callbackUri)) {
          // If the URL is an authentication callback URL..
          if (
            url.includes('state=') &&
            (url.includes('error=') || url.includes('code='))
          ) {
            // Call handleRedirectCallback and close the browser
            this.auth
              .handleRedirectCallback(url)
              .pipe(mergeMap(() => Browser.close()))
              .subscribe();
          } else {
            Browser.close();
          }
        }
      });
    });
  }
}
