import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEpComponent } from './header-ep.component';

describe('HeaderEpComponent', () => {
  let component: HeaderEpComponent;
  let fixture: ComponentFixture<HeaderEpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderEpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
