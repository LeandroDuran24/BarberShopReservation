import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstilistaComponent } from './editar-estilista.component';

describe('EditarEstilistaComponent', () => {
  let component: EditarEstilistaComponent;
  let fixture: ComponentFixture<EditarEstilistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEstilistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEstilistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
