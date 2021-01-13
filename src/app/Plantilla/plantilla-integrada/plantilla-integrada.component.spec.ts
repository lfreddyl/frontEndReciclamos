import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaIntegradaComponent } from './plantilla-integrada.component';

describe('PlantillaIntegradaComponent', () => {
  let component: PlantillaIntegradaComponent;
  let fixture: ComponentFixture<PlantillaIntegradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaIntegradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaIntegradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
