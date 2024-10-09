import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownVendorComponent } from './dropdown-vendor.component';

describe('DropdownVendorComponent', () => {
  let component: DropdownVendorComponent;
  let fixture: ComponentFixture<DropdownVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
