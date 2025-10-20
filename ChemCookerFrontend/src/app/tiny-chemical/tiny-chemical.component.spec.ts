import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinyChemicalComponent } from './tiny-chemical.component';

describe('TinyChemicalComponent', () => {
  let component: TinyChemicalComponent;
  let fixture: ComponentFixture<TinyChemicalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TinyChemicalComponent]
    });
    fixture = TestBed.createComponent(TinyChemicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
