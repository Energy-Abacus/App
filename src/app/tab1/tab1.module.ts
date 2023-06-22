import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../components/explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import {NgChartsModule} from "ng2-charts";
import {NgApexchartsModule} from "ng-apexcharts";
import {Tab2PageModule} from "../tab2/tab2.module";
import { MenuComponent } from '../components/menu/menu.component';
import { LoginButtonComponent } from '../components/login/login-button/login-button.component';
import { LogoutButtonComponent } from '../components/login/logout-button/logout-button.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgChartsModule,
    NgApexchartsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    
  ],
  declarations: [
    Tab1Page,
    MenuComponent,
    LoginButtonComponent,
    LogoutButtonComponent
  ]
})
export class Tab1PageModule {}
