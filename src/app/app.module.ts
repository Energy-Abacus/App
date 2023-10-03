import {  NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { HttpClientModule, HttpHeaders } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from '@auth0/auth0-angular';
import config from '../../capacitor.config';
import { NgApexchartsModule } from "ng-apexcharts";
import { LoginButtonComponent } from './components/login/login-button/login-button.component';
import { LogoutButtonComponent } from './components/login/logout-button/logout-button.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddComponent } from './components/social-system/add/add.component';
import { FriendsComponent } from './components/social-system/friends/friends.component';

// Build the URL that Auth0 should redirect back to
const redirect_uri = `${config.appId}://dev-3adocs3bconafo8d.us.auth0.com/capacitor/${config.appId}/callback`;

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicModule,
        HttpClientModule,
        NgApexchartsModule,
        AuthModule.forRoot({
            domain: "dev-3adocs3bconafo8d.us.auth0.com",
            clientId: "YCYOaF66WycinTG2leQKhMqRZT8bWu4o",
            useRefreshTokens: true,
            useRefreshTokensFallback: false,
            cacheLocation: 'localstorage',
            authorizationParams: {
                redirect_uri: window.location.origin,
                audience: 'Quarkus-Backend-Abacus'
            }
        }),
    ],
    providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule {}
