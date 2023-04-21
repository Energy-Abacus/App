import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlugsPageRoutingModule } from './plugs-routing.module';

import { PlugsPage } from './plugs.page';
import { ApexLineChartComponent } from '../components/charts/apex-line-chart/apex-line-chart.component';
import { DetailsPage } from './details/details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlugsPageRoutingModule
  ],
  declarations: [PlugsPage]
})
export class PlugsPageModule {}
