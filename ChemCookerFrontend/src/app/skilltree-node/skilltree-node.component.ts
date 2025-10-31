import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skilltree-node',
  templateUrl: './skilltree-node.component.html',
  styleUrls: ['./skilltree-node.component.css']
})
export class SkilltreeNodeComponent implements OnInit{
  constructor (private el:ElementRef) {}

  ngOnInit(): void {
    if (this.centerOnLoad)
    this.el.nativeElement.scrollIntoView();
  }
  @Input() self !: SkilltreeNode
  @Input() unlocked !: boolean
  @Input() centerOnLoad = false
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
