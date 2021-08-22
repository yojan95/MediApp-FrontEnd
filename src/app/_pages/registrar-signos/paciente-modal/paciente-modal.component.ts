import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';
import { SignosService } from 'src/app/_service/signos.service';

@Component({
  selector: 'app-paciente-modal',
  templateUrl: './paciente-modal.component.html',
  styleUrls: ['./paciente-modal.component.css']
})
export class PacienteModalComponent implements OnInit {
  formModal: FormGroup = new FormGroup({});
  title:string="Nuevo Paciente";

  constructor(
    private pacienteService: PacienteService,
    private signosService: SignosService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formModal = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'telefono': new FormControl(''),
      'direccion': new FormControl(''),
      'email': new FormControl('')
    });

  }

  registrarPaciente(){
    let paciente = new Paciente();
    paciente.idPaciente = this.formModal.value['id'];
    paciente.nombres = this.formModal.value['nombres'];
    paciente.apellidos = this.formModal.value['apellidos'];
    paciente.dni = this.formModal.value['dni'];
    paciente.telefono = this.formModal.value['telefono'];
    paciente.direccion = this.formModal.value['direccion'];
    paciente.email = this.formModal.value['email'];
    this.signosService.setPacienteCambio(paciente);
    this.pacienteService.registrar(paciente).pipe(switchMap(()=>{
      return this.pacienteService.listar();
    }))
    .subscribe(data => {
      this.pacienteService.setPacienteCambio(data);
      this.signosService.setMensajeCambio('Paciente registrado');
      this.dialog.closeAll();
    });
  }

  ngOnchanges(changes: SimpleChange){
    changes.currentValue
  }


}
