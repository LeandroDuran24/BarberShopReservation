import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEstilistaComponent } from './registrar-estilista.component';

describe('RegistrarEstilistaComponent', () => {
  let component: RegistrarEstilistaComponent;
  let fixture: ComponentFixture<RegistrarEstilistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarEstilistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarEstilistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
