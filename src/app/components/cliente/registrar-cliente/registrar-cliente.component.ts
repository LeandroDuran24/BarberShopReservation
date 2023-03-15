import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { ToastrService } from 'ngx-toastr';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Clientes } from 'src/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  registroCliente: FormGroup;

  loading = false;
  selectedDate:Date=new Date();

  constructor(private router: Router, private fb: FormBuilder, private toast: ToastrService,private clienteService:ClienteService) {


    this.registroCliente = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', [Validators.required,Validators.pattern('[0-9 ]*')]],
      sexo:['',Validators.required],
      direccion: ['', Validators.required],
      provincia: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      celular: ['', [Validators.pattern('[0-9 ]*')]],
      fechaNacimiento: [''],
      email: ['', Validators.required]


    })
  }

  ngOnInit(): void {

  }

  reset():any{

    console.log(this.registroCliente)
  }

  onSelect(evt:any){
    this.selectedDate = new Date(evt.year,evt.month-1,evt.day);
    console.log(this.selectedDate.toISOString());
  }

  guardarCliente():any{

    const cliente :Clientes={
      id:0,
      nombre:this.registroCliente.value.nombre,
      apellidos:this.registroCliente.value.apellidos,
      tipoIdentificacion:this.registroCliente.value.tipoIdentificacion,
      identificacion:this.registroCliente.value.identificacion,
      provincia:this.registroCliente.value.provincia,
      direccion:this.registroCliente.value.direccion,
      sexo:this.registroCliente.value.sexo,
      celular:this.registroCliente.value.celular,
      fechaNacimiento:this.selectedDate,
      email:this.registroCliente.value.email,
      usuarioId:1
      
    }

console.log(cliente.fechaNacimiento);
    this.loading=true;

    this.clienteService.guardarCliente(cliente).subscribe(data=>{
      this.loading=false;
      this.registroCliente.reset();
      this.toast.success('Se ha guardado el Usuario ' + cliente.nombre, 'Registro Exitoso!')



    },error=>{

      this.toast.error(error.error,'Error!');
      console.log(error);

    })

  }

}
