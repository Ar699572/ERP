import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfarmaInvoiceComponent } from './profarma-invoice.component';

describe('ProfarmaInvoiceComponent', () => {
  let component: ProfarmaInvoiceComponent;
  let fixture: ComponentFixture<ProfarmaInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfarmaInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfarmaInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
