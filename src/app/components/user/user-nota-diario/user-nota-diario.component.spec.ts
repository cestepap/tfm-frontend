import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotaDiarioComponent } from './user-nota-diario.component';

describe('UserNotaDiarioComponent', () => {
  let component: UserNotaDiarioComponent;
  let fixture: ComponentFixture<UserNotaDiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNotaDiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotaDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
