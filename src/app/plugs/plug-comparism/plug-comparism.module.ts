import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlugComparismPageRoutingModule } from './plug-comparism-routing.module';

import { PlugComparismPage } from './plug-comparism.page';
import { ComparismChartComponent } from 'src/app/components/charts/comparism-chart/comparism-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlugComparismPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [PlugComparismPage,ComparismChartComponent]
})
export class PlugComparismPageModule {}
