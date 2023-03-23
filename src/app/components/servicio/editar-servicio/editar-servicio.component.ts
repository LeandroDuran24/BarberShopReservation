import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicioService } from 'src/app/services/servicio.service';
import { Servicios } from 'src/models/servicio';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {
  idServicio: number = 0;
  registroServicio: FormGroup;

  loading = false;

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private fb: FormBuilder, private toast: ToastrService, private servicioService: ServicioService) {

    this.idServicio = Number(this.activatedRouter.snapshot.paramMap.get('id'));

    this.registroServicio = fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      precio: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
      duracion: ['']
    })
  }
  ngOnInit(): void {
    this.getServicio();

  }


  reset(): any {

    this.registroServicio.reset();
  }


  getServicio(): void {
    this.servicioService.getServicio(this.idServicio).subscribe(data => {



      //seteo los valores iniciales
      this.registroServicio.setValue({
        nombre: data.nombre,
        precio: data.precio,
        duracion: data.duracion,
      });


    }, error => {

      this.toast.error(error.error, 'Error!');
    })

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
      this.toast.success('Se ha guardado el Servicio ' + servicio.nombre, 'Registro Exitoso!');
      this.router.navigate(['/servicio/consultaServicios']);




    }, error => {

      this.toast.error(error.error, 'Error!');
      console.log(error);

    })

  }


}
