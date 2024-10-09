import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GSTSalesComponent } from './gstsales.component';

describe('GSTSalesComponent', () => {
  let component: GSTSalesComponent;
  let fixture: ComponentFixture<GSTSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GSTSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GSTSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
