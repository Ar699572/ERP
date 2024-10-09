import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RFQOverviewComponent } from './rfqoverview.component';

describe('RFQOverviewComponent', () => {
  let component: RFQOverviewComponent;
  let fixture: ComponentFixture<RFQOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RFQOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RFQOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
