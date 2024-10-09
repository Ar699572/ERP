import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePurchaseQuotationComponent } from './create-purchase-quotation.component';

describe('CreatePurchaseQuotationComponent', () => {
  let component: CreatePurchaseQuotationComponent;
  let fixture: ComponentFixture<CreatePurchaseQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePurchaseQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePurchaseQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
