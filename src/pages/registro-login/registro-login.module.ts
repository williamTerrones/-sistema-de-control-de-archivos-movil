import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistroLoginPage } from './registro-login';

@NgModule({
  declarations: [
    RegistroLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistroLoginPage),
  ],
})
export class RegistroLoginPageModule {}
