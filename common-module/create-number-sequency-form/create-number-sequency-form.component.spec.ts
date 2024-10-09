import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNumberSequencyFormComponent } from './create-number-sequency-form.component';

describe('CreateNumberSequencyFormComponent', () => {
  let component: CreateNumberSequencyFormComponent;
  let fixture: ComponentFixture<CreateNumberSequencyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNumberSequencyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNumberSequencyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
