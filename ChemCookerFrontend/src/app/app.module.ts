import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChemicalComponent } from './chemical/chemical.component';

import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
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
import { TinyChemicalComponent } from './tiny-chemical/tiny-chemical.component';
import { QuestComponent } from './quest/quest.component';
import { QuestBarComponent } from './quest-bar/quest-bar.component';
import { SkilltreeComponent } from './skilltree/skilltree.component';
import { SkilltreeNodeComponent } from './skilltree-node/skilltree-node.component';

import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';

import { MtxTooltipModule } from '@ng-matero/extensions/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    ChemicalComponent,
    ChemBarComponent,
    LoginComponent,
    SignUpComponent,
    CookerComponent,
    TinyChemicalComponent,
    QuestComponent,
    QuestBarComponent,
    SkilltreeComponent,
    SkilltreeNodeComponent
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
    MatSlideToggleModule,
    DragScrollComponent,
    CdkDragPlaceholder,
    MtxTooltipModule,
],
  providers: [LoggedInService, BackendService, ChemicalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
