import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepaymentTermsComponent } from './createpayment-terms.component';

describe('CreatepaymentTermsComponent', () => {
  let component: CreatepaymentTermsComponent;
  let fixture: ComponentFixture<CreatepaymentTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepaymentTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepaymentTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
