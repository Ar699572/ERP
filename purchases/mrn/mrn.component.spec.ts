import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MRNComponent } from './mrn.component';

describe('MRNComponent', () => {
  let component: MRNComponent;
  let fixture: ComponentFixture<MRNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MRNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MRNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
