import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerTypeComponent } from './create-customer-type.component';

describe('CreateCustomerTypeComponent', () => {
  let component: CreateCustomerTypeComponent;
  let fixture: ComponentFixture<CreateCustomerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCustomerTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
