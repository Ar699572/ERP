import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RFQPrintComponent } from './rfqprint.component';

describe('RFQPrintComponent', () => {
  let component: RFQPrintComponent;
  let fixture: ComponentFixture<RFQPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RFQPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RFQPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
