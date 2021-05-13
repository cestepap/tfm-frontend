import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDietaComponent } from './user-dieta.component';

describe('UserDietaComponent', () => {
  let component: UserDietaComponent;
  let fixture: ComponentFixture<UserDietaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDietaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
