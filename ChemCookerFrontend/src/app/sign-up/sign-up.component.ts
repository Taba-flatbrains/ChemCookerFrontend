import { Component, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoggedInService } from '../login/logged-in.service';
import { BackendService, CreateAccountRequest, CreateAccountResponse, PostRequestTypeUrls } from '../util/backend.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private loggedInService:LoggedInService, private backendService:BackendService, private dialogRef:MatDialogRef<SignUpComponent>) { }

  usernameFormControl = new FormControl('');
  emailFormControl = new FormControl('', Validators.email);
  passwordFormControl = new FormControl('');
  confirmPasswordFormControl = new FormControl('');

  signUp() {
    if (this.passwordFormControl.value !== this.confirmPasswordFormControl.value) {
      alert("Passwords do not match!"); // todo: better error handling
      return;
    }
    if (!this.emailFormControl.valid) {
      alert("Please enter a valid email address!"); // todo: better error handling
      return;
    }
    this.backendService.Post<CreateAccountRequest, CreateAccountResponse>(PostRequestTypeUrls.CreateAccount, {
      username: this.usernameFormControl.value!,
      email: this.emailFormControl.value!,
      password: this.passwordFormControl.value!
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.loggedInService.LoggedIn = true;
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
