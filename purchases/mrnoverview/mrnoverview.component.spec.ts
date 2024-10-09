import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MRNOverviewComponent } from './mrnoverview.component';

describe('MRNOverviewComponent', () => {
  let component: MRNOverviewComponent;
  let fixture: ComponentFixture<MRNOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MRNOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MRNOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
