import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownNumberSequenceComponent } from './dropdown-number-sequence.component';

describe('DropdownNumberSequenceComponent', () => {
  let component: DropdownNumberSequenceComponent;
  let fixture: ComponentFixture<DropdownNumberSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownNumberSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownNumberSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
