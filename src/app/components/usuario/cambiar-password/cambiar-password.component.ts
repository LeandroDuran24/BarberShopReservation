import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent {
  cambioPassword: FormGroup;
  loading = false;


  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private usuarioService: UsuarioService) {

    this.cambioPassword = this.fb.group({
      passwordVieja: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmar: ['', Validators.required]


    }, { validator: this.checkPassword })
  }

  reset(): void {
    this.cambioPassword.reset();
  }

  /*Validar las contraseña */
  checkPassword(group: FormGroup): any {
    const pass = group.controls['password'].value;
    const confirm = group.controls['confirmar'].value;
    return pass === confirm ? null : { notSame: true }
  }

  /*Save Usuario */
  cambiarPassword(): void {

    var usuarioActual: any;
    usuarioActual = this.usuarioService.getNombreUsuario();

    const usuario: Usuario = {
      id: 0,
      nombre: '',
      apellidos: '',
      nombreUsuario: '',
      password: this.cambioPassword.value.password

    }


    if (usuarioActual.password != usuario.password) {
      this.toastr.error('Contraseña actual incorrecta', 'Contraseña incorrecta!');
    }
    else {


      this.loading = true;
      this.usuarioService.cambiarPassword(usuario).subscribe(data => {

        this.reset();
        this.loading = false;
        this.toastr.success('Se ha cambiado la contraseña', 'Registro Exitoso!');

        this.router.navigate(['/inicio']);

      }, error => {
        this.toastr.error(error.error, 'Error!');
        this.loading = false;
      })

    }




  }


}
