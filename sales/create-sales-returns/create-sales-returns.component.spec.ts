import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSalesReturnsComponent } from './create-sales-returns.component';

describe('CreateSalesReturnsComponent', () => {
  let component: CreateSalesReturnsComponent;
  let fixture: ComponentFixture<CreateSalesReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSalesReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSalesReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
