import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEstilistaComponent } from './consulta-estilista.component';

describe('ConsultaEstilistaComponent', () => {
  let component: ConsultaEstilistaComponent;
  let fixture: ComponentFixture<ConsultaEstilistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaEstilistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaEstilistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
