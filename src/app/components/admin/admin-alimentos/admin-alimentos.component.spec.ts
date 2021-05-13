import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlimentosComponent } from './admin-alimentos.component';

describe('AdminAlimentosComponent', () => {
  let component: AdminAlimentosComponent;
  let fixture: ComponentFixture<AdminAlimentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
