import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePurchaseReturnsComponent } from './create-purchase-returns.component';

describe('CreatePurchaseReturnsComponent', () => {
  let component: CreatePurchaseReturnsComponent;
  let fixture: ComponentFixture<CreatePurchaseReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePurchaseReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePurchaseReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
