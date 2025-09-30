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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ChemicalComponent,
    ChemBarComponent
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
    MatButtonModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
