import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaEjercicioNuevoComponent } from './rutina-ejercicio-nuevo.component';

describe('RutinaEjercicioNuevoComponent', () => {
  let component: RutinaEjercicioNuevoComponent;
  let fixture: ComponentFixture<RutinaEjercicioNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinaEjercicioNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaEjercicioNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
