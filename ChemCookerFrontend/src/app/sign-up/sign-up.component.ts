import { Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoggedInService } from '../login/logged-in.service';
import { BackendService, CreateAccountRequest, CreateAccountResponse, PostRequestTypeUrls } from '../util/backend.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private loggedInService:LoggedInService, private backendService:BackendService) { }

  usernameFormControl = new FormControl('');
  emailFormControl = new FormControl('');
  passwordFormControl = new FormControl('');
  confirmPasswordFormControl = new FormControl('');

  signUp() {
    if (this.passwordFormControl.value !== this.confirmPasswordFormControl.value) {
      alert("Passwords do not match!"); // todo: better error handling
      return;
    }
    // todo: check if name, pwd and email are valid (name must not contain an @)
    this.backendService.Post<CreateAccountRequest, CreateAccountResponse>(PostRequestTypeUrls.CreateAccount, {
      username: this.usernameFormControl.value!,
      email: this.emailFormControl.value!,
      password: this.passwordFormControl.value!
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.loggedInService.LoggedIn = true;
          this.loggedInService.setToken(response.token);
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
