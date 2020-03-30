import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from "ionic-angular";
import * as Constantes from '../../services/constantes/index';

@IonicPage()
@Component({
  selector: 'page-guarda-precautoria-info',
  templateUrl: 'guarda-precautoria-info.html',
})
export class GuardaPrecautoriaInfoPage {

  expediente:any = {
    claveExpediente:'',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: Http, public loading: LoadingController,) {

    this.cargarInfo(this.navParams.get('id_expediente'));
  
  }

  cargarInfo(id_expediente){

    //Configuramos los headers para hacer la petición ala api de php
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    
    let options = new RequestOptions({ headers: headers });
    //Creamos los datos a enviar a la api
    let data = {
      id_expediente:id_expediente
    };
    
    let loader = this.loading.create({
    content: "Cargando, por favor espere…",
    });
    //Mostramos el loader en lo que mandamos los datos a la api
    loader.present().then(() => {
      let url = `${Constantes.API_ENDPOINT}admin/expedientes/expediente.php`;
      console.log(url)
      this.http.post(url,data,options).toPromise().then((response) => {
        let resp = JSON.parse(JSON.stringify(response))
        resp._body = JSON.parse(resp._body)

        this.expediente = resp._body;
        loader.dismiss()

      }).catch(error => {
        console.log("Error", error)
        loader.dismiss()
      })

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardaPrecautoriaInfoPage');
  }

}
