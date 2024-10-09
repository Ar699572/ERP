import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVendorGroupComponent } from './create-vendor-group.component';

describe('CreateVendorGroupComponent', () => {
  let component: CreateVendorGroupComponent;
  let fixture: ComponentFixture<CreateVendorGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVendorGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVendorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
