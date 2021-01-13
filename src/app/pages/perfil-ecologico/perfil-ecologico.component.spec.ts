import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEcologicoComponent } from './perfil-ecologico.component';

describe('PerfilEcologicoComponent', () => {
  let component: PerfilEcologicoComponent;
  let fixture: ComponentFixture<PerfilEcologicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilEcologicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEcologicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
