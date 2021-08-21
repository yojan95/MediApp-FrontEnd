import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Paciente } from 'src/app/_model/paciente';
import { Signos } from 'src/app/_model/signos';
import { PacienteService } from 'src/app/_service/paciente.service';
import { SignosService } from 'src/app/_service/signos.service';

@Component({
  selector: 'app-registrar-signos',
  templateUrl: './registrar-signos.component.html',
  styleUrls: ['./registrar-signos.component.css']
})
export class RegistrarSignosComponent implements OnInit {

  form: FormGroup = new FormGroup({ });
  title:string ="Registrar Signos";
  pacientes: Paciente[];
  myControlPaciente: FormControl = new FormControl();
  pacientesFiltrados$: Observable<Paciente[]>;
  maxFecha: Date = new Date();
  constructor(
    private signosService: SignosService,
    private pacienteService: PacienteService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'temperatura': new FormControl(''),
      'pulso': new FormControl(''),
      'ritmo': new FormControl(''),
      'fecha': new FormControl(new Date()),
      'idPaciente': this.myControlPaciente
    });

    this.listarPacientes();
    this.pacientesFiltrados$ = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val)));
  }

  filtrarPacientes(val: any) {    
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(el =>
        el.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || el.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || el.dni.includes(val.dni)
      );
    }
    return this.pacientes.filter(el =>
      el.nombres.toLowerCase().includes(val?.toLowerCase()) || el.apellidos.toLowerCase().includes(val?.toLowerCase()) || el.dni.includes(val)
    );
  }

  mostrarPaciente(val: any) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  listarPacientes(){
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  operar(){
    let signos = new Signos();
    signos.idSignos = this.form.value['id'];
    signos.temperatura = this.form.value['temperatura'];
    signos.pulso = this.form.value['pulso'];
    signos.ritmo = this.form.value['ritmo'];
    signos.fecha = this.form.value['fecha'];
    signos.paciente = this.form.value['idPaciente'];
    
    this.signosService.registrar(signos).pipe(switchMap(() =>{
      return this.signosService.listar();
    }))
    .subscribe(data =>{
      this.signosService.setSignosCambio(data);
      this.signosService.setMensajeCambio('Se registro');
    });
    this.router.navigate(['/pages/signos'])
  }
}
