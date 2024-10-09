import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChargesAccountComponent } from './add-charges-account.component';

describe('AddChargesAccountComponent', () => {
  let component: AddChargesAccountComponent;
  let fixture: ComponentFixture<AddChargesAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChargesAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChargesAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
