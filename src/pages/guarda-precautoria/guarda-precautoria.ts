import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as Constantes from '../../services/constantes/index';
import {Http, Headers, RequestOptions}  from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-guarda-precautoria',
  templateUrl: 'guarda-precautoria.html',
})
export class GuardaPrecautoriaPage {

  expedientes:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http,) {
    this.cargarExpedientes();
  }

  doRefresh(refresher) {
    this.cargarExpedientes();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  cargarExpedientes(){

    //Configuramos los headers para hacer la petición ala api de php
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    
    let options = new RequestOptions({ headers: headers });
    //Creamos los datos a enviar a la api
    //Mostramos el loader en lo que mandamos los datos a la api
      let url = `${Constantes.API_ENDPOINT}admin/expedientes/expedientes.php`;
      console.log("UrL "+ url)
      this.http.get(url,options).toPromise().then((response) => {
        let resp = JSON.parse(JSON.stringify(response))
        resp._body = JSON.parse(resp._body)
        console.log("Response guarda precautoria", resp)
        this.expedientes = resp._body;
      })
  }

}
