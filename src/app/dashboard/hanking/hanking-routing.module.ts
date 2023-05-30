import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HankingPage } from './hanking.page';

const routes: Routes = [
  {
    path: '',
    component: HankingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HankingPageRoutingModule {}
