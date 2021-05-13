import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRutinaComponent } from './user-rutina.component';

describe('UserRutinaComponent', () => {
  let component: UserRutinaComponent;
  let fixture: ComponentFixture<UserRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
