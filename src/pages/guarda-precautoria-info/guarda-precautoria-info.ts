import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { LoadingController } from "ionic-angular";
import * as Constantes from '../../services/constantes/index';

@IonicPage()
@Component({
  selector: 'page-guarda-precautoria-info',
  templateUrl: 'guarda-precautoria-info.html',
})
export class GuardaPrecautoriaInfoPage {

  id_expediente:string = '';
  url_base:string = Constantes.API_ENDPOINT_BASE;

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
    url_archivo:'',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: Http, public loading: LoadingController, public alertCtrl: AlertController) {

      this.id_expediente = this.navParams.get('id_expediente');

    this.cargarInfo(this.id_expediente);
  
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
    //Configuramos los headers para hacer la petición ala api de php
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    
    let options = new RequestOptions({ headers: headers });
    //Creamos los datos a enviar a la api
    let data = {
      estatus_expediente:this.expediente.estatus_expediente,
      id_expediente:this.id_expediente,
    };
    
    let loader = this.loading.create({
    content: "Cargando, por favor espere…",
    });
    //Mostramos el loader en lo que mandamos los datos a la api
    loader.present().then(() => {
      let url = `${Constantes.API_ENDPOINT}admin/expedientes/actualizarExpediente.php`;
      console.log(url)
      this.http.post(url,data,options).toPromise().then((response) => {
        let resp = JSON.parse(JSON.stringify(response))
        resp._body = JSON.parse(resp._body)
        loader.dismiss()

        let title = '', subtitle = '';

        if(resp._body){
          title = 'Bien hecho!';
          subtitle = 'El expediente ha sido actualizado correctamente';
        } else {
          title = 'Upps!';
          subtitle = 'Ocurrió un error inesperado';
        }

        let alert = this.alertCtrl.create({
          title:title,
          subTitle:subtitle,
          buttons: ["OK"]
        });
        alert.present()

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
