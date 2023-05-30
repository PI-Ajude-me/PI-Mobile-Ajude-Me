import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HankingPageRoutingModule } from './hanking-routing.module';

import { HankingPage } from './hanking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HankingPageRoutingModule,
  ],
  declarations: [HankingPage]
})
export class HankingPageModule {}
