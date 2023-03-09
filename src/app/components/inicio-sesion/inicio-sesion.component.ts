import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Usuario } from 'src/models/usuario';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  login: FormGroup; //para las validaciones de los campos
  loading = false;


  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.login = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  iniciarSesion(): void {

    const usuario: Usuario = {
      nombre: '',
      apellidos: '',
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password
    }

    this.router.navigate(['/inicio']);

  }

}
