import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotaDiarioNuevaComponent } from './user-nota-diario-nueva.component';

describe('UserNotaDiarioNuevaComponent', () => {
  let component: UserNotaDiarioNuevaComponent;
  let fixture: ComponentFixture<UserNotaDiarioNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNotaDiarioNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotaDiarioNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
