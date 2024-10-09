import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownStateComponent } from './dropdown-state.component';

describe('DropdownStateComponent', () => {
  let component: DropdownStateComponent;
  let fixture: ComponentFixture<DropdownStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
