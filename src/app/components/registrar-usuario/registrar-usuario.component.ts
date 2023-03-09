import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/models/usuario';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {

  registrarUsuario: FormGroup;
  loading = false;
  /**
   *
   */
  constructor(private fb: FormBuilder, private router: Router) {

    this.registrarUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required]

    })
  }

  reset(): void {
    this.registrarUsuario.reset();
  }


  guardarUsuario(): void {


    const usuario: Usuario = {
      nombre: this.registrarUsuario.value.nombre,
      apellidos: this.registrarUsuario.value.apellidos,
      nombreUsuario: this.registrarUsuario.value.nombreUsuario,
      password: this.registrarUsuario.value.password

    }


    console.log(this.registrarUsuario)
  }


}

