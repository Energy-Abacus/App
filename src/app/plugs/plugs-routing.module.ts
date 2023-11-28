import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core'

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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlugsPageRoutingModule {}
