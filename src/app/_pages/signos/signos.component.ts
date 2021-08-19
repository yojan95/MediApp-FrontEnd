import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Signos } from 'src/app/_model/signos';
import { SignosService } from 'src/app/_service/signos.service';

@Component({
  selector: 'app-signos',
  templateUrl: './signos.component.html',
  styleUrls: ['./signos.component.css']
})
export class SignosComponent implements OnInit {
  dataSource: MatTableDataSource<Signos> = new MatTableDataSource();
  
  //pacientes: Paciente[]=[];
  displayedColumns: string [] = ['idSignos','temperatura','pulso','ritmo','fecha','paciente'];

  constructor(private signosService: SignosService) { }

  ngOnInit(): void {
    this.signosService.listar().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
  }

  abrirDialog(id:number){

  }

}
