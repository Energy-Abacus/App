import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { ApexLineChartComponent } from 'src/app/components/charts/apex-line-chart/apex-line-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [DetailsPage, ApexLineChartComponent]
})
export class DetailsPageModule {}
