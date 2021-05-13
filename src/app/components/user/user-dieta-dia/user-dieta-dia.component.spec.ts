import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDietaDiaComponent } from './user-dieta-dia.component';

describe('UserDietaDiaComponent', () => {
  let component: UserDietaDiaComponent;
  let fixture: ComponentFixture<UserDietaDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDietaDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDietaDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
