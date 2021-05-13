import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaDiaSemanaNuevaComponent } from './dieta-dia-semana-nueva.component';

describe('DietaDiaSemanaNuevaComponent', () => {
  let component: DietaDiaSemanaNuevaComponent;
  let fixture: ComponentFixture<DietaDiaSemanaNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaDiaSemanaNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaDiaSemanaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
