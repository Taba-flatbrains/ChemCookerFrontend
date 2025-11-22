import { CdkDrag, CdkDragEnd, CdkDragHandle, DragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Injectable, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// Import RDKitModule as a value, not just a type
import {RDKitModule} from '@rdkit/rdkit';
import { first, Observable, ReplaySubject } from 'rxjs';
import { Chemical, newChemical } from '../chem-bar/chem-bar.component';
import { ChemicalsService } from './chemicals.service';
import { NicknameChemicalComponent } from '../nickname-chemical/nickname-chemical.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'chemical',
  standalone: false,
  templateUrl: './chemical.component.html',
  styleUrls: ['./chemical.component.css']
})
export class ChemicalComponent implements AfterViewInit, OnInit {
  @Input() smile : string = "C1C2CC3CC1CC(C2)C3";
  @Input() iupac : string = "tricyclo["
  @Input() nickname : string = "Adamantane";
  @Input() draggable : boolean = true;
  @Input() initialPosition : {x: number, y: number} | undefined;
  @Input() self : Chemical | undefined;
  @Input() touchable : boolean = true;
  Style : { [klass: string]: any; } = {};

  @Output() position : {x: number, y: number} | undefined;
  @Output() rect : {width: number, height: number} = {width: 64, height: 60};

  svg : undefined | SafeHtml;
  active : boolean = true;

  constructor(private rdkitService: RDKitLoaderService, private domSanitizer: DomSanitizer, private cdref: ChangeDetectorRef, private chemService:ChemicalsService, private dialog:MatDialog) {
  }

  @ViewChild('box') box : ElementRef | undefined;
  ManualDragging : boolean = false;
  ngOnInit(): void {
    if(this.draggable && this.initialPosition) {
      this.Style = {'position': 'absolute', 'top.px': this.initialPosition.y, 'left.px': this.initialPosition.x};
      if (!this.self?.dragOnCreate) return;
      this.ManualDragging = true;
      addEventListener("mouseup", (event) => { this.ManualDragging = false; this.checkOutOfBounds(); this.checkInCooker(); });
      addEventListener("mousemove", (event) => {
        if(this.ManualDragging) {
          this.initialPosition = {x: event.clientX - this.rect.width / 2, y: event.clientY - this.rect.height / 2};
          this.Style = {'position': 'absolute', 'top.px': this.initialPosition.y, 'left.px': this.initialPosition.x};
        }
      });
    }
    this.chemService.RefreshChemicalsEvent.subscribe(() => {
      this.ngAfterViewInit();
      // update nickname
      const chem = this.chemService.unlockedChemicals.find(c => c.smile === this.smile);
      if (chem) {
        this.nickname = chem.nickname;
      }
    });
  }

  openEditDialog() {
    if(!this.touchable) return;
    const dialogRef = this.dialog.open(NicknameChemicalComponent, {
      data: {
        smile: this.smile,
        iupac: this.iupac,
        nickname: this.nickname
      }
    });
  }

  // DIAS = Dont interpret as SMILES
  readonly DIASSymbol : string = "!";
  ngAfterViewInit() {
    this.rdkitService.getRDKit().subscribe(
      (rdkit: RDKitModule) => {
        if (this.smile.startsWith(this.DIASSymbol)) {
          const temp : string = `<svg xmlns="http://www.w3.org/2000/svg" width="${this.EstimateSize(this.smile).width}" height="${this.EstimateSize(this.smile).height}">
            <rect width="100%" height="100%" fill="#ffffffff"/>
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#000000ff" font-family="Arial, sans-serif" font-size="30">
              ${this.smile.substring(1)}
            </text>
          </svg>`;
          this.svg = this.domSanitizer.bypassSecurityTrustHtml(temp);
          this.cdref.detectChanges();
        } else {
          const temp : string | undefined = rdkit.get_mol(this.smile)?.get_svg(this.EstimateSize(this.smile).width, this.EstimateSize(this.smile).height);
          if (temp)
            this.svg = this.domSanitizer.bypassSecurityTrustHtml(temp);
          this.cdref.detectChanges();
        }
      }
    )
  }

  EstimateSize(smile: string): {width: number, height: number} {
    let letters_only = smile.replace(/[^A-Za-z]/g, '');
    let numbers_only = smile.replace(/[^0-9]/g, '');
    let wf = 1 + letters_only.length * 0.05 - numbers_only.length * 0.07;
    let width = Math.max(64, window.outerWidth * 0.085) * wf;
    let height = Math.max(60, window.outerWidth * 0.08);

    // limit width to 30% of screen width
    if (width > window.outerWidth * 0.3) {
      width = window.outerWidth * 0.3;
    }
    // limit height to 10% of screen height
    if (height > window.outerHeight * 0.10) {
      height = window.outerHeight * 0.10;
    }

    this.rect = {width: width, height: height};
    return {width: width, height: height};
  }

  dragEnd($event: CdkDragEnd) {
    this.position = $event.source.getFreeDragPosition();
    this.checkOutOfBounds();
    this.checkInCooker();
  }

  checkInCooker() {
    // add condition
    if (!this.box) { return; }
    if (!intersectRect(this.chemService.cookerRect!, this.box!.nativeElement.getBoundingClientRect())) {
      return;
    }

    this.removeSelf()
    this.chemService.cookerChemicals.push(this.smile);
  }

  checkOutOfBounds() {
    if (!this.position) {
      this.position = {x: 0, y: 0};
    }
    if (!this.initialPosition) { return;}
    if(this.position.y + this.initialPosition.y + this.rect.height / 2 > window.innerHeight - Math.max(90, Math.min(window.innerWidth * 16 + 30, window.innerHeight * 0.35))) {
      this.removeSelf()
    }
  }

  duplicate(event : MouseEvent) {
    if(this.draggable || !this.touchable) return;
    this.chemService.chemicalsInAction.push(newChemical(this.smile, this.iupac, this.nickname, 
      {x: event.clientX - this.rect.width / 2, y: event.clientY - this.rect.height / 2}, true));
  }

  removeSelf() {
    const index = this.chemService.chemicalsInAction.indexOf(this.self!, 0);
    if (index > -1) {
      this.chemService.chemicalsInAction.splice(index, 1);
    }
    
  }
}

@Injectable({
  providedIn: "root"
})
export class RDKitLoaderService implements OnDestroy {
  private rdkitSubject$!: ReplaySubject<RDKitModule>;

  constructor() {}

  ngOnDestroy(): void {
    this.rdkitSubject$.complete();
  }

  getRDKit(): Observable<RDKitModule> {
    if (!this.rdkitSubject$) {
      this.rdkitSubject$ = new ReplaySubject(1);

      window.initRDKitModule().then(
        (instance: RDKitModule) => {
          this.rdkitSubject$.next(instance);
        },
        (error) => {
          this.rdkitSubject$.error(error);
        }
      );
    }
    return this.rdkitSubject$.asObservable().pipe(first());
  }
}

function intersectRect (rectA : DOMRect, rectB : DOMRect) : boolean { // credits: https://github.com/Barry127/intersect-rect/blob/master/intersect-rect.js
    return !(
        rectB.left >= rectA.right ||
        rectB.right <= rectA.left ||
        rectB.top >= rectA.bottom ||
        rectB.bottom <= rectA.top
      );
  }