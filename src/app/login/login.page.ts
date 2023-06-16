import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/service/login.service';
import { PessoaService } from 'src/service/pessoa.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = "";
  senha: string = "";
  email: string = "";


  constructor(public router:Router,private loginService: LoginService, private pessoaService: PessoaService, private alertController: AlertController) { }

  ngOnInit() {
  }


  async goDash(){
    localStorage.removeItem("pi_ajuda_me_access_token");

    if(this.usuario.trim() !=="" , this.senha.trim() !==""){
      this.loginService.login(this.usuario.trim(), this.senha.trim()).subscribe(r => {
        let token = r.access_token;
        this.email = r.login;
        if (token != null&& r.tipo!) {
          localStorage.setItem("pi_ajuda_me_access_token", token);
          this.router.navigateByUrl('/dashboard/home-tab') 
        }
      }); 
    }else{
      const myalert = await this.alertController.create({
        message: 'Usuário e senha é obrigatório!',
        buttons: ['OK'],
      });
      await myalert.present();
    }

  }

  goRegister(){
    this.router.navigateByUrl('/register'); 
  }

  goAcesso(){
    this.router.navigateByUrl('/acesso'); 
  }

}