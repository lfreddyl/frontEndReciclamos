import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPostulacionesComponent } from './mis-postulaciones.component';

describe('MisPostulacionesComponent', () => {
  let component: MisPostulacionesComponent;
  let fixture: ComponentFixture<MisPostulacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisPostulacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPostulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
