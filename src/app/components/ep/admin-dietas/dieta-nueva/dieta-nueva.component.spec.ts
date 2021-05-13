import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaNuevaComponent } from './dieta-nueva.component';

describe('DietaNuevaComponent', () => {
  let component: DietaNuevaComponent;
  let fixture: ComponentFixture<DietaNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
