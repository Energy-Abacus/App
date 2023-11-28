import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompareDataPageRoutingModule } from './compare-data-routing.module';

import { CompareDataPage } from './compare-data.page';
import { SharedModule } from 'src/app/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompareDataPageRoutingModule,
    SharedModule,
    RouterModule
  ],
  declarations: [CompareDataPage]
})
export class CompareDataPageModule {}
