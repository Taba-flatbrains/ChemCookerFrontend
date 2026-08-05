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

  text : undefined | string;
  true_smile : undefined | string;

  size : {width: number, height: number} = {width: 50, height: 50};

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

  wf_multiplier = 3.3;
  // todo: make more beautiful
  EstimateSizeSmile(smile: string): {width: number, height: number} {
    let letters_only = smile.replace(/[^A-Za-z]/g, '');
    let numbers_only = smile.replace(/[^0-9]/g, '');
    let wf = 1 + (letters_only.length * 0.025 - numbers_only.length * 0.025) * this.wf_multiplier;
    let width = 50 * wf;
    let height = 50 * wf;

    this.size = {width: width, height: height};
    return {width: width, height: height};
  }

  EstimateSizeText(text: string): {width: number, height: number} {
    let width_increase = text.replace(/[^A-Za-z]/g, '').length * 1;
    
    let wf = 1;
    let letters_only = '';
    if (this.true_smile) {
      letters_only = this.true_smile.replace(/[^A-Za-z]/g, '');
      let numbers_only = this.true_smile.replace(/[^0-9]/g, '');
      wf = 1 + (letters_only.length * 0.025 - numbers_only.length * 0.015) * this.wf_multiplier;
    }
    let height = 50 * wf;
    let width = 50 * wf + width_increase;


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
