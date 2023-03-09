import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {

  registrarUsuario: FormGroup;
  loading = false;


  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private usuarioService: UsuarioService) {

    this.registrarUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      nombreUsuario: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(4)]],
      confirmar: ['', Validators.required]


    },{ validator: this.checkPassword })
  }

  reset(): void {
    this.registrarUsuario.reset();
  }

  /*Validar las contraseña */
  checkPassword(group: FormGroup): any {
    const pass = group.controls['password'].value;
    const confirm = group.controls['confirmar'].value;
    return pass === confirm ? null : { notSame: true }
  }

  /*Save Usuario */
  guardarUsuario(): void {

    const usuario: Usuario = {
      nombre: this.registrarUsuario.value.nombre,
      apellidos: this.registrarUsuario.value.apellidos,
      nombreUsuario: this.registrarUsuario.value.nombreUsuario,
      password: this.registrarUsuario.value.password

    }

    this.loading=true;
    this.usuarioService.guardarUsuario(usuario).subscribe(data => {

      this.reset();
      this.loading=false;
      this.toastr.success('Se ha guardado el Usuario '+usuario.nombreUsuario,'Registro Exitoso!')

    },error => {
      this.toastr.error(error.error, 'Error!');
      this.loading=false;
    })

  }
}

