import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { DashboardPage } from '../dashboard.page';
import { HomePage } from 'src/app/home/home.page';


@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {

  constructor(public router:Router) { }

  swiperModules = [IonicSlides];

  ngOnInit() {
  }

  goHome(){
    this.router.navigateByUrl('/home');
  }

}
