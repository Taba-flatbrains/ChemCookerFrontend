import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RDKitModule } from '@rdkit/rdkit';
import { RDKitLoaderService } from '../chemical/chemical.component';
import { QuestService } from './quest.service';
import { LoggedInService } from '../login/logged-in.service';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent implements AfterViewInit, OnChanges, OnInit {
  constructor(private rdkitService: RDKitLoaderService, private domSanitizer: DomSanitizer, private cdref: ChangeDetectorRef,
    private questService: QuestService, private loggedInService: LoggedInService
  ) {}

  qctypes = QuestConditionTypes; // for html access

  @Input() self : Quest = {
    id: 1,
    description: "Big Chongus amongus",
    reward_skillpoints: 1,
    reward_misc: null,
    condition_type: QuestConditionTypes.ObtainChemical,
    condition_value: "CC(=O)CC"
  };

  ngOnInit(): void {
    this.questService.RefreshQuestEvent.subscribe(() => {
      this.ngAfterViewInit();
    });
    this.loggedInService.LoggedInStatusChangeEvent.subscribe(() => {
      this.questService.refreshQuests();
      this.ngAfterViewInit();
    });
  }

  svg : undefined | SafeHtml;

  text : undefined | string;
  true_smile : undefined | string;
  backgroundColor : string = "#7f7f7fff";
  borderWidth : string = "1px";

  size : {width: number, height: number} = {width: 50, height: 50};
  
  // DIAS = Dont interpret as SMILES
  readonly DIASSymbol : string = "\"";
  ngAfterViewInit() {
    if (this.questService.completedQuests.includes(this.self.id)) {
      this.backgroundColor = "#2fbe0f7f";
      this.borderWidth = "3px";
    }
    this.text = undefined;
    this.rdkitService.getRDKit().subscribe(
      (rdkit: RDKitModule) => {
        const parts = this.self.condition_value.split(this.DIASSymbol)
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

  ngOnChanges(changes: SimpleChanges): void {
    this.ngAfterViewInit();
  }

  
  selectQuest() {
    this.questService.changeCurrentQuest(this.self.id);
  }
}

export interface Quest {
    id: number;
    description: string;
    reward_skillpoints: number;
    reward_misc: string | null;
    condition_type: string;
    condition_value: string;
}

export enum QuestConditionTypes {
  ObtainChemical = "obtain_chemical"
}