import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkilltreeNodeComponent } from './skilltree-node.component';

describe('SkilltreeNodeComponent', () => {
  let component: SkilltreeNodeComponent;
  let fixture: ComponentFixture<SkilltreeNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkilltreeNodeComponent]
    });
    fixture = TestBed.createComponent(SkilltreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
