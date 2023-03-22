import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstilistaService } from 'src/app/services/estilista.service';
import { Estilistas } from 'src/models/estilista';

@Component({
  selector: 'app-registrar-estilista',
  templateUrl: './registrar-estilista.component.html',
  styleUrls: ['./registrar-estilista.component.css']
})
export class RegistrarEstilistaComponent {

  registroEstilista: FormGroup;

  loading = false;
  selectedDate: Date = new Date();

  constructor(private router: Router, private fb: FormBuilder, private toast: ToastrService, private estilistaService: EstilistaService) {

    this.registroEstilista = fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
      sexo: ['', Validators.required],
      direccion: ['', Validators.required],
      provincia: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      celular: ['', [Validators.pattern('[0-9 ]*')]],
      fechaNacimiento: [''],
      email: ['', Validators.required]

    })
  }

  reset(): any {

    this.registroEstilista.reset();
  }

  onSelect(evt: any) {
    this.selectedDate = new Date(evt.year, evt.month - 1, evt.day);
    console.log(this.selectedDate.toISOString());
  }



  guardarEstilista(): any {

    const estilista: Estilistas = {
      id: 0,
      nombre: this.registroEstilista.value.nombre,
      apellidos: this.registroEstilista.value.apellidos,
      tipoIdentificacion: this.registroEstilista.value.tipoIdentificacion,
      identificacion: this.registroEstilista.value.identificacion,
      provincia: this.registroEstilista.value.provincia,
      direccion: this.registroEstilista.value.direccion,
      sexo: this.registroEstilista.value.sexo,
      celular: this.registroEstilista.value.celular,
      fechaNacimiento: this.selectedDate,
      email: this.registroEstilista.value.email,
      usuarioId: 1

    }


    this.loading = true;

    this.estilistaService.guardarEstilista(estilista).subscribe(data => {
      this.loading = false;
      this.registroEstilista.reset();
      this.toast.success('Se ha guardado el Estilista ' + estilista.nombre, 'Registro Exitoso!')



    }, error => {

      this.toast.error(error.error, 'Error!');
      console.log(error);

    })

  }

}
