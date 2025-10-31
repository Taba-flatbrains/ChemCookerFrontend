import { Component, OnInit } from '@angular/core';
import { BackendService, GetRequestTypeUrls, GetSkilltreeResponse } from '../util/backend.service';
import { SkilltreeNode } from '../skilltree-node/skilltree-node.component';

@Component({
  selector: 'app-skilltree',
  templateUrl: './skilltree.component.html',
  styleUrls: ['./skilltree.component.css']
})
export class SkilltreeComponent implements OnInit {
  constructor (private backendService:BackendService) {}

  allSkilltreeNodes : SkilltreeNode[] = []
  unlockedSkilltreeNodes : number[] = []

  range = range
  nodeGap = 60;
  getNodeFromPos(x:number, y:number): SkilltreeNode | undefined {
    for (let node of this.allSkilltreeNodes) {
      if (node.x == x && node.y == y) {
        return node
      }
    }
    return
  }

  ngOnInit(): void {
    this.backendService.Get<GetSkilltreeResponse>(GetRequestTypeUrls.GetSkilltree).subscribe(r => {
      this.allSkilltreeNodes = r.skilltree_nodes;
      this.unlockedSkilltreeNodes = r.unlocked_skilltree_nodes;
    });
  }
}

function range(start:number, stop:number | undefined = undefined, step:number | undefined = undefined) {
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