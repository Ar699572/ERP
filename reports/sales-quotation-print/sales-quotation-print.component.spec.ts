import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationPrintComponent } from './sales-quotation-print.component';

describe('SalesQuotationPrintComponent', () => {
  let component: SalesQuotationPrintComponent;
  let fixture: ComponentFixture<SalesQuotationPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQuotationPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQuotationPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
