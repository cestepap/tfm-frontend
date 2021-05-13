import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEpComponent } from './home-ep.component';

describe('HomeEpComponent', () => {
  let component: HomeEpComponent;
  let fixture: ComponentFixture<HomeEpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
