import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-guarda-precautoria',
  templateUrl: 'guarda-precautoria.html',
})
export class GuardaPrecautoriaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardaPrecautoriaPage');
  }

}
