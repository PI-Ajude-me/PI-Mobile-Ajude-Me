import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from 'src/shared/auth-guard-service';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    canActivate: [AuthGuardService],
    children: [
      {
       path: 'home-tab',
       loadChildren: () => import('./home-tab/home-tab.module').then(m => m.HomeTabPageModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
      },
      {
        path: 'duvida',
        loadChildren: () => import('./duvida/duvida.module').then( m => m.DuvidaPageModule)
      },
      {
        path: 'ranking',
        loadChildren: () => import('./ranking/ranking.module').then( m => m.RankingPageModule)
      },
      {
        path: 'eventos',
        loadChildren: () => import('./eventos/eventos.module').then( m => m.EventosPageModule)
      },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
