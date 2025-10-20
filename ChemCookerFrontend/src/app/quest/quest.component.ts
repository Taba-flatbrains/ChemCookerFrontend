import { Component } from '@angular/core';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent {

}

export interface Quest {
    id: number;
    description: string;
    reward_skillpoints: number;
    reward_misc: string | null;
    condition_type: string;
    condition_value: string;
}