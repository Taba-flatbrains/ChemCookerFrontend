import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitAccountDialogComponent } from './init-account-dialog.component';

describe('InitAccountDialogComponent', () => {
  let component: InitAccountDialogComponent;
  let fixture: ComponentFixture<InitAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitAccountDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
