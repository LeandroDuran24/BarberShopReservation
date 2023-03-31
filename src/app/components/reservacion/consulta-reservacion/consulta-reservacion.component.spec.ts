import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaReservacionComponent } from './consulta-reservacion.component';

describe('ConsultaReservacionComponent', () => {
  let component: ConsultaReservacionComponent;
  let fixture: ComponentFixture<ConsultaReservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaReservacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
