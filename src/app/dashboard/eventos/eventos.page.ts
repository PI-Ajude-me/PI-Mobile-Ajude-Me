import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'src/shared/api-service.service';

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

  constructor(private api: ApiServiceService, private fb: FormBuilder) { }

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

  postEventosDetails(){
    this.eventosModal = Object.assign({}, this.eventosForm.value);
    this.api.postEventos(this.eventosModal).subscribe(res=>{
      alert("Evento adicionado com sucesso!");
      let close = document.getElementById('close');
      close?.click();
      this.eventosForm.reset();
      this.getAllEventosDetails();
    }, err=>{
      alert("Erro não foi adicionado");
    })
  }

  deleteEventosDetail(id:any){
    this.api.deleteEventos(id).subscribe(res=>{
      alert("Evento deletado com sucesso");
      this.getAllEventosDetails();
    }, err=>{
      alert ("Erro ao deletar");
    })
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
      alert("Evento atualizado com sucesso");
      let close = document.getElementById('close');
      close?.click();
      this.getAllEventosDetails();
      this.eventosForm.reset();
      this.eventosModal={}
    }, err=>{
      alert ("Erro ao atualizar");
    })
  }

  reset(){
    this.eventosForm.reset();
    this.eventosModal={};
  }


}
