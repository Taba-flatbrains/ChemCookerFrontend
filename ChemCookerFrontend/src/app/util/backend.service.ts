import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export class BackendService {
  constructor(private http: HttpClient) {}

  Get<ResponseType>(url : string) : Observable<ResponseType> {
    const headers = new HttpHeaders();
    return this.http.get<ResponseType>(URLS.BackendURL + url, { headers:headers })
  }

  Post<RequestType, ResponseType>(url: string, body: RequestType) : Observable<ResponseType> {
    const headers = new HttpHeaders();
    return this.http.post<ResponseType>(URLS.BackendURL + url, body, { headers:headers })
  }
}

export enum URLS {
    BackendURL = "http://localhost:3000/api",
}

export enum GetRequestTypeUrls {
    GetSkilltree = "/skilltree",
    GetAvailableChemicals = "/availablechems",
    GetAvailableSkillpoints = "/availableskillpoints",
    ValidateToken = "/validatetoken",
}

export enum PostRequestTypeUrls {
    CreateAccount = "/signup",
    Login = "/login",
    Cook = "/cook",
    SubmitReaction = "/submitreaction",
    NicknameChemical = "/nicknamechemical",
    UseSkillpoint = "/useskillpoint",
}


// Request Types
export interface LoginRequest {
    username: string;
    password: string;
}

// Response Types
export interface ValidTokenResponse {
    valid: boolean;
}

export interface LoginResponse {
    success: boolean;
    token: string;
}
