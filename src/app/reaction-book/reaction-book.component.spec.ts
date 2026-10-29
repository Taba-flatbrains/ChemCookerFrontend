import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionBookComponent } from './reaction-book.component';

describe('ReactionBookComponent', () => {
  let component: ReactionBookComponent;
  let fixture: ComponentFixture<ReactionBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactionBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReactionBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
