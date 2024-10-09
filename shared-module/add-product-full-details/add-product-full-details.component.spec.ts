import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductFullDetailsComponent } from './add-product-full-details.component';

describe('AddProductFullDetailsComponent', () => {
  let component: AddProductFullDetailsComponent;
  let fixture: ComponentFixture<AddProductFullDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductFullDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductFullDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
