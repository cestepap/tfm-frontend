import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEjerciciosComponent } from './admin-ejercicios.component';

describe('AdminEjerciciosComponent', () => {
  let component: AdminEjerciciosComponent;
  let fixture: ComponentFixture<AdminEjerciciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEjerciciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
