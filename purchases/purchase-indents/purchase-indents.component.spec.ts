import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseIndentsComponent } from './purchase-indents.component';

describe('PurchaseIndentsComponent', () => {
  let component: PurchaseIndentsComponent;
  let fixture: ComponentFixture<PurchaseIndentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseIndentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseIndentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
