import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'compare-data',
    loadChildren: () => import('./components/compare-data/compare-data.module').then( m => m.CompareDataPageModule)
  },
  {
    path: 'view-profile/:id',
    loadChildren: () => import('./components/social-system/view-profile/view-profile.module').then( m => m.ViewProfilePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
