import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  idUsuario: number = 0;
  nombre: string = '';
  apellidos: string = '';
  usuario: string = '';
  password: string = '';
  editarUsuario: FormGroup;
  loading = false;

  constructor(private activatedRouter: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private usuarioService: UsuarioService) {
    this.idUsuario = Number(this.activatedRouter.snapshot.paramMap.get('id'));


    this.editarUsuario = this.fb.group({
      nombre: [this.nombre, [Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.pattern('[a-zA-Z ]*')]],
      nombreUsuario: [''],
      password: ['', [Validators.minLength(4)]],
      confirmar: ['']


    }, { validator: this.checkPassword })
  }

  /*Validar las contraseña */
  checkPassword(group: FormGroup): any {
    const pass = group.controls['password'].value;
    const confirm = group.controls['confirmar'].value;
    return pass === confirm ? null : { notSame: true }
  }

  ngOnInit(): void {

    this.getUsuario();
  }


  getUsuario(): void {
    this.usuarioService.getUsuario(this.idUsuario).subscribe(data => {
      this.nombre = data.nombre;
      this.apellidos = data.apellidos;
      this.usuario = data.nombreUsuario;
      this.password = data.password;


    }, error => {

      this.toastr.error(error.error, 'Error!');
    })

  }


  reset(): any {
    this.editarUsuario.reset();
  }

  /*Save Usuario */
  guardarUsuario(): void {

    const usuario: Usuario = {
      id: this.idUsuario,
      nombre: this.editarUsuario.value.nombre,
      apellidos: this.editarUsuario.value.apellidos,
      nombreUsuario: this.editarUsuario.value.nombreUsuario,
      password: this.editarUsuario.value.password

    }

    this.loading = true;
    this.usuarioService.editarUsuario(usuario).subscribe(data => {

      this.reset();
      this.loading = false;
      this.toastr.success('Se ha editado el Usuario ' + usuario.nombreUsuario, 'Registro Exitoso!')

    }, error => {
      this.toastr.error(error.error, 'Error!');
      this.loading = false;
    })


  }
}
