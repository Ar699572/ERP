import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShippingServicesComponent } from './create-shipping-services.component';

describe('CreateShippingServicesComponent', () => {
  let component: CreateShippingServicesComponent;
  let fixture: ComponentFixture<CreateShippingServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShippingServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShippingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
