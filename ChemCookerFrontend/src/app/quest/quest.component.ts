import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RDKitModule } from '@rdkit/rdkit';
import { RDKitLoaderService } from '../chemical/chemical.component';
import { QuestService } from './quest.service';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent {
  constructor(private rdkitService: RDKitLoaderService, private domSanitizer: DomSanitizer, private cdref: ChangeDetectorRef,
    private questService: QuestService
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

  svg : undefined | SafeHtml;
  
  ngAfterViewInit() {
      this.rdkitService.getRDKit().subscribe(
        (rdkit: RDKitModule) => {
            const temp : string | undefined = rdkit.get_mol(this.self.condition_value)?.get_svg(this.EstimateSize(this.self.condition_value).width, this.EstimateSize(this.self.condition_value).height);
            if (temp)
              this.svg = this.domSanitizer.bypassSecurityTrustHtml(temp);
            this.cdref.detectChanges();
        }
      )
    }

  size : {width: number, height: number} = {width: 50, height: 50};
  EstimateSize(smile: string): {width: number, height: number} {
    let letters_only = smile.replace(/[^A-Za-z]/g, '');
    let numbers_only = smile.replace(/[^0-9]/g, '');
    let wf = 1 + letters_only.length * 0.05 - numbers_only.length * 0.07;
    let width = Math.max(80, window.outerWidth * 0.085) * wf;
    let height = Math.max(70, window.outerWidth * 0.08);

    // limit width to 30% of screen width
    if (width > window.outerWidth * 0.3) {
      width = window.outerWidth * 0.3;
    }
    // limit height to 11% of screen height
    if (height > window.outerHeight * 0.11) {
      height = window.outerHeight * 0.11;
    }

    this.size = {width: width, height: height};
    return {width: width, height: height};
  }

  selectQuest() {
    this.questService.selectedQuest = this.self.id;
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