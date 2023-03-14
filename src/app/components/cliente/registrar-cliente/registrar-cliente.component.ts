import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { ToastrService } from 'ngx-toastr';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  registroCliente: FormGroup;

  loading = false;

  constructor(private router: Router, private fb: FormBuilder, private toast: ToastrService) {


    this.registroCliente = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      tipoIdentificacion: ['', Validators.required],
      identificacion: ['', Validators.required],
      direccion: ['', Validators.required],
      provincia: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      celular: ['', [Validators.pattern('[0-9 ]*')]],
      fechaNacimiento: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]


    })
  }

  ngOnInit(): void {

  }

}
