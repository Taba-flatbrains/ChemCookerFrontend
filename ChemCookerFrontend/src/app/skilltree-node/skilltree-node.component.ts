import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { BackendService, PostRequestTypeUrls, UnlockSkilltreeNodeRequest, UnlockSkilltreeNodeResponse } from '../util/backend.service';
import { ChemicalsService } from '../chemical/chemicals.service';

@Component({
  selector: 'app-skilltree-node',
  templateUrl: './skilltree-node.component.html',
  styleUrls: ['./skilltree-node.component.css']
})
export class SkilltreeNodeComponent implements AfterViewInit{
  constructor (private el:ElementRef, private backendService:BackendService, private chemService:ChemicalsService) {}

  ngAfterViewInit(): void {
    if (this.centerOnLoad) {
      this.el.nativeElement.scrollIntoView();
    }
  }
  @Input() self !: SkilltreeNode
  @Input() unlocked !: boolean
  @Input() centerOnLoad = false

  unlockNode() {
    if (this.unlocked) return;
    this.backendService.Post<UnlockSkilltreeNodeRequest, UnlockSkilltreeNodeResponse>(PostRequestTypeUrls.UnlockSkilltreeNode, {
      id: this.self.id
    }).subscribe(response => {
      if (response.success) {
        this.unlocked = true;
        this.chemService.unlockedChemicals.push(...response.unlocked_chemicals);
      }
    });
  }
}

export interface SkilltreeNode {
  id:number
  title:string
  description:string
  x:number
  y:number
  neighbors:number[]
  chem_rewards:string[]
  misc_rewards:string[]
  misc_reward_icon:string
  skillpoint_cost:number
}
