import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDifficultyComponent } from './change-difficulty.component';

describe('ChangeDifficultyComponent', () => {
  let component: ChangeDifficultyComponent;
  let fixture: ComponentFixture<ChangeDifficultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeDifficultyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeDifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
