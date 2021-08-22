import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Paciente } from 'src/app/_model/paciente';
import { Signos } from 'src/app/_model/signos';
import { PacienteService } from 'src/app/_service/paciente.service';
import { SignosService } from 'src/app/_service/signos.service';

@Component({
  selector: 'app-signos-edicion',
  templateUrl: './signos-edicion.component.html',
  styleUrls: ['./signos-edicion.component.css']
})
export class SignosEdicionComponent implements OnInit {

  form: FormGroup = new FormGroup({ });
  id: number = 0;
  edicion: boolean= false;
  title:string;
  maxFecha: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private signosService: SignosService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'temperatura': new FormControl(''),
      'pulso': new FormControl(''),
      'ritmo': new FormControl(''),
      'fecha': new FormControl(new Date()),
      'idPaciente': new FormControl(''),
      'Paciente': new FormControl(null)
    });

    this.route.params.subscribe((data: Params ) =>{
      this.id = data['id'];
      this.edicion = data['id'] != null;
      if(this.edicion){
        this.title="Modificar Signos";
      }
      this.initForm();
    });

  }

  initForm(){
    if(this.edicion){
      this.signosService.listarPorId(this.id).subscribe(data =>{
      
        this.form = new FormGroup({
          'id': new FormControl(data.idSignos),
          'temperatura': new FormControl(data.temperatura),
          'pulso': new FormControl(data.pulso),
          'ritmo': new FormControl(data.ritmo),
          'fecha': new FormControl(data.fecha),
          'idPaciente': new FormControl(data.paciente.nombres),
          'Paciente': new FormControl(data.paciente)
        });
      })
    }
  }

  operar(){
    let signos = new Signos();
    signos.idSignos = this.form.value['id'];
    signos.temperatura = this.form.value['temperatura'];
    signos.pulso = this.form.value['pulso'];
    signos.ritmo = this.form.value['ritmo'];
    signos.fecha = this.form.value['fecha'];
    signos.paciente = this.form.value['Paciente'];

    if(this.edicion){
      this.signosService.modificar(signos).subscribe(()=>{
        this.signosService.listar().subscribe(data => {
          this.signosService.setSignosCambio(data);
          this.signosService.setMensajeCambio('Se modifico');
        })
      });
    }
    this.router.navigate(['/pages/signos'])
  }

}
