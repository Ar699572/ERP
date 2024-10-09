import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCentralComponent } from './vendor-central.component';

describe('VendorCentralComponent', () => {
  let component: VendorCentralComponent;
  let fixture: ComponentFixture<VendorCentralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorCentralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
