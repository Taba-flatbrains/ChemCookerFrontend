import { Component, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BackendService, LoginRequest, LoginResponse, PostRequestTypeUrls } from '../util/backend.service';
import { LoggedInService } from './logged-in.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private cookieService: CookieService, private backendService:BackendService, private loggedInService:LoggedInService) { }

  emailFormControl = new FormControl("")
  passwordFormControl = new FormControl("")
  login() {
    this.backendService.Post<LoginRequest, LoginResponse>(PostRequestTypeUrls.Login, 
      {email: this.emailFormControl.value!, password: this.passwordFormControl.value!}).subscribe(response => {
      if (!response.success) {
        alert("Login failed"); // ersetzen durch schönen error
        return;
      }
      this.cookieService.set('token', response.token, 7);
      this.loggedInService.LoggedIn = true;
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
