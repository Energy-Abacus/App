import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { ApexLineChartComponent } from './components/charts/apex-line-chart/apex-line-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexBarChartComponent } from './components/charts/apex-bar-chart/apex-bar-chart.component';
import { ApexSplineChartComponent } from './components/charts/apex-spline-chart/apex-spline-chart.component';
import { CalendarModule } from 'ion2-calendar';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgApexchartsModule,
    CalendarModule
  ],
  exports: [
    ComparisonComponent,
    ApexLineChartComponent,
    ApexBarChartComponent,
    ApexSplineChartComponent
  ],
  declarations: [
    ComparisonComponent,
    ApexLineChartComponent,
    ApexBarChartComponent,
    ApexSplineChartComponent
  ]
})
export class SharedModule {}
