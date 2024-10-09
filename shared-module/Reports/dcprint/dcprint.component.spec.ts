import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DCPrintComponent } from './dcprint.component';

describe('DCPrintComponent', () => {
  let component: DCPrintComponent;
  let fixture: ComponentFixture<DCPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DCPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DCPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
