import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsTermsComponent } from './payments-terms.component';

describe('PaymentsTermsComponent', () => {
  let component: PaymentsTermsComponent;
  let fixture: ComponentFixture<PaymentsTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
