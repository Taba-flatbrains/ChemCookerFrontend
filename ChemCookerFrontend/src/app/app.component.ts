import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChemicalComponent } from './chemical/chemical.component';
import { Chemical } from './chem-bar/chem-bar.component';
import { LoggedInService } from './login/logged-in.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChemicalsService } from './chemical/chemicals.service';
import { QuestService } from './quest/quest.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public loggedInService:LoggedInService, private dialog:MatDialog, public chemService:ChemicalsService,
    private questService:QuestService
  ) { }

  title = 'ChemCookerFrontend';

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      
    });
  }

  openSignUpDialog() {
    const dialogRef = this.dialog.open(SignUpComponent, {

    });
  }

  logout() {
    this.loggedInService.logout();
  }

  ngOnInit(): void {
    this.loggedInService.UpdateLoggedInStatus()
    this.questService.updateQuests();
  }
}
