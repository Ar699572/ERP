import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseTaxDetailsComponent } from './add-purchase-tax-details.component';

describe('AddPurchaseTaxDetailsComponent', () => {
  let component: AddPurchaseTaxDetailsComponent;
  let fixture: ComponentFixture<AddPurchaseTaxDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPurchaseTaxDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseTaxDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
