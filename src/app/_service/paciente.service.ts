import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../_model/paciente';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends GenericService<Paciente>{

  //private url:string = `${environment.HOST}/pacientes`;//template string
  private pacienteCambio: Subject<Paciente[]> = new Subject<Paciente[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();


  constructor(protected http:HttpClient){ 
    super(
      http,
      `${environment.HOST}/pacientes`);
     }


  getPacienteCambio(){
    return this.pacienteCambio.asObservable();
  }

  setPacienteCambio(lista:Paciente[]){
    this.pacienteCambio.next(lista);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje:string){
    this.mensajeCambio.next(mensaje);
  }

  listarPageable(pagina:number,tamaño:number){
    return this.http.get<any>(`${this.url}/pageable?page=${pagina}&size=${tamaño}`);
  }

}
