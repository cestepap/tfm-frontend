import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpDietaComponent } from './ep-dieta.component';

describe('EpDietaComponent', () => {
  let component: EpDietaComponent;
  let fixture: ComponentFixture<EpDietaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpDietaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
