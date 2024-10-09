import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVendorTypeComponent } from './create-vendor-type.component';

describe('CreateVendorTypeComponent', () => {
  let component: CreateVendorTypeComponent;
  let fixture: ComponentFixture<CreateVendorTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVendorTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVendorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
