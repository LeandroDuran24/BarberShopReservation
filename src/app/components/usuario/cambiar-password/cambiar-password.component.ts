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
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmar: ['', Validators.required]


    }, { validator: this.checkPassword })
  }

  reset(): void {
    this.cambioPassword.reset();
  }

  /*Validar las contraseña */
  checkPassword(group: FormGroup): any {
    const pass = group.controls['nuevaPassword'].value;
    const confirm = group.controls['confirmar'].value;
    return pass === confirm ? null : { notSame: true }
  }

  /*Save Usuario */
  cambiarPassword(): void {

    var usuarioActual: any;
    usuarioActual = this.usuarioService.getNombreUsuario();

    const changePassword: any = {
      passwordAnterior: this.cambioPassword.value.passwordAnterior,
      nuevaPassword: this.cambioPassword.value.nuevaPassword

    }

    this.loading = true;
    this.usuarioService.cambiarPassword(changePassword).subscribe(data => {

      this.reset();
      this.loading = false;
      this.toastr.success('Se ha actualizado la contraseña', 'Registro Exitoso!');

      this.router.navigate(['/inicio']);

    }, error => {
      console.log(error);
      this.toastr.error(error.error, 'Error!');
      this.loading = false;
    })






  }


}
