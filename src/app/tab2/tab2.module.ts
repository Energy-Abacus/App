import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import {NgApexchartsModule} from "ng-apexcharts";
import {ApexLineChartComponent} from "../charts/apex-line-chart/apex-line-chart.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    NgApexchartsModule
  ],
  exports: [
  ],
  declarations: [Tab2Page, ApexLineChartComponent]
})
export class Tab2PageModule {}
