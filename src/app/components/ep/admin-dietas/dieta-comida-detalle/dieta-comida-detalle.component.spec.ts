import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaComidaDetalleComponent } from './dieta-comida-detalle.component';

describe('DietaComidaDetalleComponent', () => {
  let component: DietaComidaDetalleComponent;
  let fixture: ComponentFixture<DietaComidaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaComidaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaComidaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
