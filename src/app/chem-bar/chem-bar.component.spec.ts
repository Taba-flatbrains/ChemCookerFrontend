import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemBarComponent } from './chem-bar.component';

describe('ChemBarComponent', () => {
  let component: ChemBarComponent;
  let fixture: ComponentFixture<ChemBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChemBarComponent]
    });
    fixture = TestBed.createComponent(ChemBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
