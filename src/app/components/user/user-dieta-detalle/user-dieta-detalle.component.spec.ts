import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDietaDetalleComponent } from './user-dieta-detalle.component';

describe('UserDietaDetalleComponent', () => {
  let component: UserDietaDetalleComponent;
  let fixture: ComponentFixture<UserDietaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDietaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDietaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
