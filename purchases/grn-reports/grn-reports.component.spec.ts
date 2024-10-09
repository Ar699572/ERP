import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnReportsComponent } from './grn-reports.component';

describe('GrnReportsComponent', () => {
  let component: GrnReportsComponent;
  let fixture: ComponentFixture<GrnReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
