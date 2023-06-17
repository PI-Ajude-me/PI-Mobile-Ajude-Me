import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/service/login.service';
import { PessoaService } from 'src/service/pessoa.service';
import { AlertController } from '@ionic/angular';
import { PessoaCategoria } from 'src/model/enums/pessoacategoria';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = "";
  senha: string = "";
  email: string = "";


  constructor(public router: Router, private loginService: LoginService, private pessoaService: PessoaService, private alertController: AlertController) { }

  ngOnInit() {
  }

  goDash() {
    localStorage.removeItem("pi_ajuda_me_access_token");
    localStorage.removeItem("pessoafisica");
    localStorage.removeItem("pessoajuridica");
    
    if (this.usuario.trim() !== "", this.senha.trim() !== "") {
      this.loginService.login(this.usuario.trim(), this.senha.trim()).subscribe(r => {
        let token = r.access_token;
        this.email = r.login;
        if (token != null && r.tipo!) {
          localStorage.setItem("pi_ajuda_me_access_token", token);
          if (r.tipo === "cpf") {
            this.pessoaService.getPessoaPfByEmail(r.login).subscribe(re => {
              if (re.pessoacategoria === PessoaCategoria.ADMIN) {
                localStorage.setItem("pessoafisica", r.login);
                this.alertLogin("Bem Vindo Ao Ajuda-Me Administrador!")
                this.router.navigateByUrl('/dashboard/home-tab')
              } else {
                this.alertLogin("Login Inválido, Precisa Ser Administrador para Logar!")
                localStorage.removeItem("pi_ajuda_me_access_token");
              }
            });
          }
        } else {
          this.alertLogin("Erro ao Fazer o Login, Usuario ou Senha Inválido!")
        }
      });
    } else {
      this.alertLogin("Usuário e senha é obrigatório!")
    }
  }

  goRegister() {
    this.router.navigateByUrl('/register');
  }

  goAcesso() {
    this.router.navigateByUrl('/acesso');
  }

  async alertLogin(message: string) {
    const alert = await this.alertController.create({
      header: '',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}