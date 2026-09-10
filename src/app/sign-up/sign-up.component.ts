import { Component, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoggedInService } from '../login/logged-in.service';
import { BackendService, CreateAccountRequest, CreateAccountResponse, PostRequestTypeUrls, UpgradeAccountPermanentRequest, UpgradeAccountPermanentResponse } from '../util/backend.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DifficultyLevel } from '../util/constants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(public loggedInService:LoggedInService, private backendService:BackendService, private dialogRef:MatDialogRef<SignUpComponent>) { }

  usernameFormControl = new FormControl('');
  emailFormControl = new FormControl('', Validators.email);
  passwordFormControl = new FormControl('');
  confirmPasswordFormControl = new FormControl('');
  difficultyFormControl = new FormControl('');
  difficulties = ["Easy", "Medium", "Hard"];
  parseDifficulty(difficulty: string): number {
    switch (difficulty) {
      case "Easy":
        return DifficultyLevel.Easy;
      case "Medium":
        return DifficultyLevel.Medium;
      case "Hard":
        return DifficultyLevel.Hard;
      default:
        return DifficultyLevel.Easy; // default to Easy if somehow an invalid value is passed
    }
  }

  signUp() {
    if (this.passwordFormControl.value !== this.confirmPasswordFormControl.value) {
      alert("Passwords do not match!"); // todo: better error handling
      return;
    }
    if (!this.emailFormControl.valid) {
      alert("Please enter a valid email address!"); // todo: better error handling
      return;
    }
    if (!this.loggedInService.LoggedIn) {
      this.backendService.Post<CreateAccountRequest, CreateAccountResponse>(PostRequestTypeUrls.CreateAccount, {
        username: this.usernameFormControl.value!,
        email: this.emailFormControl.value!,
        password: this.passwordFormControl.value!,
        difficulty: this.parseDifficulty(this.difficultyFormControl.value!) 
      }).subscribe({
        next: (response) => {
          if (response.success) {
            this.loggedInService.LoggedIn = true;
            this.loggedInService.LoggedInAs = response.name
            this.loggedInService.RealAccount = true;
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
    } else {
      this.backendService.Post<UpgradeAccountPermanentRequest, UpgradeAccountPermanentResponse>(PostRequestTypeUrls.UpgradeAccountPermanent, {
        username: this.usernameFormControl.value!,
        email: this.emailFormControl.value!,
        password: this.passwordFormControl.value!,
        temp_account_name: this.loggedInService.LoggedInAs,
      }).subscribe({
        next: (response) => {
          if (response.success) {
            this.loggedInService.LoggedIn = true;
            this.loggedInService.RealAccount = true;
            this.loggedInService.LoggedInAs = response.name;
            this.dialogRef.close();
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
}
