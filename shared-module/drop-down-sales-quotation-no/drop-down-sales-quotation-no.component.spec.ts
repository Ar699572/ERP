import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownSalesQuotationNoComponent } from './drop-down-sales-quotation-no.component';

describe('DropDownSalesQuotationNoComponent', () => {
  let component: DropDownSalesQuotationNoComponent;
  let fixture: ComponentFixture<DropDownSalesQuotationNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownSalesQuotationNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownSalesQuotationNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
