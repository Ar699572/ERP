import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PettyCashBookPrintComponent } from './petty-cash-book-print.component';

describe('PettyCashBookPrintComponent', () => {
  let component: PettyCashBookPrintComponent;
  let fixture: ComponentFixture<PettyCashBookPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PettyCashBookPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PettyCashBookPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
