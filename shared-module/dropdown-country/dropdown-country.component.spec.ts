import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCountryComponent } from './dropdown-country.component';

describe('DropdownCountryComponent', () => {
  let component: DropdownCountryComponent;
  let fixture: ComponentFixture<DropdownCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
