import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Clientes } from 'src/models/cliente';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  idCliente: number = 0;
  registroCliente: FormGroup;
  selectedDate: Date = new Date();
  loading = false;

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private fb: FormBuilder, private toast: ToastrService, private clienteService: ClienteService) {

    this.idCliente = Number(this.activatedRouter.snapshot.paramMap.get('id'));



    this.registroCliente = this.fb.group({
      nombre: ['', [Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.pattern('[a-zA-Z ]*')]],
      tipoIdentificacion: [''],
      identificacion: ['', [Validators.pattern('[0-9 ]*')]],
      sexo: [''],
      direccion: [''],
      provincia: ['', [Validators.pattern('[a-zA-Z ]*')]],
      celular: ['', [Validators.pattern('[0-9 ]*')]],
      fechaNacimiento: '',
      email: ['']


    })


  }



  ngOnInit(): void {
    this.getCliente();

  }

  onSelect(evt: any) {
    
    this.selectedDate = new Date(evt.year, evt.month - 1, evt.day);
    console.log(this.selectedDate.toISOString());
  }

  reset(): void {
    this.registroCliente.reset();
  }

  getCliente(): void {
    this.clienteService.getCliente(this.idCliente).subscribe(data => {

      let fechaNac = new Date(data.fechaNacimiento);
    
      //seteo los valores iniciales
      this.registroCliente.setValue({
        nombre: data.nombre,
        apellidos: data.apellidos,
        tipoIdentificacion: data.tipoIdentificacion,
        identificacion: data.identificacion,
        sexo: data.sexo,
        direccion: data.direccion,
        provincia: data.provincia,
        celular: data.celular,
        fechaNacimiento: {year: fechaNac.getFullYear(), month: fechaNac.getMonth() + 1, day: fechaNac.getDate()},
        email: data.email,

      });
      

    }, error => {

      this.toast.error(error.error, 'Error!');
    })

  }


  guardarCliente(): any {

    const cliente: Clientes = {
      id: this.idCliente,
      nombre: this.registroCliente.value.nombre,
      apellidos: this.registroCliente.value.apellidos,
      tipoIdentificacion: this.registroCliente.value.tipoIdentificacion,
      identificacion: this.registroCliente.value.identificacion,
      provincia: this.registroCliente.value.provincia,
      direccion: this.registroCliente.value.direccion,
      sexo: this.registroCliente.value.sexo,
      celular: this.registroCliente.value.celular,
      fechaNacimiento: this.selectedDate,
      email: this.registroCliente.value.email,
      usuarioId: 1

    }

    this.loading = true;

    this.clienteService.editarCliente(cliente).subscribe(data => {
      this.loading = false;
      this.registroCliente.reset();
      this.toast.success('Se ha editado el Cliente ' + cliente.nombre, 'Registro Exitoso!')



    }, error => {

      this.toast.error(error.error, 'Error!');

    })
  }


}
