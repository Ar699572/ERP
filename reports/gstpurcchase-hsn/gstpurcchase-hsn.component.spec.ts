import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GSTPurcchaseHSNComponent } from './gstpurcchase-hsn.component';

describe('GSTPurcchaseHSNComponent', () => {
  let component: GSTPurcchaseHSNComponent;
  let fixture: ComponentFixture<GSTPurcchaseHSNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GSTPurcchaseHSNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GSTPurcchaseHSNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
