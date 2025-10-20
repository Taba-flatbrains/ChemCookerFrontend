import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Chemical } from '../chem-bar/chem-bar.component';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) {}

  Get<ResponseType>(url : string) : Observable<ResponseType> {
    const headers = new HttpHeaders();
    return this.http.get<ResponseType>(URLS.BackendURL + url, { headers:headers, withCredentials:true })
  }

  Post<RequestType, ResponseType>(url: string, body: RequestType) : Observable<ResponseType> {
    const headers = new HttpHeaders();
    return this.http.post<ResponseType>(URLS.BackendURL + url, body, { headers:headers, withCredentials:true })
  }
}

export enum URLS {
    BackendURL = "http://localhost:8000",
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
    NicknameChemical = "/nicknamechemical",
    UseSkillpoint = "/useskillpoint",
}


// Request Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface CreateAccountRequest {
    username: string;
    email: string;
    password: string;
}

export interface CookRequest {
    chemicals: string[]; // array of smiles
    temp: number;
    uv: boolean;
}

export interface NicknameChemicalRequest {
    smiles: string;
    nickname: string;
}

// Response Types
export interface ValidTokenResponse {
    valid: boolean;
}

export interface LoginResponse {
    success: boolean;
    token: string;
}

export interface CreateAccountResponse { // same as login response
    success: boolean;
    token: string;
}

export interface CookResponse {
    success: boolean;
    products: Chemical[]; 
    new_chems: Chemical[];
}

export interface NicknameChemicalResponse {
    success: boolean;
}

export interface AvailableSkillpointsResponse {
    skillpoints: number;
}

export interface AvailableChemicalsResponse {
    chemicals: Chemical[]; 
}

