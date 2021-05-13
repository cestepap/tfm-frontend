import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaVistaDetalleComponent } from './rutina-vista-detalle.component';

describe('RutinaVistaDetalleComponent', () => {
  let component: RutinaVistaDetalleComponent;
  let fixture: ComponentFixture<RutinaVistaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinaVistaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaVistaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
