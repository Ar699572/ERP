import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCentralComponent } from './customer-central.component';

describe('CustomerCentralComponent', () => {
  let component: CustomerCentralComponent;
  let fixture: ComponentFixture<CustomerCentralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCentralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
