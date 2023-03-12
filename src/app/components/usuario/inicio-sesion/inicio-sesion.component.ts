import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/models/usuario';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  login: FormGroup; //para las validaciones de los campos
  loading = false;


  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private toast: ToastrService) {
    this.login = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  iniciarSesion(): void {

    const usuario: Usuario = {
      id: 0,
      nombre: '',
      apellidos: '',
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password
    }

    this.loading = true;
    this.loginService.login(usuario).subscribe(data => {
      this.loading = false;
      this.login.reset();
      this.router.navigate(['/inicio']);

    }, error => {
      this.loading = false;
      this.toast.error(error.error, 'Error!');
      this.login.reset();

    })

  }

}
