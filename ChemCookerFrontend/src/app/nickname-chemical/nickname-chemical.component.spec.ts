import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NicknameChemicalComponent } from './nickname-chemical.component';

describe('NicknameChemicalComponent', () => {
  let component: NicknameChemicalComponent;
  let fixture: ComponentFixture<NicknameChemicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NicknameChemicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NicknameChemicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
