import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulacionPublicacionComponent } from './postulacion-publicacion.component';

describe('PostulacionPublicacionComponent', () => {
  let component: PostulacionPublicacionComponent;
  let fixture: ComponentFixture<PostulacionPublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostulacionPublicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostulacionPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
