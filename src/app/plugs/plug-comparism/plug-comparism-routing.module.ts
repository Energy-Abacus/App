import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlugComparismPage } from './plug-comparism.page';

const routes: Routes = [
  {
    path: '',
    component: PlugComparismPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlugComparismPageRoutingModule {}
