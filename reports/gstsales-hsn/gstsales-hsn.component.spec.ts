import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GSTSalesHSNComponent } from './gstsales-hsn.component';

describe('GSTSalesHSNComponent', () => {
  let component: GSTSalesHSNComponent;
  let fixture: ComponentFixture<GSTSalesHSNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GSTSalesHSNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GSTSalesHSNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
