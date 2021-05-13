import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaVistaDetalleComponent } from './dieta-vista-detalle.component';

describe('DietaVistaDetalleComponent', () => {
  let component: DietaVistaDetalleComponent;
  let fixture: ComponentFixture<DietaVistaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaVistaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaVistaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
