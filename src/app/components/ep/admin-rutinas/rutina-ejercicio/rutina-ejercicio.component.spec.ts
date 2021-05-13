import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaEjercicioComponent } from './rutina-ejercicio.component';

describe('RutinaEjercicioComponent', () => {
  let component: RutinaEjercicioComponent;
  let fixture: ComponentFixture<RutinaEjercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinaEjercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
