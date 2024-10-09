import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePartyComponent } from './save-party.component';

describe('SavePartyComponent', () => {
  let component: SavePartyComponent;
  let fixture: ComponentFixture<SavePartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavePartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
