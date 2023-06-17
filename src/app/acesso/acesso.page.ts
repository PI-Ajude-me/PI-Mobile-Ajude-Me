import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.page.html',
  styleUrls: ['./acesso.page.scss'],
})
export class AcessoPage implements OnInit {

  codigo: string = "";

  constructor(public router:Router,private alertController: AlertController) {}

  ngOnInit() {
  }

  async goRegister(){
    if(this.codigo.trim() !=="" && this.codigo==="010203"){
      this.router.navigateByUrl('/register'); 
    }else{
      const myalert = await this.alertController.create({
        message: 'Precisa Ter o Codigo para ter acesso ao Registro!',
        buttons: ['OK'],
      });
      await myalert.present();
    }    
  }
}
