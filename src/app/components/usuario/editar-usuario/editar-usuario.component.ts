import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(private activatedRouter: ActivatedRoute, private fb: FormBuilder, private toastr: ToastrService, private usuarioService: UsuarioService) {
    this.idUsuario = Number(this.activatedRouter.snapshot.paramMap.get('id'));


    this.editarUsuario = this.fb.group({
      nombre: [this.nombre, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      nombreUsuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmar: ['', Validators.required]


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
      this.editarUsuario.value.nombre = data.nombre;
      this.nombre = data.nombre;
      this.apellidos = data.apellidos;
      this.usuario = data.nombreUsuario;
      this.password = data.password;


    }, error => {

      console.log(error);
      this.toastr.error(error.error, 'Error!');
    })

  }
}
