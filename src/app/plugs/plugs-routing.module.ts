import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlugsPage } from './plugs.page';

const routes: Routes = [
  {
    path: '',
    component: PlugsPage
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'plug-comparism/:firstId/:secondId',
    loadChildren: () => import('./plug-comparism/plug-comparism.module').then( m => m.PlugComparismPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlugsPageRoutingModule {}
