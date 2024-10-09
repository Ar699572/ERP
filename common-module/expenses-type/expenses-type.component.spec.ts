import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesTypeComponent } from './expenses-type.component';

describe('ExpensesTypeComponent', () => {
  let component: ExpensesTypeComponent;
  let fixture: ComponentFixture<ExpensesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
