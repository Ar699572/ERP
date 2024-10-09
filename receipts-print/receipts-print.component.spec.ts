import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsPrintComponent } from './receipts-print.component';

describe('ReceiptsPrintComponent', () => {
  let component: ReceiptsPrintComponent;
  let fixture: ComponentFixture<ReceiptsPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptsPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptsPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
