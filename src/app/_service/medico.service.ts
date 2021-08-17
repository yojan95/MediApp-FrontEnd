import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../_model/medico';
import { GenericService } from './generic.service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService extends GenericService<Medico>{

  private medicoCambio: Subject<Medico[]> = new Subject<Medico[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();
  
  constructor(protected http:HttpClient){ 
    super(
      http,
      `${environment.HOST}/medico`);
     }


     getMedicoCambio(){
      return this.medicoCambio.asObservable();
    }
  
    setMedicoCambio(lista:Medico[]){
      this.medicoCambio.next(lista);
    }
  
    getMensajeCambio(){
      return this.mensajeCambio.asObservable();
    }
  
    setMensajeCambio(mensaje:string){
      this.mensajeCambio.next(mensaje);
    }
}
