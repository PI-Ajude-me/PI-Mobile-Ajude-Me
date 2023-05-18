import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PessoaCategoria } from 'src/model/enums/pessoacategoria';
import { PessoaFisica, PessoaJurica } from 'src/model/pessoa';
import { PessoaService } from 'src/service/pessoa.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  tipodecadastro: string = 'CPF';
  pessoafisica: PessoaFisica = new PessoaFisica();
  pessoajuridica: PessoaJurica = new PessoaJurica();

  constructor(public router: Router, private pessoaService: PessoaService) { }

  ngOnInit() {

  }


  goDash() {
    if (this.tipodecadastro === 'CPF') {
      this.pessoafisica.pessoacategoria = PessoaCategoria.ADMIN
      this.pessoaService.savePessoaPf(this.pessoafisica).subscribe(res => {
        alert("Admininstrador PF Salvo");
        this.router.navigateByUrl('/login')
      }, err => {
        alert("Erro no Registro");
        this.router.navigateByUrl('/register')
      });
    }
    if (this.tipodecadastro === 'CNPJ') {
      this.pessoajuridica.pessoacategoria = PessoaCategoria.ADMIN
      this.pessoaService.savePessoaPj(this.pessoajuridica).subscribe(res => {
        alert("Admininstrador PJ Salvo");
        this.router.navigateByUrl('/login')
      }, err => {
        alert("Erro no Registro");
        this.router.navigateByUrl('/register')
      });
    }
  }

  goLogin() {
    this.router.navigateByUrl('/login')
  }

  isCPF(): boolean {
    return this.pessoafisica.cpf == null ? true : this.pessoafisica.cpf.length < 12 ? true : false;
  }

  getCpfCnpjMask(): string {
    return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
  }

}
