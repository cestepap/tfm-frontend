import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRutinaDetalleComponent } from './user-rutina-detalle.component';

describe('UserRutinaDetalleComponent', () => {
  let component: UserRutinaDetalleComponent;
  let fixture: ComponentFixture<UserRutinaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRutinaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRutinaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
