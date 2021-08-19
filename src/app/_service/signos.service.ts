import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Signos } from '../_model/signos';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SignosService  extends GenericService<Signos>{

  
  constructor(protected http:HttpClient){ 
    super(
      http,
      `${environment.HOST}/signos`);
     }

}
