import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewloginpageComponent } from './overviewloginpage.component';

describe('OverviewloginpageComponent', () => {
  let component: OverviewloginpageComponent;
  let fixture: ComponentFixture<OverviewloginpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewloginpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewloginpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
