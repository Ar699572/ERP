import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCustomerComponent } from './dropdown-customer.component';

describe('DropdownCustomerComponent', () => {
  let component: DropdownCustomerComponent;
  let fixture: ComponentFixture<DropdownCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
