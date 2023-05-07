import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { SutidetailsComponent } from './sutidetails/sutidetails.component';
import { SutiformComponent } from './sutiform/sutiform.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'regisztracio', component: RegisztracioComponent},
  {path: 'first', component: FirstComponent, canActivate: [AuthGuard]},
  {path: 'userdata/:id', component: UserdetailsComponent, canActivate: [AuthGuard]},
  {path: 'createsuti', component: SutiformComponent, canActivate: [AuthGuard]},
  {path: 'sutidata/:id', component: SutidetailsComponent, canActivate: [AuthGuard]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
