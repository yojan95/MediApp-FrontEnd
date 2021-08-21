import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Signos } from 'src/app/_model/signos';
import { SignosService } from 'src/app/_service/signos.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-signos',
  templateUrl: './signos.component.html',
  styleUrls: ['./signos.component.css']
})
export class SignosComponent implements OnInit {
  dataSource: MatTableDataSource<Signos> = new MatTableDataSource();
  
  displayedColumns: string [] = ['idSignos','temperatura','pulso','ritmo','fecha','paciente','acciones'];

  constructor(
    private signosService: SignosService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
    ) { }

  ngOnInit(): void {

    this.signosService.getSignosCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })

    this.signosService.getMensajeCambio().subscribe(texto =>{
      this.snackbar.open(texto, 'AVISO', {duration:2000});
    });

    this.signosService.listar().subscribe(data => {
      this.listarTabla(data);
    });
  }

  eliminar(id:number){
    this.signosService.eliminar(id).pipe(switchMap(() => {
      return this.signosService.listar();
    }))
    .subscribe(data => {
      this.listarTabla(data);
    }); 
  }

  abrirDialog(id:number){
    const dialogR = this.dialog.open(ConfirmDialogComponent,{
      width: '250px'
    });
   dialogR.afterClosed().subscribe(resp =>{
      if(resp){
        this.eliminar(id);
      }
    })
   }
  
   listarTabla(data :any){
    this.dataSource = new MatTableDataSource(data);
   }

}
