import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import {LineChartComponent} from "../charts/line-chart/line-chart.component";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab3PageRoutingModule
    ],
    exports: [
        LineChartComponent
    ],
    declarations: [Tab3Page, LineChartComponent]
})
export class Tab3PageModule {}
