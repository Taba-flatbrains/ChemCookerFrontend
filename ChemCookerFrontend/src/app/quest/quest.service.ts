import { Injectable } from "@angular/core";
import { BackendService, GetAllQuestsResponse, GetRequestTypeUrls } from "../util/backend.service";
import { Quest, QuestConditionTypes } from "./quest.component";


@Injectable({
    providedIn: 'root'
})
export class QuestService {
    constructor(private backendService:BackendService) {}

    completedQuests: number[] = [];
    Quests: Quest[] = [{
        id: 0,
        description: "Big Chongus amongus",
        reward_skillpoints: 1,
        reward_misc: null,
        condition_type: QuestConditionTypes.ObtainChemical,
        condition_value: "CC(=O)C"
    }];

    selectedQuest: number = 0;

    updateQuests() {
        this.backendService.Get<GetAllQuestsResponse>(GetRequestTypeUrls.GetAllQuests).subscribe(response => {
            this.completedQuests = response.completed_quests;
            this.Quests = response.quests;
        });
    }

    getQuestById(id: number): Quest {
        for (let quest of this.Quests) {
            if (quest.id === id) {
                return quest;
            }
        }
        return {
            id: 1,
            description: "Big Chongus amongus",
            reward_skillpoints: 1,
            reward_misc: null,
            condition_type: QuestConditionTypes.ObtainChemical,
            condition_value: "CC(=O)C"
        };
    }
}

