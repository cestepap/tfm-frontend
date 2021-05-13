import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaVistaGeneralComponent } from './dieta-vista-general.component';

describe('DietaVistaGeneralComponent', () => {
  let component: DietaVistaGeneralComponent;
  let fixture: ComponentFixture<DietaVistaGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaVistaGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaVistaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
