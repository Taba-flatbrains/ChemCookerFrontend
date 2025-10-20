import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoggedInService } from '../login/logged-in.service';
import { AvailableChemicalsResponse, BackendService, GetRequestTypeUrls } from '../util/backend.service';
import { ChemicalsService } from '../chemical/chemicals.service';

@Component({
  selector: 'app-chem-bar',
  templateUrl: './chem-bar.component.html',
  styleUrls: ['./chem-bar.component.css']
})
export class ChemBarComponent implements OnInit{
  constructor(private loggedInService:LoggedInService, private backendService:BackendService, public chemicalsService:ChemicalsService) {}

  ngOnInit(): void {
    this.loggedInService.LoggedInStatusChangeEvent.subscribe((loggedIn:boolean) => {
      if(loggedIn) [
        this.backendService.Get<AvailableChemicalsResponse>(GetRequestTypeUrls.GetAvailableChemicals).subscribe((response) => {
          this.chemicalsService.unlockedChemicals = response.chemicals;
          this.visibleChemicals = response.chemicals;
        })
      ]
    })
  }

  visibleChemicals : Chemical[] = this.chemicalsService.unlockedChemicals;

  onWheel(event: WheelEvent): void {
   document.getElementById("scroller")!.scrollLeft += event.deltaY; // not very smooth
   event.preventDefault();
  } 

  seachFormControl = new FormControl('');
  onSearchChange(event:Event): void {
    this.search();
  }

  filter : string = "all";
  onFilterChange(event: Event): void {
    this.filter = (event.target as HTMLInputElement).value.toLowerCase();
    this.search();
  }

  search() {
    if (this.seachFormControl.value == "") { this.clearSearch(); return; }
    switch(this.filter) {
      case "nickname":
        this.visibleChemicals = this.chemicalsService.unlockedChemicals.filter(chem => 
        chem.nickname.toLowerCase().includes(this.seachFormControl.value!)
        );
        break;
      case "iupac":
        this.visibleChemicals = this.chemicalsService.unlockedChemicals.filter(chem => 
        chem.iupac.toLowerCase().includes(this.seachFormControl.value!)
        );
        break;
      case "smile":
        this.visibleChemicals = this.chemicalsService.unlockedChemicals.filter(chem => 
        chem.smile.toLowerCase().includes(this.seachFormControl.value!)
        );
        break;
      default:
        this.visibleChemicals = this.chemicalsService.unlockedChemicals.filter(chem => 
        chem.smile.toLowerCase().includes(this.seachFormControl.value!) || 
        chem.iupac.toLowerCase().includes(this.seachFormControl.value!) || 
        chem.nickname.toLowerCase().includes(this.seachFormControl.value!)
        );
        break;
    }
  }

  clearSearch(): void {
    this.seachFormControl.reset();
    this.visibleChemicals = this.chemicalsService.unlockedChemicals;
  }
}

export function newChemical(smile: string, iupac: string = "", nickname: string = "", 
  initpos : {x: number, y: number} | undefined = undefined, dragOnCreate = false) : Chemical 
{
  return {smile: smile, iupac: iupac, nickname: nickname, initpos: initpos, key: crypto.randomUUID(), dragOnCreate : dragOnCreate};
}

export interface Chemical {
  smile: string;
  iupac: string;
  nickname: string;
  initpos : {x: number, y: number} | undefined;
  key : string | undefined;
  dragOnCreate : boolean | undefined;
}
