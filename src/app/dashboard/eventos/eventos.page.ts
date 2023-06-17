import { Component, OnInit,Pipe } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiServiceService } from 'src/shared/api-service.service';
import { AlertController } from '@ionic/angular';
import { Evento } from 'src/model/evento';
import { EventosService } from 'src/service/eventos.service';
import { DataserviceService } from 'src/service/dataservice.service';
import { PessoaService } from 'src/service/pessoa.service';
import { PessoaFisica, PessoaJurica } from 'src/model/pessoa';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  eventosForm!: FormGroup;
  eventosModal: any;
  eventosDetails: any;
  showAddBtn: boolean = true;
  showUpdateBtn: boolean = false;

  pessoafisica: PessoaFisica = new PessoaFisica();
  pessoajuridica: PessoaJurica = new PessoaJurica();
  evento: Evento = new Evento();
  eventos?: Evento[];


  constructor(private api: ApiServiceService, private fb: FormBuilder, private alertController: AlertController, private apiEventos: EventosService, private dataservice: DataserviceService,private apiPessoa: PessoaService) { }

  ngOnInit() {
    this.getAllEventosDetails();
    this.createEventosForm();
    let tokenpf = localStorage.getItem("pessoafisica");
    let tokenpj = localStorage.getItem("pessoajuridica");
    if (tokenpf != null) {
      this.apiPessoa.getPessoaPfByEmail(tokenpf).subscribe(re => {
        this.dataservice.setPessoaFisica(re);
        this.pessoafisica = this.dataservice.getPessoaFisica();
        this.evento.fisicaeventos = this.pessoafisica;
      });
    }else if (tokenpj != null) {
      this.apiPessoa.getPessoaPjByEmail(tokenpj).subscribe(re => {
        this.dataservice.setPessoaJuridica(re);
        this.pessoajuridica = this.dataservice.getPessoaJuridica();
        this.evento.fisicaeventos = this.pessoajuridica;
      });
    }else{
      this.alertEventos("Erro ao Obter os dados do Usuario!");
    }
  }

  createEventosForm() {
    this.eventosForm = this.fb.group({
      id: new FormControl(''),
      tituloevento: new FormControl(''),
      descricaoevento: new FormControl(''),
      dataevento: new FormControl('')
    });
  }

  get id() {
    return this.eventosForm.get('id')!;
  }
  get tituloevento() {
    return this.eventosForm.get('tituloevento')!;
  }
  get descricaoevento() {
    return this.eventosForm.get('descricaoevento')!;
  }
  get dataevento() {
    return this.eventosForm.get('dataevento')!;
  }

  getAllEventosDetails() {
    this.apiEventos.getEventos().subscribe(res => {
      this.eventos = res;
    }, err => {
      this.alertEventos("Erro ao Obter os Eventos!");
    })
  }

  onAddClick() {
    this.eventosForm.reset();
    this.showAddBtn = true;
    this.showUpdateBtn = false;
  }

  postEventosDetails() {
    this.evento.titulo = this.tituloevento.value;
    this.evento.descricao = this.descricaoevento.value;
    this.evento.data = this.dataevento.value;
    this.apiEventos.saveEvento(this.evento).subscribe(
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


  deleteEventosDetail(evento: Evento) {
    this.apiEventos.deleteEvento(evento).subscribe(
      res => {
        this.alertEventos('Evento deletado com sucesso');
        this.getAllEventosDetails();
      },
      err => {
        this.alertEventos('Erro ao deletar');
      }
    );
  }


  edit(evento: Evento) {
    this.showAddBtn = false;
    this.showUpdateBtn = true;
    this.eventosForm.controls['id'].setValue(evento.id);
    this.eventosForm.controls['tituloevento'].setValue(evento.titulo);
    this.eventosForm.controls['descricaoevento'].setValue(evento.descricao);
    this.eventosForm.controls['dataevento'].setValue(evento.data);
    this.evento = evento;
  }

  updateEventosDetail() {
    console.log(this.evento.id)
    this.evento.titulo = this.tituloevento.value;
    this.evento.descricao = this.descricaoevento.value;
    this.evento.data = this.dataevento.value;
    this.apiEventos.updateEvento(this.evento).subscribe(res => {
      this.alertEventos("Evento atualizado com sucesso");
      let close = document.getElementById('close');
      close?.click();
      this.getAllEventosDetails();
      this.eventosForm.reset();
    }, err => {
      this.alertEventos("Erro ao atualizar");
    })
  }


  reset() {
    this.eventosForm.reset();
    this.eventosModal = {};
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
