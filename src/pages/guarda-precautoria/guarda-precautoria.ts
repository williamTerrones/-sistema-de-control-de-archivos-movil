import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as Constantes from '../../services/constantes/index';
import {Http, Headers, RequestOptions}  from "@angular/http";
import {GuardaPrecautoriaInfoPage} from '../guarda-precautoria-info/guarda-precautoria-info';

@IonicPage()
@Component({
  selector: 'page-guarda-precautoria',
  templateUrl: 'guarda-precautoria.html',
})
export class GuardaPrecautoriaPage {

  expedientes:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http) {
    this.cargarExpedientes();
  }

  doRefresh(refresher) {
    this.cargarExpedientes();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  obtenerEstatus(status){
    console.log("Estatus ", status)
    if(status==="1"){
      return "Revisado";
    }
    return "Sin revisar";
  }

  verInfo(id){
    this.navCtrl.push(GuardaPrecautoriaInfoPage,{
      id_expediente:id,
    })
  }

  obtenerColorExpediente(anio, tiempo){
    const anio_actual = new Date().getFullYear();
    const anio_calculado = +anio + +tiempo;
    
    console.log("Anio actual ", anio_actual)
    console.log("ANIO CALCULADO  ", anio_calculado)

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
          let color = '';
          if(data[i].estatus_expediente==="0"){
            color = this.obtenerColorExpediente(data[i].yearExpediente,data[i].tiempodeConservacion);
          }
          this.expedientes.push({
            id_expediente:data[i].id_expediente,
            nombre_direccion:data[i].nombre_direccion,
            nombre_coordinacion:data[i].nombre_coordinacion,
            claveExpediente:data[i].claveExpediente,
            descripcionExpediente:data[i].descripcionExpediente,
            yearExpediente:data[i].yearExpediente,
            tiempodeConservacion:data[i].tiempodeConservacion,
            estatus_expediente:data[i].estatus_expediente,
            caracter:data[i].caracter,
            color:color,
          });
        }
      })
  }

}
