import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaDiaSemanaRutinaNuevaComponent } from './rutina-dia-semana-rutina-nueva.component';

describe('RutinaDiaSemanaRutinaNuevaComponent', () => {
  let component: RutinaDiaSemanaRutinaNuevaComponent;
  let fixture: ComponentFixture<RutinaDiaSemanaRutinaNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinaDiaSemanaRutinaNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaDiaSemanaRutinaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
