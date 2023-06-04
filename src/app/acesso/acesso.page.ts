import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.page.html',
  styleUrls: ['./acesso.page.scss'],
})
export class AcessoPage implements OnInit {

  constructor(public router:Router) {}

  ngOnInit() {
  }

  goRegister(){
    this.router.navigateByUrl('/register'); 
  }

}
