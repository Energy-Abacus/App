import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompareDataPage } from './compare-data.page';

const routes: Routes = [
  {
    path: '',
    component: CompareDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompareDataPageRoutingModule {}
