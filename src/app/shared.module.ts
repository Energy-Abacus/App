import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'ion2-calendar';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { ApexLineChartComponent } from './components/charts/apex-line-chart/apex-line-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexBarChartComponent } from './components/charts/apex-bar-chart/apex-bar-chart.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgApexchartsModule,
  ],
  exports: [
    ComparisonComponent,
    ApexLineChartComponent,
    ApexBarChartComponent
  ],
  declarations: [
    ComparisonComponent,
    ApexLineChartComponent,
    ApexBarChartComponent
  ]
})
export class SharedModule {}
