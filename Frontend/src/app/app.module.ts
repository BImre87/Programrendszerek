import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { SutidetailsComponent } from './sutidetails/sutidetails.component';
import { SutiformComponent } from './sutiform/sutiform.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    ErrorComponent,
    LoginComponent,
    RegisztracioComponent,
    UserdetailsComponent,
    SutidetailsComponent,
    SutiformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
