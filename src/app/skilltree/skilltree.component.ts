import { AfterViewChecked, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BackendService, GetRequestTypeUrls, GetSkilltreeResponse } from '../util/backend.service';
import { SkilltreeNode } from '../skilltree-node/skilltree-node.component';
import { SkilltreeService } from './skilltree-service';
import { DragScrollComponent, DragScrollElement } from 'ngx-drag-scroll';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-skilltree',
  templateUrl: './skilltree.component.html',
  styleUrls: ['./skilltree.component.css']
})
export class SkilltreeComponent implements OnInit {
  constructor (public skilltreeService:SkilltreeService, private _renderer: Renderer2, private dialogRef : DialogRef) {}
  @ViewChild('scrollContainer') private scrollContainer!: DragScrollComponent;

  serviceInitialized: boolean = false;
  ngOnInit(): void {
    this.skilltreeService.init().add(() => {
      this.serviceInitialized = true;
      this.initView()
    });
    this.dialogRef.backdropClick.subscribe(() => {
      this.skilltreeService.lastSkilltreeScrollPosition.x = this.scrollContainer._contentRef.nativeElement.scrollLeft;
      this.skilltreeService.lastSkilltreeScrollPosition.y = this.scrollContainer._contentRef.nativeElement.scrollTop;
    });
  }

  viewInitialized: boolean = false;
  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.initView();
  }

  skilltreeNodeSize = 150;
  initView(): void {
    if (!this.serviceInitialized || !this.viewInitialized) {
      return;
    }
    if (this.skilltreeService.lastSkilltreeScrollPosition) {
      this.scrollContainer._contentRef.nativeElement.scrollLeft = this.skilltreeService.lastSkilltreeScrollPosition.x;
      this.scrollContainer._contentRef.nativeElement.scrollTop = this.skilltreeService.lastSkilltreeScrollPosition.y;
    } else {
      this.skilltreeService.lastSkilltreeScrollPosition = { x: 0, y: 0 };
      // Center on last unlocked node
      let lastUnlockedNodeID = this.skilltreeService.unlockedSkilltreeNodes[this.skilltreeService.unlockedSkilltreeNodes.length - 1];
      let lastUnlockedNode = this.skilltreeService.idToNodeDict[lastUnlockedNodeID];
      if (lastUnlockedNode) {
        let centerX = (lastUnlockedNode.x - this.skilltreeService.skilltreeWidth[0] + 0.5) * this.skilltreeNodeSize;
        let centerY = (lastUnlockedNode.y - this.skilltreeService.skilltreeHeight[0] + 0.5) * this.skilltreeNodeSize;
        this.scrollContainer._contentRef.nativeElement.scrollLeft = centerX - (this.scrollContainer._contentRef.nativeElement.clientWidth / 2);
        this.scrollContainer._contentRef.nativeElement.scrollTop = centerY - (this.scrollContainer._contentRef.nativeElement.clientHeight / 2);
      }
      
      this.skilltreeService.lastSkilltreeScrollPosition = {
        x: this.scrollContainer._contentRef.nativeElement.scrollLeft,
        y: this.scrollContainer._contentRef.nativeElement.scrollTop
      };
    }
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