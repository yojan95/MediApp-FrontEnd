import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteComponent } from './_pages/paciente/paciente.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { MedicoComponent } from './_pages/medico/medico.component';
import { PacienteEdicionComponent } from './_pages/paciente/paciente-edicion/paciente-edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EspecialidadComponent } from './_pages/especialidad/especialidad.component';
import { EspecialidadEdicionComponent } from './_pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ExamenComponent } from './_pages/examen/examen.component';
import { ExamenEdicionComponent } from './_pages/examen/examen-edicion/examen-edicion.component';
import { ConsultaComponent } from './_pages/consulta/consulta.component';
import { ConsultaEspecialComponent } from './_pages/consulta-especial/consulta-especial.component';
import { ConsultaWizardComponent } from './_pages/consulta-wizard/consulta-wizard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BuscarComponent } from './_pages/buscar/buscar.component';
import { BuscarDialogoComponent } from './_pages/buscar/buscar-dialogo/buscar-dialogo.component';
import { ReporteComponent } from './_pages/reporte/reporte.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoginComponent } from './_pages/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { ServerErrorsInterceptor } from './shared/server-errors.interceptor';


export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,    
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatFormFieldModule,  
    MatCardModule,
    MatSnackBarModule, 
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.HOST.substring(7)],
        disallowedRoutes: [`http://${environment.HOST.substring(7)}/login/enviarCorreo`],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }