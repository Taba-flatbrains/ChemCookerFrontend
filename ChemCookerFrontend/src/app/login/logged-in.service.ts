import { CookieService } from "ngx-cookie-service";
import { BackendService, GetRequestTypeUrls, PostRequestTypeUrls, ValidTokenResponse } from "../util/backend.service";
import { Observable } from "rxjs";

export class LoggedInService {
    constructor(private cookieService: CookieService, private backendService:BackendService) { }

    LoggedIn : boolean = false;
    CheckLoggedIn() : Observable<ValidTokenResponse> {
        return this.backendService.Get<ValidTokenResponse>(GetRequestTypeUrls.ValidateToken);
    }

    UpdateLoggedInStatus() {
        this.CheckLoggedIn().subscribe(response => {
            this.LoggedIn = response.valid;
            if (!this.LoggedIn) {
                this.cookieService.delete('token');
            }
        });
    }
}