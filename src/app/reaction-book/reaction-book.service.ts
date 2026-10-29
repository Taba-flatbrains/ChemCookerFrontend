import { Injectable } from "@angular/core";
import { BackendService, GetCompletedReactionsResponse, GetRequestTypeUrls } from "../util/backend.service";
import { fullReaction } from "./reaction-book.component";

@Injectable({
    providedIn: 'root'
})
export class ReactionBookService {
    constructor(private backendService: BackendService) {}
    completedReactions : fullReaction[] = []

    updateReactionBook() {
        this.backendService.Get<GetCompletedReactionsResponse>(GetRequestTypeUrls.GetCompletedReactions).subscribe(response => {
            this.completedReactions = response.reactions;
        });
    }
}