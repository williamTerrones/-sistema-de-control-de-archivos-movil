import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioProvider {

  public usuario: any = null;

  constructor(public http: HttpClient) {
    console.log('Hello UsuarioProvider Provider');
  }

}
