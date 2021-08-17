import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';

@Component({
  selector: 'app-medico-dialog',
  templateUrl: './medico-dialog.component.html',
  styleUrls: ['./medico-dialog.component.css']
})
export class MedicoDialogComponent implements OnInit {

  medico: Medico;

  constructor(
    private dialogRef: MatDialogRef<MedicoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Medico,
    private medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.medico = {...this.data} //Spread operator;
  }

  operar(){
    if(this.medico != null && this.medico.idMedico > 0){
      this.medicoService.modificar(this.medico).pipe(switchMap(() => {
        return this.medicoService.listar();
      }))
      .subscribe(data =>{
        this.medicoService.setMedicoCambio(data);
        this.medicoService.setMensajeCambio("Se modifico!");
      });
    }else{
      this.medicoService.registrar(this.medico).subscribe(()=>{
        this.medicoService.listar().subscribe(data =>{
          this.medicoService.setMedicoCambio(data);
          this.medicoService.setMensajeCambio("Se registro!");
        });
      });
    }
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }

}
