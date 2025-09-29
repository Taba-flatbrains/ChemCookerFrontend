import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChemicalComponent } from './chemical/chemical.component';

import {CdkDrag} from '@angular/cdk/drag-drop';
import { ChemBarComponent } from './chem-bar/chem-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ChemicalComponent,
    ChemBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdkDrag
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
