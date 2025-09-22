import { AfterViewInit, Component, Injectable, OnDestroy, OnInit } from '@angular/core';
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
  smile : string = "CCC";
  svg : string | undefined = "";

  constructor(private rdkitService: RDKitLoaderService){
  }

  ngAfterViewInit() {
    this.rdkitService.getRDKit().subscribe(
      (rdkit: RDKitModule) => {
          this.svg = rdkit.get_mol(this.smile)?.get_svg();
      }
    )
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