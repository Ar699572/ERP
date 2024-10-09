import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceReportComponent } from './sales-invoice-report.component';

describe('SalesInvoiceReportComponent', () => {
  let component: SalesInvoiceReportComponent;
  let fixture: ComponentFixture<SalesInvoiceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesInvoiceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesInvoiceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
