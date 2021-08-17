import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {switchMap} from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  dataSource: MatTableDataSource<Paciente> = new MatTableDataSource();
  
  //pacientes: Paciente[]=[];
  displayedColumns: string [] = ['idPaciente','nombres','apellidos','acciones'];

  //recuperar un valor desde html
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cantidad: number = 0;

  constructor(
    private pacienteService:PacienteService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {

    this.pacienteService.getPacienteCambio().subscribe(data => {
      console.log("json"+JSON.stringify(data));
      this.dataSource = new MatTableDataSource(data);
    });

    this.pacienteService.getMensajeCambio().subscribe(texto =>{
      this.snackbar.open(texto, 'AVISO', {duration:2000});
    });

    this.pacienteService.listarPageable(0,10).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
    });
    /*
    this.pacienteService.listar().subscribe(data => {
      
      this.crearTabla(data); 
     //console.log("json"+JSON.stringify(data));
    });*/
    
  }

  eliminar(id:number){
    this.pacienteService.eliminar(id).pipe(switchMap(() => {
      return this.pacienteService.listar();
    }))
    .subscribe(data =>{
      this.crearTabla(data);
    })
  }

  crearTabla(data: Paciente[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filtrar(e:any){
   this.dataSource.filter = e.target.value.trim().toLowerCase();
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

 mostrarMas(e:any){
  this.pacienteService.listarPageable(e.pageIndex, e.pageSize).subscribe(data =>{
    this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
  })
 }
 
}
