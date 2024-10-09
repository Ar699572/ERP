import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GSTPurchaseComponent } from './gstpurchase.component';

describe('GSTPurchaseComponent', () => {
  let component: GSTPurchaseComponent;
  let fixture: ComponentFixture<GSTPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GSTPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GSTPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
