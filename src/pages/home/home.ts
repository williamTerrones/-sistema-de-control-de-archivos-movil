import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { MenuController } from 'ionic-angular';
import { UsuarioProvider } from "../../providers/usuario/usuario";
import * as Constantes from '../../services/constantes/index';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  areas:any = [];

  constructor(public navCtrl: NavController,public viewCtrl: ViewController,
    public appCtrl: App, public storage:Storage, public menuController:MenuController,
    public usuario: UsuarioProvider,private http: Http,) {
      this.menuController.enable(true);
      this.cargarAreas();
  }

  doRefresh(refresher) {
    this.cargarAreas();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  cargarAreas(){

    //Configuramos los headers para hacer la petición ala api de php
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    
    let options = new RequestOptions({ headers: headers });
    //Creamos los datos a enviar a la api
    //Mostramos el loader en lo que mandamos los datos a la api
      let url = `${Constantes.API_ENDPOINT}admin/areas.php`;
      console.log("UrL "+ url)
      this.http.get(url,options).toPromise().then((response) => {
        let resp = JSON.parse(JSON.stringify(response))
        resp._body = JSON.parse(resp._body)
        console.log("Response", resp)
        this.areas = resp._body;
      })
  }

}
