import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, Injectable, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// Import RDKitModule as a value, not just a type
import {RDKitModule} from '@rdkit/rdkit';
import { first, Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'chemical',
  standalone: false,
  templateUrl: './chemical.component.html',
  styleUrls: ['./chemical.component.css']
})
export class ChemicalComponent implements AfterViewInit {
  @Input() smile : string = "C1C2CC3CC1CC(C2)C3";
  @Input() iupac : string = "tricyclo["
  @Input() givenname : string = "Adamantane";

  @Output() position : {x: number, y: number} = {x: 0, y: 0};
  @Output() rect : {width: number, height: number} = {width: 64, height: 60};

  svg : undefined | SafeHtml;

  constructor(private rdkitService: RDKitLoaderService, private domSanitizer: DomSanitizer){
  }

  ngAfterViewInit() {
    this.rdkitService.getRDKit().subscribe(
      (rdkit: RDKitModule) => {
          const temp : string | undefined = rdkit.get_mol(this.smile)?.get_svg(this.EstimateSize(this.smile).width, this.EstimateSize(this.smile).height);
          if (temp)
            this.svg = this.domSanitizer.bypassSecurityTrustHtml(temp);
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

    this.rect = {width: width, height: height};
    return {width: width, height: height};
  }

  dragEnd($event: CdkDragEnd) {
    this.position = $event.source.getFreeDragPosition();
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