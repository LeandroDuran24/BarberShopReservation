import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Clientes } from 'src/models/cliente';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  idCliente: number = 0;
  nombre: string = '';
  apellidos: string = '';
  tipoIdentificacion: string = '';
  identificacion: string = '';
  direccion: string = '';
  provincia: string = '';
  sexo: string = '';
  celular: string = '';
  email: string = '';
  fechaNacimiento: Date = new Date();
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
      fechaNacimiento: [''],
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

      this.nombre = data.nombre;
      this.apellidos = data.apellidos;
      this.tipoIdentificacion = data.tipoIdentificacion;
      this.identificacion = data.identificacion;
      this.sexo = data.sexo;
      this.direccion = data.direccion;
      this.provincia = data.provincia;
      this.celular = data.celular;
      this.email = data.email;
      this.fechaNacimiento = data.fechaNacimiento;


      //seteo los valores iniciales
      this.registroCliente.setValue({
        nombre: this.nombre,
        apellidos: this.apellidos,
        tipoIdentificacion: this.tipoIdentificacion,
        identificacion: this.identificacion,
        sexo: this.sexo,
        direccion: this.direccion,
        provincia: this.provincia,
        celular: this.celular,
        fechaNacimiento: this.fechaNacimiento,
        email: this.email,

      })


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
      console.log(error);

    })
  }


}
