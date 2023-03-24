import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlugsPage } from './plugs.page';

const routes: Routes = [
  {
    path: '',
    component: PlugsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlugsPageRoutingModule {}
