import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'src/shared/api-service.service';
import { AlertController } from '@ionic/angular';
import { DoacaoService } from 'src/service/doacao.service';
import { Doacao } from 'src/model/doacao';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  adminForm!: FormGroup;
  adminModal: any;
  adminDetails: any;
  showAddBtnAdmin: boolean = true;
  showUpdateBtnAdmin: boolean = false;

  doacao: Doacao = new Doacao();
  doacoes?: Doacao[];

  constructor(private api: ApiServiceService, private fb: FormBuilder, private alertController: AlertController, private apiDoacao: DoacaoService) { }

  ngOnInit() {
    this.getAllAdminDetails();
    this.createAdminForm();
  }

  createAdminForm() {
    this.adminForm = this.fb.group({
      id: new FormControl(''),
      descricaoadmin: new FormControl(''),
      selecaoadmin: new FormControl(''),
    });
  }

  getAllAdminDetails() {
    this.apiDoacao.getDoacoes().subscribe(res => {
      this.doacoes = res;
    }, err => {
      this.alertAdmin("Erro ao Obter as Doações");
    })
  }

  onAddAdminClick() {
    this.showAddBtnAdmin = true;
    this.showUpdateBtnAdmin = false;
  }

  get id() {
    return this.adminForm.get('id')!;
  }
  get descricaoadmin() {
    return this.adminForm.get('descricaoadmin')!;
  }
  get selecaoadmin() {
    return this.adminForm.get('selecaoadmin')!;
  }

  //postAdminDetails(){
  //this.adminModal = Object.assign({}, this.adminForm.value);
  //this.api.postAdmin(this.adminModal).subscribe(res=>{
  //this.alertAdmin("Pedido adicionado com sucesso!");
  //let close = document.getElementById('close');
  //close?.click();
  //this.adminForm.reset();
  //this.getAllAdminDetails();
  //}, err=>{
  //this.alertAdmin("Erro não foi adicionado");
  //})
  //}


  deleteAdminDetail(doacao: Doacao) {
    this.apiDoacao.deleteDoacao(doacao).subscribe(res => {
      this.alertAdmin("Pedido deletado com sucesso");
      this.getAllAdminDetails();
    }, err => {
      this.alertAdmin("Erro ao deletar");
    })
  }

  editAdmin(doacao: Doacao) {
    this.showAddBtnAdmin = false;
    this.showUpdateBtnAdmin = true;
    this.apiDoacao.getDoacaoById(doacao.id).subscribe(res => {
      this.doacao = res;
      this.adminForm.controls['id'].setValue(doacao.id);
      this.adminForm.controls['descricaoadmin'].setValue(doacao.descricao);
      this.adminForm.controls['selecaoadmin'].setValue(doacao.doacaocategoria);
    });
  }

  updateAdminDetail() {
    this.doacao.descricao = this.descricaoadmin.value;
    this.doacao.doacaocategoria = this.selecaoadmin.value;
    this.doacao.data = new Date;
    this.adminModal = Object.assign({}, this.adminForm.value);
    this.apiDoacao.updateDoacao(this.doacao).subscribe(res => {
      this.alertAdmin("Pedido atualizado com sucesso");
      let close = document.getElementById('close');
      close?.click();
      this.getAllAdminDetails();
      this.adminForm.reset();
      this.adminModal = {}
    }, err => {
      this.alertAdmin("Erro ao atualizar");
    })
  }

  resetAdmin() {
    this.adminForm.reset();
    this.adminModal = {};
    this.locationreload();
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async alertAdmin(message: string) {
    const alert = await this.alertController.create({
      header: '',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  locationreload() {
    // To reload the entire page from the server
    location.reload();
  }

}
