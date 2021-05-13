import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDiarioComponent } from './user-diario.component';

describe('DiarioComponent', () => {
  let component: UserDiarioComponent;
  let fixture: ComponentFixture<UserDiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
