import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuotationPrintComponent } from './purchase-quotation-print.component';

describe('PurchaseQuotationPrintComponent', () => {
  let component: PurchaseQuotationPrintComponent;
  let fixture: ComponentFixture<PurchaseQuotationPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseQuotationPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseQuotationPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
