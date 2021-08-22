import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../_model/paciente';
import { Signos } from '../_model/signos';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SignosService  extends GenericService<Signos>{

  private pacienteCambio: Subject<Signos[]> = new Subject<Signos[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();
  private pacienteCambioModal: Subject<Paciente> = new Subject<Paciente>();

  
  constructor(protected http:HttpClient){ 
    super(
      http,
      `${environment.HOST}/signos`);
     }

     getSignosCambio(){
      return this.pacienteCambio.asObservable();
    }
  
    setSignosCambio(lista:Signos[]){
      this.pacienteCambio.next(lista);
    }
  
    getMensajeCambio(){
      return this.mensajeCambio.asObservable();
    }
  
    setMensajeCambio(mensaje:string){
      this.mensajeCambio.next(mensaje);
    }

    getPacienteCambio(){
      return this.pacienteCambioModal.asObservable();
    }
  
    setPacienteCambio(lista:Paciente){
      this.pacienteCambioModal.next(lista);
    }
  

}
