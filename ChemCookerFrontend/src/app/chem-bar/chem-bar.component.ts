import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chem-bar',
  templateUrl: './chem-bar.component.html',
  styleUrls: ['./chem-bar.component.css']
})
export class ChemBarComponent {
  @Input() ChemicalsInAction : Chemical[] = [];
  chemicals : Chemical[] = [newChemical("C1CCCCC1", "Cyclohexane", "Cyclohexane"), newChemical("C1=CC=CC=C1", "Benzene", "Benzene"), newChemical("C1=CC=C(C=C1)O", "Phenol", "Phenol"), newChemical("C1=CC=C(C=C1)C(=O)O", "Benzoic acid", "Benzoic acid"), newChemical("C1=CC=C(C=C1)C(=O)OC", "Methyl benzoate", "Methyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCC", "Ethyl benzoate", "Ethyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCC", "Propyl benzoate", "Propyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCC", "Butyl benzoate", "Butyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCC", "Hexyl benzoate", "Hexyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCC", "Heptyl benzoate", "Heptyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCC", "Octyl benzoate", "Octyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCCC", "Nonyl benzoate", "Nonyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCCCC", "Decyl benzoate", "Decyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCCCCC", "Undecyl benzoate", "Undecyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCCCCCC", "Dodecyl benzoate", "Dodecyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCCCCCCC", "Tridecyl benzoate", "Tridecyl benzoate"), newChemical("C1=CC=C(C=C1)C(=O)OCCCCCCCCCCCCC", "Tetradecyl benzoate", "T")];
}

export function newChemical(smile: string, iupac: string = "", givenname: string = "", initpos : {x: number, y: number} | undefined = undefined) : Chemical 
{
  return {smile: smile, iupac: iupac, givenname: givenname, initpos: initpos, key: crypto.randomUUID()};
}

export interface Chemical {
  smile: string;
  iupac: string;
  givenname: string;
  initpos : {x: number, y: number} | undefined;
  key : string;
}
