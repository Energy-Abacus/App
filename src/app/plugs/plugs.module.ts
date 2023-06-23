import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlugsPageRoutingModule } from './plugs-routing.module';

import { PlugsPage } from './plugs.page';

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
