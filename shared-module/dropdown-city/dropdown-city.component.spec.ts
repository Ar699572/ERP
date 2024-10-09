import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCityComponent } from './dropdown-city.component';

describe('DropdownCityComponent', () => {
  let component: DropdownCityComponent;
  let fixture: ComponentFixture<DropdownCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
