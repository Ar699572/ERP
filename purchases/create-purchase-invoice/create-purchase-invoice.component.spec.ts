import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePurchaseInvoiceComponent } from './create-purchase-invoice.component';

describe('CreatePurchaseInvoiceComponent', () => {
  let component: CreatePurchaseInvoiceComponent;
  let fixture: ComponentFixture<CreatePurchaseInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePurchaseInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePurchaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
