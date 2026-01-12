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
  constructor (public skilltreeService:SkilltreeService) {}


  ngOnInit(): void {
    this.skilltreeService.init();
  }

  range = range
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