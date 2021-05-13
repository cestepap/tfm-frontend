import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpRutinaComponent } from './ep-rutina.component';

describe('EpRutinaComponent', () => {
  let component: EpRutinaComponent;
  let fixture: ComponentFixture<EpRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
