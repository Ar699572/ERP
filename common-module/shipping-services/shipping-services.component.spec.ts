import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingServicesComponent } from './shipping-services.component';

describe('ShippingServicesComponent', () => {
  let component: ShippingServicesComponent;
  let fixture: ComponentFixture<ShippingServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
