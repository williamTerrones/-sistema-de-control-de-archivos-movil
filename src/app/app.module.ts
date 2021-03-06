import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { OneSignal } from '@ionic-native/onesignal/ngx';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {RegistroLoginPage} from '../pages/registro-login/registro-login';
import {GuardaPrecautoriaPage} from '../pages/guarda-precautoria/guarda-precautoria';
import {GuardaPrecautoriaInfoPage} from '../pages/guarda-precautoria-info/guarda-precautoria-info';

import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { UsuarioProvider } from '../providers/usuario/usuario';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroLoginPage,
    GuardaPrecautoriaPage,
    GuardaPrecautoriaInfoPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroLoginPage,
    GuardaPrecautoriaPage,
    GuardaPrecautoriaInfoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    HttpClientModule,
    OneSignal,
  ]
})
export class AppModule {}
