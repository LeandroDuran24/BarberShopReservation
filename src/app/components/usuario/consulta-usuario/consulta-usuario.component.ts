import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario';

@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.css']
})
export class ConsultaUsuarioComponent implements OnInit  {

  dtOptions: DataTables.Settings = {};


  listUsuario: any = {};

  constructor(private renderer: Renderer2, private router: Router, private usuarioServicio: UsuarioService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    lengthMenu : [5, 10, 25],
      processing: true
    };
    this.getListUsuarios();

  }




  getListUsuarios(): void {

    this.usuarioServicio.getListUsuarios().subscribe(data => {
      this.listUsuario = data;

    }, error => {
      this.toast.error(error.error, 'Error!');
    })

  }



}
