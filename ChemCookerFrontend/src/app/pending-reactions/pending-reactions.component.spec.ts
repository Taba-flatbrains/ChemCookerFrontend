import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReactionsComponent } from './pending-reactions.component';

describe('PendingReactionsComponent', () => {
  let component: PendingReactionsComponent;
  let fixture: ComponentFixture<PendingReactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingReactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
