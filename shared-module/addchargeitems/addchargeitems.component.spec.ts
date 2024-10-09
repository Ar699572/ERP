import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddchargeitemsComponent } from './addchargeitems.component';

describe('AddchargeitemsComponent', () => {
  let component: AddchargeitemsComponent;
  let fixture: ComponentFixture<AddchargeitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddchargeitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddchargeitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
