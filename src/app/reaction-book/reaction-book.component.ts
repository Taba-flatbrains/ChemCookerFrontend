import { Component } from '@angular/core';
import { Reaction } from '../cooker/cooker.component';
import { BackendService } from '../util/backend.service';
import { ReactionBookService } from './reaction-book.service';

@Component({
  selector: 'app-reaction-book',
  templateUrl: './reaction-book.component.html',
  styleUrl: './reaction-book.component.css'
})
export class ReactionBookComponent {
  constructor (private backendService : BackendService, public reactionBookService: ReactionBookService) {}

  tempToString : { [id:number] : string} = { 1 : "Cold", 10 : "rt. ", 11 : "rt", 100: "Reflux", 110 : "rt", 111 : "rt", 1000 : "pyro",
    1100 : "heating", 1110 : "heating"
  }

  // todo: suche adden
}

export interface fullReaction extends Reaction {
  outputs : string[]
  description : string | null
}
