import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { LoginPage } from '../pages/login/login';
import {HomePage} from '../pages/home/home';
import {GuardaPrecautoriaPage} from '../pages/guarda-precautoria/guarda-precautoria';

import { Storage } from '@ionic/storage';
import { UsuarioProvider } from "../providers/usuario/usuario";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('NAV')nav: Nav;
  rootPage:any = LoginPage;
  public pages: Array<{titulo:string, component:any, icon:string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public storage:Storage,public usuario: UsuarioProvider, private oneSignal:OneSignal,
    public alertCtrl: AlertController) {

    this.pages = [
      {titulo:"Áreas",component:HomePage ,icon:"md-albums"},
      {titulo:"Guarda precautoria",component:GuardaPrecautoriaPage ,icon:"md-folder"},
    ];

    console.log("Inicia app component");

    platform.ready().then(() => {
      this.storage.get('usuario').then((usuario) => {
        this.rootPage = usuario===null ? LoginPage : HomePage;
        this.usuario.usuario = usuario;
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if(platform.is('cordova')){
        this.setupPush();
      }
    });

  }



  setupPush(){

    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window["plugins"].OneSignal
      .startInit("8d7a87f4-88c5-4e96-873a-1b938e7923b2", "1007916367789")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
  }

  async showAlert(title,msg,task){
    
    const alert = await this.alertCtrl.create({
      title:title,
      subTitle:msg,
      buttons: [{
        text:`Acción ${task}`,
        handler:() => {

        }
      }]
      });
      
      alert.present();
  }

  cargarUsuario(){
    this.storage.get('usuario');
  }

  goToPage(page) {
    this.nav.setRoot(page);
  }

  cerrarSesion() {
    this.storage.remove('usuario').then(() => {
      console.log("Usuario removido")
      this.usuario.usuario = null;
      //this.appCtrl.getRootNav().push(LoginPage);
      //this.rootPage = LoginPage;
      this.nav.setRoot(LoginPage);
    })
  }

}

