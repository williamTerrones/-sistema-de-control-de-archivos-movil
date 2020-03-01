import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

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
    public storage:Storage,public usuario: UsuarioProvider,private push: Push) {

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
      this.pushSetup();
    });

  }

  pushSetup(){
    const options: PushOptions = {
       android: {
           // Añadimos el sender ID para Android.
           senderID: '326443840914'
       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       }
    };
     /*
     // Delete a channel (Android O and above)
     this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));
     
     // Return a list of currently configured channels
     this.push.listChannels().then((channels) => console.log('List of channels', channels))
 
    const pushObject: PushObject = this.push.init(options);
 
    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));*/
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

