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
  constructor(private el: ElementRef, private render: Renderer2, private chemService:ChemicalsService, private backendService:BackendService) { }


  ngOnInit() {
    this.render.listen('window', 'load', () => {
        this.chemService.cookerRect = this.el.nativeElement.getBoundingClientRect();
    });
  }

  backgroundImage : string = 'assets/pot.webp';  // todo: add diferent styles

  tempFormControl = new FormControl(10);
  uvFormControl = new FormControl(false);

  submit() {
    this.backendService.Post<CookRequest, CookResponse>(PostRequestTypeUrls.Cook, {
      chemicals: this.chemService.cookerChemicals,
      temp: this.tempFormControl.value!,
      uv: this.uvFormControl.value!
    }).subscribe(response => {
      if (response.success) {
      this.chemService.unlockedChemicals.push(...response.products);
      }
    });
  }

  clear() {
    this.chemService.cookerChemicals = [];
  }
}
