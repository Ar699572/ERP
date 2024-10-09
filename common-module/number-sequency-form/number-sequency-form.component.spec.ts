import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSequencyFormComponent } from './number-sequency-form.component';

describe('NumberSequencyFormComponent', () => {
  let component: NumberSequencyFormComponent;
  let fixture: ComponentFixture<NumberSequencyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberSequencyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberSequencyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
