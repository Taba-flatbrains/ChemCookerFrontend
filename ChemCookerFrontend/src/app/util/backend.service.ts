import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
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

export interface CreateAccountRequest {
    username: string;
    password: string;
    email: string;
}

export interface CookRequest {
    chemicals: string[]; // array of smiles
    temperature: string;
    hv: string;
}

export interface SubmitReactionRequest {
    reactants: string[]; // array of smiles
    products: string[]; // array of smiles
    temperature: string;
    hv: string;
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
    products: string[]; // array of smiles
}

export interface SubmitReactionResponse {
    success: boolean;
}

export interface NicknameChemicalResponse {
    success: boolean;
}

export interface AvailableSkillpointsResponse {
    skillpoints: number;
}

export interface AvailableChemicalsResponse {
    chemicals: string[]; // array of smiles
}

