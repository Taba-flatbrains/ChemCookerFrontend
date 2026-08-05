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

  text : undefined | string;
  true_smile : undefined | string;

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
  readonly DIASSymbol : string = "\"";
  ngAfterViewInit() {
    this.text = undefined;
    this.rdkitService.getRDKit().subscribe(
      (rdkit: RDKitModule) => {
        const parts = this.smile.split(this.DIASSymbol)
        this.true_smile = parts[0]
        if (parts.length > 1) {
          this.text = parts[1]
          this.text = this.text.replaceAll(".", "·")
          this.text = this.text.replaceAll("_{", "<sub>") // todo: add better system (numbers immediatly after letters are always low or add undescore to lower immediatly following char)
          this.text = this.text.replaceAll("_}", "</sub>")
        }
        const temp : string | undefined = rdkit.get_mol(this.true_smile)?.get_svg(this.EstimateSizeSmile(this.true_smile).width, this.EstimateSizeSmile(this.true_smile).height);
        if (temp)
          this.svg = this.domSanitizer.bypassSecurityTrustHtml(temp);
        this.cdref.detectChanges();
      }
    )
  }

  EstimateSizeSmile(smile: string): {width: number, height: number} {
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

    return {width: width, height: height};
  }
  EstimateSizeText(text: string): {width: number, height: number} {
    let letters_only = text.replace(/[^A-Za-z]/g, '');
    let width = letters_only.length * 20;
    let height = Math.max(60, window.outerWidth * 0.08);

    // limit height to 10% of screen height
    if (height > window.outerHeight * 0.10) {
      height = window.outerHeight * 0.10;
    }

    // min width if smile is empty
    if (this.true_smile === "") {
      width = Math.max(width, 120);
    }

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