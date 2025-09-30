import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BackendService, LoginRequest, LoginResponse, PostRequestTypeUrls } from '../util/backend.service';
import { LoggedInService } from './logged-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private cookieService: CookieService, private backendService:BackendService, private loggedInService:LoggedInService) { }

  login(username: string, password: string) {
    this.backendService.Post<LoginRequest, LoginResponse>(PostRequestTypeUrls.Login, {username: username, password: password}).subscribe(response => {
      if (!response.success) {
        alert("Login failed"); // ersetzen durch schönen error
        return;
      }
      this.cookieService.set('token', response.token);
      this.loggedInService.LoggedIn = true;
    });
  }
}
