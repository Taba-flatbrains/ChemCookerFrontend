import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChemicalComponent } from './chemical/chemical.component';

import {CdkDrag} from '@angular/cdk/drag-drop';
import { ChemBarComponent } from './chem-bar/chem-bar.component';
import { CdkScrollable } from "@angular/cdk/scrolling";
import { ReactiveFormsModule } from '@angular/forms';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoggedInService } from './login/logged-in.service';
import { BackendService } from './util/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CookerComponent } from './cooker/cooker.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ChemicalsService } from './chemical/chemicals.service';


@NgModule({
  declarations: [
    AppComponent,
    ChemicalComponent,
    ChemBarComponent,
    LoginComponent,
    SignUpComponent,
    CookerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkDrag,
    CdkScrollable,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatSlideToggleModule
],
  providers: [LoggedInService, BackendService, ChemicalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
