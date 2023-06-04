import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  goHome(){
    localStorage.removeItem("pi_ajuda_me_access_token");
    this.router.navigateByUrl('/home') 
  }

  goHomeTab(){
    this.router.navigateByUrl('/dashboard/home-tab')
  }

  public alertButtons = [
    {
      text: 'Não',
      cssClass: 'alert-button-cancel',
      handler: () => {
        this.goHomeTab();
      },
    },
    {
      text: 'Sim',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.goHome();
      },
    },
  ];

}
