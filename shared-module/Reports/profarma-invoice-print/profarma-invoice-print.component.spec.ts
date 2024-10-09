import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfarmaInvoicePrintComponent } from './profarma-invoice-print.component';

describe('ProfarmaInvoicePrintComponent', () => {
  let component: ProfarmaInvoicePrintComponent;
  let fixture: ComponentFixture<ProfarmaInvoicePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfarmaInvoicePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfarmaInvoicePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
