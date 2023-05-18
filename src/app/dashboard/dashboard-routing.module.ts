import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { AuthGuardService } from 'src/shared/auth-guard-service';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,canActivate: [AuthGuardService] ,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
