import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendService, PostRequestTypeUrls, UpdateNickanameRequest, UpdateNicknameResponse } from '../util/backend.service';
import { ChemicalsService } from '../chemical/chemicals.service';

@Component({
  selector: 'app-nickname-chemical',
  standalone: false,
  templateUrl: './nickname-chemical.component.html',
  styleUrls: ['./nickname-chemical.component.css']
})
export class NicknameChemicalComponent implements OnInit {
  data : NichnameChemicalData = inject(MAT_DIALOG_DATA);

  nicknameFormControl: FormControl = new FormControl(this.data.nickname);
  constructor(private backendService:BackendService, private chemSerivce:ChemicalsService) { }
  
  ngOnInit(): void {
    this.nicknameFormControl.valueChanges.subscribe(value => {
      this.data.nickname = value;
      this.backendService.Post<UpdateNickanameRequest, UpdateNicknameResponse>(PostRequestTypeUrls.SetNickame, {smile: this.data.smile, nickname: value}).subscribe();
      this.chemSerivce.unlockedChemicals.find(chem => chem.smile === this.data.smile)!.nickname = value;
      this.chemSerivce.refreshChemicals();
    });
  }
}

export interface NichnameChemicalData {
  smile: string;
  iupac: string;
  nickname: string;
}