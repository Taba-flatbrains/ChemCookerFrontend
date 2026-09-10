import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LoginComponent } from '../login/login.component';
import { DifficultyLevel } from '../util/constants';
import { BackendService, InitTempAccountRequest, InitTempAccountResponse, PostRequestTypeUrls } from '../util/backend.service';
import { LoggedInService } from '../login/logged-in.service';

@Component({
  selector: 'app-init-account-dialog',
  templateUrl: './init-account-dialog.component.html',
  styleUrl: './init-account-dialog.component.css'
})
export class InitAccountDialogComponent {
  constructor(private dialogRef: MatDialogRef<InitAccountDialogComponent>, private dialog: MatDialog, 
    private backendService:BackendService, private loggedInService:LoggedInService) {}
  DifficultyLevel = DifficultyLevel; // to make accessable for html

  openLoginDialog() {
      const dialogRef = this.dialog.open(LoginComponent, {
        
      });
    }
  
    openSignUpDialog() {
      const dialogRef = this.dialog.open(SignUpComponent, {
  
      });
    }

  initTempAccount(difficulty: number) {
    this.backendService.Post<InitTempAccountRequest, InitTempAccountResponse>(PostRequestTypeUrls.InitTempAccount, {difficulty: difficulty}).subscribe({
      next: (response) => {
        if (response.success) {
          this.loggedInService.LoggedIn = true;
          this.loggedInService.RealAccount = false;
          this.loggedInService.LoggedInAs = response.name
          this.loggedInService.setToken(response.token);
          this.loggedInService.LoggedInStatusChangeEvent.next(true)
          this.dialogRef.close()
        } else {
          alert("Account creation failed: "); // todo: better error handling
        }
      },
      error: (error) => {
        alert("An error occurred: " + error.message); // todo: better error handling
      }
    });
  }
}
