import { CookieService } from "ngx-cookie-service";
import { BackendService, GetRequestTypeUrls, PostRequestTypeUrls, ValidTokenResponse } from "../util/backend.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoggedInService {
    constructor(private cookieService: CookieService, private backendService:BackendService) { }

    LoggedIn : boolean = false;
    CheckLoggedIn() : Observable<ValidTokenResponse> {
        if (!this.cookieService.check('token')) {
            return new Observable<ValidTokenResponse>(subscriber => {
                subscriber.next({valid: false});
                subscriber.complete();
            });
        }
        return this.backendService.Get<ValidTokenResponse>(GetRequestTypeUrls.ValidateToken);
    }

    UpdateLoggedInStatus(Subscription: (valid:boolean) => void = (valid:boolean) => {}) {
        if (!this.cookieService.check('token')) {
            this.LoggedIn = false;
            return;
        }
        this.CheckLoggedIn().subscribe(response => {
            this.LoggedIn = response.valid;
            Subscription(this.LoggedIn);
            // if the token is not valid, delete it
            if (!response.valid) {
                this.cookieService.delete('token');
            }
        });
    }

    setToken(token: string) {
        this.cookieService.set('token', token, 7);
    }

    logout() {
        if (this.cookieService.check('token')) {
            this.cookieService.delete('token');
        }
        this.LoggedIn = false;
    }
}