import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexBarChartComponent } from './components/charts/apex-bar-chart/apex-bar-chart.component';
import { ApexSplineChartComponent } from './components/charts/apex-spline-chart/apex-spline-chart.component';
import { ApexColumnChartComponent } from './components/charts/column-chart/column-chart.component';
import { CalendarModule } from 'ion2-calendar';
import { ApexPieChartComponent } from './components/charts/apex-pie-chart/apex-pie-chart.component';
import { LoginPage } from './login/login.page';
import { LoginButtonComponent } from './components/login/login-button/login-button.component';
import { ApexLineChartNewComponent } from './components/charts/apex-line-chart-new/apex-line-chart-new.component';
import { ApexDetailsLineChartComponent } from './components/charts/apex-details-line-chart/apex-details-line-chart.component';


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
    ApexLineChartNewComponent,
    ApexBarChartComponent,
    ApexSplineChartComponent,
    ApexColumnChartComponent,
    ApexPieChartComponent,
    ApexDetailsLineChartComponent
  ],
  declarations: [
    ComparisonComponent,
    ApexLineChartNewComponent,
    ApexBarChartComponent,
    ApexSplineChartComponent,
    ApexColumnChartComponent,
    ApexPieChartComponent,
    ApexDetailsLineChartComponent
  ]
})
export class SharedModule {}
