import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReciclajesComponent } from './mis-reciclajes.component';

describe('MisReciclajesComponent', () => {
  let component: MisReciclajesComponent;
  let fixture: ComponentFixture<MisReciclajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisReciclajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisReciclajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
