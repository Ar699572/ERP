import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownChartofAccountsComponent } from './dropdown-chartof-accounts.component';

describe('DropdownChartofAccountsComponent', () => {
  let component: DropdownChartofAccountsComponent;
  let fixture: ComponentFixture<DropdownChartofAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownChartofAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownChartofAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
