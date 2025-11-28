import { Component } from '@angular/core';
import { ChemicalsService } from '../chemical/chemicals.service';

@Component({
  selector: 'app-pending-reactions',
  templateUrl: './pending-reactions.component.html',
  styleUrl: './pending-reactions.component.css'
})
export class PendingReactionsComponent {
  constructor(public chemService:ChemicalsService) { }

  tempToString : { [id:number] : string} = { 1 : "Cold", 10 : "rt. ", 100: "Reflux", 1000 : "pyro"}
}
