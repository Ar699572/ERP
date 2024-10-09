import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoicePrintComponent } from './purchase-invoice-print.component';

describe('PurchaseInvoicePrintComponent', () => {
  let component: PurchaseInvoicePrintComponent;
  let fixture: ComponentFixture<PurchaseInvoicePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseInvoicePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseInvoicePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
