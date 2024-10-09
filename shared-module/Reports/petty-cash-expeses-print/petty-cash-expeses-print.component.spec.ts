import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PettyCashExpesesPrintComponent } from './petty-cash-expeses-print.component';

describe('PettyCashExpesesPrintComponent', () => {
  let component: PettyCashExpesesPrintComponent;
  let fixture: ComponentFixture<PettyCashExpesesPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PettyCashExpesesPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PettyCashExpesesPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
