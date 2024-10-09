import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcreturnreportsComponent } from './dcreturnreports.component';

describe('DcreturnreportsComponent', () => {
  let component: DcreturnreportsComponent;
  let fixture: ComponentFixture<DcreturnreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcreturnreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcreturnreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
