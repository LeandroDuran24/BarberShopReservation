import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/models/usuario';

@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.css']
})
export class ConsultaUsuarioComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  listUsuario: any = {};
  closeResult = '';
  idUsuario: number = 0;
  nombreUsuario = '';


  constructor(private modalService: NgbModal, private renderer: Renderer2, private router: Router, private usuarioServicio: UsuarioService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      responsive: true
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

  eliminarUsuario(usuario: Usuario, content: any): void {

    this.nombreUsuario = usuario.nombreUsuario;
    this.idUsuario = usuario.id;

    this.open(content);
  }

  confirmarEliminacion(): void {


    this.usuarioServicio.eliminarUsuario(this.idUsuario).subscribe(data => {
      this.toast.info('El usuario ' + this.nombreUsuario + ' fue eliminado', 'Eliminar Usuario!');
      this.modalService.dismissAll();
      this.getListUsuarios();

    }, error => {
      this.toast.error(error.error, 'Error!');
    })
  }





  //MODAL

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}
