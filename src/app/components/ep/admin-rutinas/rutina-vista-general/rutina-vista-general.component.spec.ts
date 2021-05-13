import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaVistaGeneralComponent } from './rutina-vista-general.component';

describe('RutinaVistaGeneralComponent', () => {
  let component: RutinaVistaGeneralComponent;
  let fixture: ComponentFixture<RutinaVistaGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinaVistaGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaVistaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
