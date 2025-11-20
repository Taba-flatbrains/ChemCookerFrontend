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
    setInterval(()=> { this.Animate() }, 30);
  }

  @Input() smile : string = "C1C2CC3CC1CC(C2)C3";
  @Input() disableAnimation : boolean = false;
  svg : undefined | SafeHtml;

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

  size : {width: number, height: number} = {width: 50, height: 50};
  EstimateSize(smile: string): {width: number, height: number} {
    let letters_only = smile.replace(/[^A-Za-z]/g, '');
    let numbers_only = smile.replace(/[^0-9]/g, '');
    let wf = 1 + letters_only.length * 0.025 - numbers_only.length * 0.035;
    let width = 50 * wf;
    let height = 50 * wf;

    this.size = {width: width, height: height};
    return {width: width, height: height};
  }

  pos : {left: string, top: string} = {left: '0px', top: '0px'};
  CalcPos() {
    if (this.disableAnimation) return {"x":0, "y":0}
    let x : number = this.size.width/ 2 + 3;
    let y : number = this.size.height / 2 + 3;
    this.pos = {left: -x+'px', top: -y+'px'}
    return {"x":-x, "y":-y};
  }

  ticks = 0;
  distanceFromCenter = 150;
  velocityMultiplier = 0.005;
  Animate() {
    if (this.disableAnimation) return;
    this.ticks++;
    var pos = this.CalcPos();
    this.pos.left = pos.x + Math.sin(this.ticks * this.velocityMultiplier)*this.distanceFromCenter + 'px';
    this.pos.top = pos.y + Math.cos(this.ticks * this.velocityMultiplier)*this.distanceFromCenter + 'px';
  }
}
