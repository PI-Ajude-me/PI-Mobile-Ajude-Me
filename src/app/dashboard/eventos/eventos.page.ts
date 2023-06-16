import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'src/shared/api-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  eventosForm!: FormGroup;
  eventosModal: any;
  eventosDetails: any;
  showAddBtn:boolean=true;
  showUpdateBtn:boolean=false;

  constructor(private api: ApiServiceService, private fb: FormBuilder, private alertController: AlertController) { }

  ngOnInit() {
    this.getAllEventosDetails();
    this.createEventosForm();
  }

  createEventosForm(){
    this.eventosForm = this.fb.group({
      id:[''],
      tituloevento:[''],
      descricaoevento:[''],
      dataevento:['']
    });
  }

  getAllEventosDetails(){
    this.api.getAllEventos().subscribe(res=>{
      this.eventosDetails = res;
    }, err=> {
      console.log(err);
    })
  }

  onAddClick(){
    this.showAddBtn=true;
    this.showUpdateBtn=false;
  }

  postEventosDetails() {
    this.eventosModal = Object.assign({}, this.eventosForm.value);
    this.api.postEventos(this.eventosModal).subscribe(
      res => {
        this.alertEventos('Evento adicionado com sucesso!');
        let close = document.getElementById('close');
        close?.click();
        this.eventosForm.reset();
        this.getAllEventosDetails();
      },
      err => {
        this.alertEventos('Erro: não foi possível adicionar o evento');
      }
    );
  }


  deleteEventosDetail(id: any) {
    this.api.deleteEventos(id).subscribe(
      res => {
        this.alertEventos('Evento deletado com sucesso');
        this.getAllEventosDetails();
      },
      err => {
        this.alertEventos('Erro ao deletar');
      }
    );
  }
  

  edit(evento:any){
    this.showAddBtn=false;
    this.showUpdateBtn=true;
    this.eventosForm.controls['id'].setValue(evento.id);
    this.eventosForm.controls['tituloevento'].setValue(evento.tituloevento);
    this.eventosForm.controls['descricaoevento'].setValue(evento.descricaoevento);
    this.eventosForm.controls['dataevento'].setValue(evento.dataevento);
  }

  updateEventosDetail(){
    this.eventosModal = Object.assign({}, this.eventosForm.value);
    this.api.updateEventos(this.eventosModal, this.eventosModal.id).subscribe(res=>{
      this.alertEventos("Evento atualizado com sucesso");
      let close = document.getElementById('close');
      close?.click();
      this.getAllEventosDetails();
      this.eventosForm.reset();
      this.eventosModal={}
    }, err=>{
      this.alertEventos("Erro ao atualizar");
    })
  }


  reset(){
    this.eventosForm.reset();
    this.eventosModal={};
  }


  async alertEventos(message: string) {
    const alert = await this.alertController.create({
      header: '',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

}
