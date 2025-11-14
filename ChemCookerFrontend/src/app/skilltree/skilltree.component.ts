import { Component, OnInit } from '@angular/core';
import { BackendService, GetRequestTypeUrls, GetSkilltreeResponse } from '../util/backend.service';
import { SkilltreeNode } from '../skilltree-node/skilltree-node.component';
import { SkilltreeService } from './skilltree-service';

@Component({
  selector: 'app-skilltree',
  templateUrl: './skilltree.component.html',
  styleUrls: ['./skilltree.component.css']
})
export class SkilltreeComponent implements OnInit {
  constructor (private backendService:BackendService, public skilltreeService:SkilltreeService) {}

  allSkilltreeNodes : SkilltreeNode[] = []
  unlockedSkilltreeNodes : number[] = []
  nodesDict : {[x:number]: { [y:number]: SkilltreeNode | undefined }} = {}

  range = range

  ngOnInit(): void {
    this.backendService.Get<GetSkilltreeResponse>(GetRequestTypeUrls.GetSkilltree).subscribe(r => {
      this.allSkilltreeNodes = r.skilltree_nodes;
      this.unlockedSkilltreeNodes = r.unlocked_skilltree_nodes;
      this.skilltreeService.skillpoints = r.availableSkillpoints;
      for (let i of range(-10, 20)) {
        this.nodesDict[i] = {}
        for (let j of range(-20, 20)) {
          this.nodesDict[i][j] = undefined;
          for (let node of this.allSkilltreeNodes) {
            if (node.x == i && node.y == j) {
              this.nodesDict[i][j] = node;
            }
          }
        }
      }
    });
  }
}

function range(start:number, stop:number | undefined = undefined, step:number | undefined = undefined) : number[] {
    if (!stop) {
        // one param defined
        stop = start;
        start = 0;
    }

    if (!step) {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};