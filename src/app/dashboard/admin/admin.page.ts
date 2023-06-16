import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'src/shared/api-service.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  adminForm!: FormGroup;
  adminModal: any;
  adminDetails: any;
  showAddBtnAdmin:boolean=true;
  showUpdateBtnAdmin:boolean=false;

  constructor(private api: ApiServiceService, private fb: FormBuilder, private alertController: AlertController) { }

  ngOnInit() {
    this.getAllAdminDetails();
    this.createAdminForm();
  }

  createAdminForm(){
    this.adminForm = this.fb.group({
      id:[''],
      descricaoadmin:[''],
      selecaoadmin:['']
    });
  }

  getAllAdminDetails(){
    this.api.getAllAdmin().subscribe(res=>{
      this.adminDetails = res;
    }, err=> {
      console.log(err);
    })
  }

  onAddAdminClick(){
    this.showAddBtnAdmin=true;
    this.showUpdateBtnAdmin=false;
  }

  postAdminDetails(){
    this.adminModal = Object.assign({}, this.adminForm.value);
    this.api.postAdmin(this.adminModal).subscribe(res=>{
      this.alertAdmin("Pedido adicionado com sucesso!");
      let close = document.getElementById('close');
      close?.click();
      this.adminForm.reset();
      this.getAllAdminDetails();
    }, err=>{
      this.alertAdmin("Erro não foi adicionado");
    })
  }


  deleteAdminDetail(id:any){
    this.api.deleteAdmin(id).subscribe(res=>{
      this.alertAdmin("Pedido deletado com sucesso");
      this.getAllAdminDetails();
    }, err=>{
      this.alertAdmin("Erro ao deletar");
    })
  }

  editAdmin(admin:any){
    this.showAddBtnAdmin=false;
    this.showUpdateBtnAdmin=true;
    this.adminForm.controls['id'].setValue(admin.id);
    this.adminForm.controls['descricaoadmin'].setValue(admin.descricaoadmin);
    this.adminForm.controls['selecaoadmin'].setValue(admin.selecaoadmin);
  }

  updateAdminDetail(){
    this.adminModal = Object.assign({}, this.adminForm.value);
    this.api.updateAdmin(this.adminModal, this.adminModal.id).subscribe(res=>{
      this.alertAdmin("Pedido atualizado com sucesso");
      let close = document.getElementById('close');
      close?.click();
      this.getAllAdminDetails();
      this.adminForm.reset();
      this.adminModal={}
    }, err=>{
      this.alertAdmin("Erro ao atualizar");
    })
  }

  resetAdmin(){
    this.adminForm.reset();
    this.adminModal={};
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

}
