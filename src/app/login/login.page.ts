import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/service/login.service';
import { PessoaService } from 'src/service/pessoa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = "";
  senha: string = "";
  email: string = "";


  constructor(public router:Router,private loginService: LoginService, private pessoaService: PessoaService) { }

  ngOnInit() {
  }

  goDash(){
    localStorage.removeItem("pi_ajuda_me_access_token");

    if(this.usuario.trim() !=="" , this.senha.trim() !==""){
      this.loginService.login(this.usuario.trim(), this.senha.trim()).subscribe(r => {
        let token = r.access_token;
        this.email = r.login;
        if (token != null&& r.tipo!) {
          localStorage.setItem("pi_ajuda_me_access_token", token);
          this.router.navigateByUrl('/dashboard') 
        }
      }); 
    }else{
      alert("Usuario e Senha é Obrigatório!");
    }

   
  }

  goRegister(){
    this.router.navigateByUrl('/register') 
  }

}
