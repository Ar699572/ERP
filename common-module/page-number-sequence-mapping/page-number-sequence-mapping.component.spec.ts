import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNumberSequenceMappingComponent } from './page-number-sequence-mapping.component';

describe('PageNumberSequenceMappingComponent', () => {
  let component: PageNumberSequenceMappingComponent;
  let fixture: ComponentFixture<PageNumberSequenceMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNumberSequenceMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNumberSequenceMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
