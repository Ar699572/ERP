import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuotationReportComponent } from './purchase-quotation-report.component';

describe('PurchaseQuotationReportComponent', () => {
  let component: PurchaseQuotationReportComponent;
  let fixture: ComponentFixture<PurchaseQuotationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseQuotationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseQuotationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
