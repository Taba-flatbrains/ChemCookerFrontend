import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyChallengeSelectorComponent } from './daily-challenge-selector.component';

describe('DailyChallengeSelectorComponent', () => {
  let component: DailyChallengeSelectorComponent;
  let fixture: ComponentFixture<DailyChallengeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyChallengeSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyChallengeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
