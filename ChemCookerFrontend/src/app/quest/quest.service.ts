import { Injectable } from "@angular/core";
import { BackendService, GetAllQuestsResponse, GetRequestTypeUrls } from "../util/backend.service";
import { Quest } from "./quest.component";


@Injectable({
    providedIn: 'root'
})
export class QuestService {
    constructor(private backendService:BackendService) {}

    completedQuests: number[] = [];
    Quests: Quest[] = [];

    updateQuests() {
        this.backendService.Get<GetAllQuestsResponse>(GetRequestTypeUrls.GetAllQuests).subscribe(response => {
            this.completedQuests = response.completed_quests;
            this.Quests = response.quests;
        });
    }
}

