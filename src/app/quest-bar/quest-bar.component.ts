import { Component } from '@angular/core';
import { QuestService } from '../quest/quest.service';

@Component({
  selector: 'app-quest-bar',
  templateUrl: './quest-bar.component.html',
  styleUrls: ['./quest-bar.component.css']
})
export class QuestBarComponent {
  constructor(public questService:QuestService) {}
}
