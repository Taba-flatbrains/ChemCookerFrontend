import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cooker',
  templateUrl: './cooker.component.html',
  styleUrls: ['./cooker.component.css']
})
export class CookerComponent {
  backgroundImage : string = 'assets/pot.webp';  // todo: add diferent styles

  inputs : string[] = [];

  tempFormControl = new FormControl(10);
  uvFormControl = new FormControl(false);
}
