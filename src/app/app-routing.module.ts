import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './_pages/layout/layout.component';
import { LoginComponent } from './_pages/login/login.component';
import { RecuperarComponent } from './_pages/login/recuperar/recuperar.component';
import { TokenComponent } from './_pages/login/recuperar/token/token.component';
import { Not404Component } from './_pages/not404/not404.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'recuperar', component: RecuperarComponent, children:[
      { path: ':token', component: TokenComponent}
    ]
  },
  {
    path: 'pages',
    component: LayoutComponent,
    loadChildren: () => import('./_pages/pages.module').then(m => m.PagesModule)
  },
  {path: 'not-404', component: Not404Component},
  {
    path: '**',
    redirectTo: 'not-404' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
