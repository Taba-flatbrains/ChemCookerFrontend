import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChemicalsService } from '../chemical/chemicals.service';
import { BackendService, CookRequest, CookResponse, PostRequestTypeUrls } from '../util/backend.service';

@Component({
  selector: 'app-cooker',
  templateUrl: './cooker.component.html',
  styleUrls: ['./cooker.component.css']
})
export class CookerComponent implements OnInit{
  constructor(private el: ElementRef, private render: Renderer2, public chemService:ChemicalsService, private backendService:BackendService) { }


  ngOnInit() {
    this.render.listen('window', 'load', () => {
        this.chemService.cookerRect = this.el.nativeElement.getBoundingClientRect();
    });
  }

  backgroundImage : string = 'assets/pot.webp';  // todo: add diferent styles

  tempFormControl = new FormControl("10");
  uvFormControl = new FormControl(false);

  submit() {
    this.backendService.Post<CookRequest, CookResponse>(PostRequestTypeUrls.Cook, {
      chemicals: this.chemService.cookerChemicals,
      temp: +this.tempFormControl.value!,
      uv: this.uvFormControl.value!
    }).subscribe(response => {
      if (response.success) {
        this.chemService.unlockedChemicals.push(...response.new_chems); 
        for (var chem of response.products) {
          chem.initpos = this.el.nativeElement.getBoundingClientRect(); 
          chem.initpos!.x += Math.random() * this.el.nativeElement.getBoundingClientRect().width - 50;
          chem.initpos!.y += Math.random() * this.el.nativeElement.getBoundingClientRect().width; - 50;
          this.chemService.chemicalsInAction.push(chem)
        }
      }
    });
  }

  clear() {
    this.chemService.cookerChemicals = [];
  }
}
