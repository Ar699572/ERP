import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSalesQuotationComponent } from './create-sales-quotation.component';

describe('CreateSalesQuotationComponent', () => {
  let component: CreateSalesQuotationComponent;
  let fixture: ComponentFixture<CreateSalesQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSalesQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSalesQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
