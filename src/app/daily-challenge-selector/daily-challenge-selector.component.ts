import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-daily-challenge-selector',
  templateUrl: './daily-challenge-selector.component.html',
  styleUrl: './daily-challenge-selector.component.css'
})
export class DailyChallengeSelectorComponent {
  constructor (private router:Router) {}

  chooseDailyChallange(id : number) {
    this.router.navigate(['/daily-challenge', id])
  }
}
