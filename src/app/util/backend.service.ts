import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Chemical } from '../chem-bar/chem-bar.component';
import { Quest } from '../quest/quest.component';
import { SkilltreeNode } from '../skilltree-node/skilltree-node.component';
import { Reaction } from '../cooker/cooker.component';

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
    GetAllQuests = "/all-quests",
    CheckPendingReactions = "/pending-reactions"
}

export enum PostRequestTypeUrls {
    CreateAccount = "/signup",
    Login = "/login",
    Cook = "/cook",
    NicknameChemical = "/nicknamechemical",
    UnlockSkilltreeNode = "/skilltree-upgrade",
    SetNickame = "/set-nickname"
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

export interface UnlockSkilltreeNodeRequest {
    id: number
}

export interface UpdateNickanameRequest {
    smile: string;
    nickname: string;
}

export interface  GetPendingReactionsResponse {
    pending_reactions: Reaction[]; // array of inputs seperated by ;
    removed_pending_reactions: Reaction[]; // array of inputs seperated by ;
    successful_pending_reactions: CookResponse[];
}

// Response Types
export interface ValidTokenResponse {
    valid: boolean;
    name: string;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    name: string;
}

export interface CreateAccountResponse { // same as login response
    success: boolean;
    token: string;
    name: string;
}

export interface CookResponse {
    success: boolean;
    inputs: string[]; // array of smiles
    temp: number;
    uv: boolean;
    products: Chemical[]; 
    new_chems: Chemical[];
    skillpoints_gained: number;
    quests_completed: number[]; // array of quest IDs
    added_to_pending: boolean;
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

export interface GetAllQuestsResponse {
    quests: Quest[];
    completed_quests: number[]; // array of quest IDs
}

export interface GetSkilltreeResponse {
  skilltree_nodes : SkilltreeNode[]
  unlocked_skilltree_nodes : number[]
  availableSkillpoints : number
}

export interface UnlockSkilltreeNodeResponse {
    success : boolean
    unlocked_chemicals : Chemical[]
}

export interface UpdateNicknameResponse {
    success: boolean;
}