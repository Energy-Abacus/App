import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../components/explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import {NgApexchartsModule} from "ng-apexcharts";
import { ApexLineChartComponent } from '../components/charts/apex-line-chart/apex-line-chart.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule
  ],
  exports: [
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
