import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseinvoicereportComponent } from './purchaseinvoicereport.component';

describe('PurchaseinvoicereportComponent', () => {
  let component: PurchaseinvoicereportComponent;
  let fixture: ComponentFixture<PurchaseinvoicereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseinvoicereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseinvoicereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
