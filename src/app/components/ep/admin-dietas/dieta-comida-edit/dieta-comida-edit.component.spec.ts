import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaComidaEditComponent } from './dieta-comida-edit.component';

describe('DietaComidaEditComponent', () => {
  let component: DietaComidaEditComponent;
  let fixture: ComponentFixture<DietaComidaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaComidaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaComidaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
