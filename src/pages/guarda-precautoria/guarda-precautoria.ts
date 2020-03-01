import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as Constantes from '../../services/constantes/index';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@IonicPage()
@Component({
  selector: 'page-guarda-precautoria',
  templateUrl: 'guarda-precautoria.html',
})
export class GuardaPrecautoriaPage {

  expedientes:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http,private push: Push) {
    this.cargarExpedientes();
  }

  doRefresh(refresher) {
    this.cargarExpedientes();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  test(){
    this.push.createChannel({
      id: "testchannel1",
      description: "My first test channel",
      // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
      importance: 3
     }).then(() => alert("Notificacion creada")).catch(error => {
       alert(error);
     })
  }

  obtenerColorExpediente(anio, tiempo){
    const anio_actual = new Date().getFullYear();
    const anio_calculado = +anio + +tiempo;
    
    console.log("Anio actual ", anio_actual)
    console.log("ANIO CALCULADO ", anio_calculado)

    if(anio_actual>=anio_calculado){
      return "rojo";
    }
    return "";
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
        const data = resp._body;
        this.expedientes = [];
        for(var i in data){
          const color = this.obtenerColorExpediente(data[i].yearExpediente,data[i].tiempodeConservacion);
          this.expedientes.push({
            id_expediente:data[i].id_expediente,
            nombre_direccion:data[i].nombre_direccion,
            nombre_coordinacion:data[i].nombre_coordinacion,
            claveExpediente:data[i].claveExpediente,
            descripcionExpediente:data[i].descripcionExpediente,
            yearExpediente:data[i].yearExpediente,
            tiempodeConservacion:data[i].tiempodeConservacion,
            caracter:data[i].caracter,
            color:color,
          });
        }
      })
  }

}
