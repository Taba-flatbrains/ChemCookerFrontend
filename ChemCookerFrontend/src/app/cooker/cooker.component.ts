import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChemicalsService } from '../chemical/chemicals.service';

@Component({
  selector: 'app-cooker',
  templateUrl: './cooker.component.html',
  styleUrls: ['./cooker.component.css']
})
export class CookerComponent implements OnInit{
  constructor(private el: ElementRef, private render: Renderer2, private chemService:ChemicalsService) { }


  ngOnInit() {
    this.render.listen('window', 'load', () => {
        this.chemService.cookerRect = this.el.nativeElement.getBoundingClientRect();
        console.log(this.chemService.cookerRect);
    });
  }

  backgroundImage : string = 'assets/pot.webp';  // todo: add diferent styles

  inputs : string[] = [];

  tempFormControl = new FormControl(10);
  uvFormControl = new FormControl(false);
}
