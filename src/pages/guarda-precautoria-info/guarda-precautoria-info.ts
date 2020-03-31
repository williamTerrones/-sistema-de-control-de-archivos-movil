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
    nombre_direccion:'',
    nombre_coordinacion:'',
    yearExpediente:'',
    tiempodeConvervacion:'',
    descripcionExpediente:'',
    fechaTransparencia:'',
    legajos:'',
    hojas:'',
    caracter:'',
    estatus_expediente:'',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: Http, public loading: LoadingController,) {

    this.cargarInfo(this.navParams.get('id_expediente'));
  
  }

  obtenerEstatus(status:number){
    if(status==1){
      return "Revisado";
    }
    return "Sin revisar";
  }

  obtenerTiempoRestante(yearExpediente:number,tiempodeConvervacion:number){
    
    const anio_calculado:number = +yearExpediente + +tiempodeConvervacion;
    const anio_actual:number = new Date().getFullYear();

    if(anio_calculado>anio_actual){
      const tiempo:number = anio_calculado-anio_actual;
      return `Falta ${tiempo} año(s)`;
    }
    
    return "El tiempo del expediente ha expirado";
    
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

        console.log("Expediente cargado ", this.expediente)
        loader.dismiss()

      }).catch(error => {
        console.log("Error", error)
        loader.dismiss()
      })

    })

  }

  actualizar(){
    console.log(this.expediente.estatus_expediente);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuardaPrecautoriaInfoPage');
  }

}
