import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MedicoDialogComponent } from './medico-dialog/medico-dialog.component';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  displayedColumns = ['idmedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  dataSource: MatTableDataSource<Medico>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private medicoService: MedicoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
    this.medicoService.getMedicoCambio().subscribe(data => {
      this.crearTabla(data);
    });

    this.medicoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.medicoService.listar().subscribe(data => {
      this.crearTabla(data);
    });
    
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  crearTabla(data: Medico[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 
  abrirDialogo(medico?: Medico) {
    
    this.dialog.open(MedicoDialogComponent, {
      width: '250px',
      data: medico //data que quiero enviar al dialogComponet
    });
    
  }

  abrirDialogConfirm(medico: Medico){
    const dialogR = this.dialog.open(ConfirmDialogComponent,{});
   dialogR.afterClosed().subscribe(resp =>{
      if(resp){
        this.eliminar(medico);
      }
    })
  
    
   }
  
 
  eliminar(medico: Medico) {
    
    this.medicoService.eliminar(medico.idMedico).pipe(switchMap(() => {
      return this.medicoService.listar();
    }))
      .subscribe(data => {
        this.medicoService.setMensajeCambio("SE ELIMINO");
        this.medicoService.setMedicoCambio(data);
      });
      
  }



}
