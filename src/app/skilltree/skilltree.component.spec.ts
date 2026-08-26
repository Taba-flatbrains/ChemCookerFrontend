import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkilltreeComponent } from './skilltree.component';

describe('SkilltreeComponent', () => {
  let component: SkilltreeComponent;
  let fixture: ComponentFixture<SkilltreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkilltreeComponent]
    });
    fixture = TestBed.createComponent(SkilltreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
