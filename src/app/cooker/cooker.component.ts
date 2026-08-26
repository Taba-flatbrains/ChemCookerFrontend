import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChemicalsService } from '../chemical/chemicals.service';
import { BackendService, CookRequest, CookResponse, PostRequestTypeUrls } from '../util/backend.service';
import { SkilltreeService } from '../skilltree/skilltree-service';
import { QuestService } from '../quest/quest.service';
import { Chemical } from '../chem-bar/chem-bar.component';
import { ArtstyleService } from '../util/artstyle.service';

@Component({
  selector: 'app-cooker',
  templateUrl: './cooker.component.html',
  styleUrls: ['./cooker.component.css']
})
export class CookerComponent implements OnInit{
  constructor(private el: ElementRef, private render: Renderer2, public chemService:ChemicalsService, 
    private backendService:BackendService, public skilltreeService:SkilltreeService, private questService:QuestService,
  public artstyleService:ArtstyleService) { }


  ngOnInit() {
    this.render.listen('window', 'load', () => {
        this.chemService.cookerRect = this.el.nativeElement.getBoundingClientRect();
    });
  }

  tempFormControl = new FormControl("10");
  uvFormControl = new FormControl(false);

  submit() {
    this.backendService.Post<CookRequest, CookResponse>(PostRequestTypeUrls.Cook, {
      chemicals: this.chemService.cookerChemicals,
      temp: +this.tempFormControl.value!,
      uv: this.uvFormControl.value!
    }).subscribe(response => {
      if (response.success) {
        this.chemService.unlockedChemicals.push(...response.new_chems); 
        this.skilltreeService.skillpoints += response.skillpoints_gained;
        this.questService.completedQuests.push(...response.quests_completed);
        for (var chem of response.products) {
          chem.initpos = this.el.nativeElement.getBoundingClientRect(); 
          chem.initpos!.x += Math.random() * this.el.nativeElement.getBoundingClientRect().width - 50;
          chem.initpos!.y += Math.random() * this.el.nativeElement.getBoundingClientRect().width; - 50;
          this.chemService.chemicalsInAction.push(chem)
        }
        this.questService.refreshQuests();
      } else if (response.added_to_pending) {
        this.chemService.pendingReactions.push({inputs: this.chemService.cookerChemicals, temp: +this.tempFormControl.value!, uv: this.uvFormControl.value!});
        console.log(this.chemService.pendingReactions);
      }
      this.clear()
    });
  }

  clear() {
    this.chemService.cookerChemicals = [];
  }

  nextArtstyle() {
    this.artstyleService.nextArtstyle();
  }
}

export interface Reaction {
    inputs: string[]; // array of smiles
    temp: number;
    uv: boolean;
}