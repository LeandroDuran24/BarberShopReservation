import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstilistaService } from 'src/app/services/estilista.service';
import { Estilistas } from 'src/models/estilista';

@Component({
  selector: 'app-editar-estilista',
  templateUrl: './editar-estilista.component.html',
  styleUrls: ['./editar-estilista.component.css']
})
export class EditarEstilistaComponent implements OnInit {

  idEstilista: number = 0;
  registroEstilista: FormGroup;
  selectedDate: Date = new Date();
  loading = false;

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private fb: FormBuilder, private toast: ToastrService, private estilistaService: EstilistaService) {

    this.idEstilista = Number(this.activatedRouter.snapshot.paramMap.get('id'));

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
  ngOnInit(): void {
    this.getEstilista();

  }


  reset(): any {

    this.registroEstilista.reset();
  }

  onSelect(evt: any) {
    this.selectedDate = new Date(evt.year, evt.month - 1, evt.day);
    console.log(this.selectedDate.toISOString());
  }



  getEstilista(): void {
    this.estilistaService.getEstilista(this.idEstilista).subscribe(data => {

      let fechaNac = new Date(data.fechaNacimiento);

      //seteo los valores iniciales
      this.registroEstilista.setValue({
        nombre: data.nombre,
        apellidos: data.apellidos,
        tipoIdentificacion: data.tipoIdentificacion,
        identificacion: data.identificacion,
        sexo: data.sexo,
        direccion: data.direccion,
        provincia: data.provincia,
        celular: data.celular,
        fechaNacimiento: { year: fechaNac.getFullYear(), month: fechaNac.getMonth() + 1, day: fechaNac.getDate() },
        email: data.email,

      });


    }, error => {

      this.toast.error(error.error, 'Error!');
    })

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

    this.estilistaService.editarEstilista(estilista).subscribe(data => {
      this.loading = false;
      this.registroEstilista.reset();
      this.toast.success('Se ha editado el Estilista ' + estilista.nombre, 'Registro Exitoso!')



    }, error => {

      this.toast.error(error.error, 'Error!');
      console.log(error);

    })

  }

}
