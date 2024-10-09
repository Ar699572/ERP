import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewVendorComponent } from './create-new-vendor.component';

describe('CreateNewVendorComponent', () => {
  let component: CreateNewVendorComponent;
  let fixture: ComponentFixture<CreateNewVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
