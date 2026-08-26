import { Component, OnInit } from '@angular/core';
import { ChemicalsService } from '../chemical/chemicals.service';
import { CookResponse } from '../util/backend.service';
import { Quest } from '../quest/quest.component';
import { QuestService } from '../quest/quest.service';

@Component({
  selector: 'app-pending-reactions',
  templateUrl: './pending-reactions.component.html',
  styleUrl: './pending-reactions.component.css'
})
export class PendingReactionsComponent implements OnInit {
  constructor(public chemService:ChemicalsService, private questService:QuestService) { }

  tempToString : { [id:number] : string} = { 1 : "Cold", 10 : "rt. ", 100: "Reflux", 1000 : "pyro"}

  succesfulReactions : SuccesfulPendingReaction[] = [];
  newChemStyle = {'border-color': 'yellow', 'border-width': '2px', 'border-style': 'solid'};
  ngOnInit(): void {
    this.succesfulReactions = this.chemService.successfulPendingReactions.map( r => {
      return {
        ...r,
        products_whighlighting: r.products.map( p => { return { smile: p.smile, new: r.new_chems.map(i => {return i.smile}).includes(p.smile) }; } ),
        quest_selfs: r.quests_completed.map( qid => {
          return this.questService.Quests.find( q => q.id === qid )!;
        })
      }
    });
  }
}

export interface SuccesfulPendingReaction extends CookResponse {
  products_whighlighting: { smile: string, new: boolean }[];
  quest_selfs: Quest[];
}
