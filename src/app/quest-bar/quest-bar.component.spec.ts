import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestBarComponent } from './quest-bar.component';

describe('QuestBarComponent', () => {
  let component: QuestBarComponent;
  let fixture: ComponentFixture<QuestBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestBarComponent]
    });
    fixture = TestBed.createComponent(QuestBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
