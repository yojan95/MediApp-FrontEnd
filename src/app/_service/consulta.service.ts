import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Consulta } from '../_model/consulta';
import { FiltroConsultaDTO } from '../_model/filtroConsultaDTO';
import { ConsultaListaExamenDTO } from '../_model/ConsultaListaExamenDTO';
import { ConsultaResumenDTO } from '../_model/ConsultaResumenDTO';


@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private url: string = `${environment.HOST}/consultas`;

  constructor(
    private http: HttpClient
  ) { }

  registrarTransaccion(consultaDTO: ConsultaListaExamenDTO) {
    return this.http.post(this.url, consultaDTO);
  }

  buscarOtros(filtroConsulta: FiltroConsultaDTO){
    return this.http.post<Consulta[]>(`${this.url}/buscar/otros`,filtroConsulta);
  }

  buscarFecha(fecha: string){
    return this.http.get<Consulta[]>(`${this.url}/buscar?fecha=${fecha}`);
  }

  listarExamenPorConsulta(idConsulta:number){
    return this.http.get<ConsultaListaExamenDTO[]>(`${environment.HOST}/consultaexamenes/${idConsulta}`);
  }

  listarResumen(){
    return this.http.get<ConsultaResumenDTO[]>(`${this.url}/listarResumen`);
  }

  /*
  expresar a angular que no va a resivir un json si no bytes
  */
  generarReporte(){
    return this.http.get(`${this.url}/generarReporte`, {
      responseType: 'blob'
    });
  }
  
  guardarArchivo(data: File) { //medico: Medico
    let formdata: FormData = new FormData;
    formdata.append('adjunto', data);
    //let medicoBlob = new Blob([JSON.stringify(medico)], { type: "application/json" }); 
    //formdata.append('medico', medicoBlob);

    return this.http.post(`${this.url}/guardarArchivo`, formdata);
  }

  leerArchivo() {
    return this.http.get(`${this.url}/leerArchivo/1`, {
      responseType: 'blob'
    });
  }

}
