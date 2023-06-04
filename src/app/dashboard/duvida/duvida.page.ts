import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-duvida',
  templateUrl: './duvida.page.html',
  styleUrls: ['./duvida.page.scss'],
})
export class DuvidaPage implements OnInit {


  constructor(private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() {

  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Tem certeza?',
      buttons: [
        {
          text: 'Sim',
          role: 'confirmar',
        },
        {
          text: 'Não',
          role: 'Cancelar',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirmar';
  };
}
