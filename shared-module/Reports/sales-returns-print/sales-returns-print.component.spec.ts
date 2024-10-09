import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnsPrintComponent } from './sales-returns-print.component';

describe('SalesReturnsPrintComponent', () => {
  let component: SalesReturnsPrintComponent;
  let fixture: ComponentFixture<SalesReturnsPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReturnsPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReturnsPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
