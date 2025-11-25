import { Component } from '@angular/core';
import { ChemicalsService } from '../chemical/chemicals.service';

@Component({
  selector: 'app-pending-reactions',
  templateUrl: './pending-reactions.component.html',
  styleUrl: './pending-reactions.component.css'
})
export class PendingReactionsComponent {
  constructor(public chemService:ChemicalsService) { }
}
