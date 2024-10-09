import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotaionsComponent } from './quotaions.component';

describe('QuotaionsComponent', () => {
  let component: QuotaionsComponent;
  let fixture: ComponentFixture<QuotaionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotaionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotaionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
