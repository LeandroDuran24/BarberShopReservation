import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicioService } from 'src/app/services/servicio.service';
import { Servicios } from 'src/models/servicio';

@Component({
  selector: 'app-registro-servicio',
  templateUrl: './registro-servicio.component.html',
  styleUrls: ['./registro-servicio.component.css']
})
export class RegistroServicioComponent {

  registroServicio: FormGroup;

  loading = false;


  constructor(private router: Router, private fb: FormBuilder, private toast: ToastrService, private servicioService: ServicioService) {

    this.registroServicio = fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      precio: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
      duracion: ['']
    })
  }

  reset(): any {

    this.registroServicio.reset();
  }





  guardarServicio(): any {

    const servicio: Servicios = {
      id: 0,
      nombre: this.registroServicio.value.nombre,
      precio: this.registroServicio.value.precio,
      duracion: this.registroServicio.value.duracion,
      fechaNacimiento: new Date,
      usuarioId: 1

    }


    this.loading = true;

    this.servicioService.guardarServicio(servicio).subscribe(data => {
      this.loading = false;
      this.registroServicio.reset();
      this.toast.success('Se ha guardado el Servicio ' + servicio.nombre, 'Registro Exitoso!')



    }, error => {

      this.toast.error(error.error, 'Error!');
      console.log(error);

    })

  }


}
