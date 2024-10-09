import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesQuotationReportComponent } from './sales-quotation-report.component';

describe('SalesQuotationReportComponent', () => {
  let component: SalesQuotationReportComponent;
  let fixture: ComponentFixture<SalesQuotationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesQuotationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesQuotationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
