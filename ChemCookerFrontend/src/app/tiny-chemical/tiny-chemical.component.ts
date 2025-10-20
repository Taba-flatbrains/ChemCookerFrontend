import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RDKitModule } from '@rdkit/rdkit';
import { RDKitLoaderService } from '../chemical/chemical.component';

@Component({
  selector: 'app-tiny-chemical',
  templateUrl: './tiny-chemical.component.html',
  styleUrls: ['./tiny-chemical.component.css']
})
export class TinyChemicalComponent implements AfterViewInit {
  constructor(private rdkitService: RDKitLoaderService, private domSanitizer: DomSanitizer, private cdref: ChangeDetectorRef) {
  }

  @Input() smile : string = "C1C2CC3CC1CC(C2)C3";
  svg : undefined | SafeHtml;

  ngAfterViewInit() {
      this.rdkitService.getRDKit().subscribe(
        (rdkit: RDKitModule) => {
            const temp : string | undefined = rdkit.get_mol(this.smile)?.get_svg(this.EstimateSize(this.smile).width, this.EstimateSize(this.smile).height);
            if (temp)
              this.svg = this.domSanitizer.bypassSecurityTrustHtml(temp);
            this.cdref.detectChanges();
        }
      )
    }

  EstimateSize(smile: string): {width: number, height: number} {
    let letters_only = smile.replace(/[^A-Za-z]/g, '');
    let numbers_only = smile.replace(/[^0-9]/g, '');
    let wf = 1 + letters_only.length * 0.025 - numbers_only.length * 0.035;
    let width = 50 * wf;
    let height = 50 * wf;

    return {width: width, height: height};
  }
}
