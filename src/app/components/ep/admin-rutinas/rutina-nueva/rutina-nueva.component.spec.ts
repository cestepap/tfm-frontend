import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaNuevaComponent } from './rutina-nueva.component';

describe('RutinaNuevaComponent', () => {
  let component: RutinaNuevaComponent;
  let fixture: ComponentFixture<RutinaNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinaNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
