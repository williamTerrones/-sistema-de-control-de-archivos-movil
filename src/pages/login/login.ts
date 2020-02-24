import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import {Http, Headers, RequestOptions}  from "@angular/http";
import { App, ViewController } from 'ionic-angular';
import { LoadingController } from "ionic-angular";
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular';
import { UsuarioProvider } from "../../providers/usuario/usuario";
import "rxjs/add/operator/map";

import {RegistroLoginPage} from '../registro-login/registro-login';
import {HomePage} from '../home/home';
import * as Constantes from '../../services/constantes/index';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild("username") username;

  @ViewChild("password") password;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
  private http: Http, public loading: LoadingController, public storage: Storage,
  public appCtrl: App, public menuController:MenuController, public usuario:UsuarioProvider) {
    this.menuController.enable(false);
    console.log("Inicia login")
  }

  signUp(){
    this.navCtrl.push(RegistroLoginPage);
  }

  signIn(){

    if(this.username.value=="" || this.password.value=="" ){
      let alert = this.alertCtrl.create({
      title:"Atención",
      subTitle:"El campo de contraseña o usuario no están completos",
      buttons: ["OK"]
      });
      alert.present();
      return false;
    }
    //Configuramos los headers para hacer la petición ala api de php
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    
    let options = new RequestOptions({ headers: headers });
    //Creamos los datos a enviar a la api
    let data = {
    usuario: this.username.value,
    pas: this.password.value
    };
    
    let loader = this.loading.create({
    content: "Cargando, por favor espere…",
    });
    //Mostramos el loader en lo que mandamos los datos a la api
    loader.present().then(() => {
      let url = `${Constantes.API_ENDPOINT}login/login.php`;
      console.log(url)
      this.http.post(url,data,options).toPromise().then((response) => {
        let resp = JSON.parse(JSON.stringify(response))
        resp._body = JSON.parse(resp._body)
        //Si el codigo es distinto de 1 entonces ocurrió un error
        if(resp._body.codigo!=1){
          let alert = this.alertCtrl.create({
            title:"Atención",
            subTitle:"Usuario o contraseña incorrectos",
            buttons: ["OK"]
          });
          loader.dismiss()
          alert.present();
          return false;
        }
        //Cuando el codigo sea 1 entonces asignamos en el storage los datos del usuario
        this.storage.set('usuario',resp._body).then(() => {
          //this.appCtrl.getRootNav().push(HomePage);
          this.usuario.usuario = resp._body;
          this.navCtrl.setRoot(HomePage);
        }).catch(error => {
          console.log(error)
          let alert = this.alertCtrl.create({
            title:"Upps!",
            subTitle:"Ocurrió un error inesperado",
            buttons: ["OK"]
          });
          alert.present();
        })
        loader.dismiss()
      }).catch(error => {
        console.log("Error", error)
        loader.dismiss()
      })

    })

  }
    
}
