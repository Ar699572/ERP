import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePageNumberSequenceMappingComponent } from './create-page-number-sequence-mapping.component';

describe('CreatePageNumberSequenceMappingComponent', () => {
  let component: CreatePageNumberSequenceMappingComponent;
  let fixture: ComponentFixture<CreatePageNumberSequenceMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePageNumberSequenceMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePageNumberSequenceMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
