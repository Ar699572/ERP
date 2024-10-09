import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfarmaInvoiceComponent } from './create-profarma-invoice.component';

describe('CreateProfarmaInvoiceComponent', () => {
  let component: CreateProfarmaInvoiceComponent;
  let fixture: ComponentFixture<CreateProfarmaInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProfarmaInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProfarmaInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
