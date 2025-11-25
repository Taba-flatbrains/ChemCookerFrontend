import { Injectable } from "@angular/core";
import { Chemical, newChemical } from "../chem-bar/chem-bar.component";
import { Subject } from "rxjs";
import { BackendService, CookResponse, GetPendingReactionsResponse, GetRequestTypeUrls } from "../util/backend.service";
import { CookerComponent, Reaction } from "../cooker/cooker.component";
import { SkilltreeService } from "../skilltree/skilltree-service";
import { QuestService } from "../quest/quest.service";
import { MatDialog } from "@angular/material/dialog";
import { PendingReactionsComponent } from "../pending-reactions/pending-reactions.component";


@Injectable({
    providedIn: 'root'
})
export class ChemicalsService {
    constructor(private backendService:BackendService, private skilltreeService:SkilltreeService, private questService:QuestService,
        private dialog:MatDialog
    ) { }

    public unlockedChemicals: Chemical[] = [newChemical("C1CCCCC1", "Cyclohexane", "Cyclohexane"), newChemical("C1=CC=CC=C1", "Benzene", "Benzene"), newChemical("C1=CC=C(C=C1)O", "Phenol", "Phenol"), newChemical("C1=CC=C(C=C1)C(=O)O", "Benzoic acid", "Benzoic acid"), newChemical("C1=CC=C(C=C1)C(=O)OC", "Methyl benzoate", "Methyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCC", "Ethyl benzoate", "Ethyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCC", "Propyl benzoate", "Propyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCC", "Butyl benzoate", "Butyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCC", "Hexyl benzoate", "Hexyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCC", "Heptyl benzoate", "Heptyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCC", "Octyl benzoate", "Octyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCCC", "Nonyl benzoate", "Nonyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCCCC", "Decyl benzoate", "Decyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCCCCC", "Undecyl benzoate", "Undecyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCCCCCC", "Dodecyl benzoate", "Dodecyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCCCCCCC", "Tridecyl benzoate", "Tridecyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCCCCCCCC", "Tetradecyl benzoate", "T")];;
    public cookerChemicals: string[] = [];
    public chemicalsInAction : Chemical[] = []

    public cookerRect : DOMRect | undefined; // dirty way to transmit the cooker rect to chemical components

    RefreshChemicalsEvent = new Subject<boolean>()
    refreshChemicals() {
        this.RefreshChemicalsEvent.next(true);
    }

    pendingReactions : Reaction[] = [];
    successfulPendingReactions : CookResponse[] = [];
    unsuccesfulPendingReactions : Reaction[] = [];
    refreshPendingReactions(force: boolean = true) {
        if (!force && this.pendingReactions.length == 0) {
            return;
        }
        // todo: get pending reactions from backend, add chems in successful pending reactions
        this.backendService.Get<GetPendingReactionsResponse>(GetRequestTypeUrls.CheckPendingReactions).subscribe(response => {
            this.pendingReactions = response.pending_reactions;
            for (var reaction of response.successful_pending_reactions) {
                this.unlockedChemicals.push(...reaction.new_chems); 
                this.skilltreeService.skillpoints += reaction.skillpoints_gained;
                this.questService.completedQuests.push(...reaction.quests_completed);
                this.successfulPendingReactions.push(reaction);
            }
            this.unsuccesfulPendingReactions.push(...response.removed_pending_reactions);
            this.questService.refreshQuests();
            if (this.successfulPendingReactions.length > 0) {
                this.dialog.open(PendingReactionsComponent, {});
            }
        });
    }
}