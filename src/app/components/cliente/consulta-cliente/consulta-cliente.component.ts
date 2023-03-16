import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Clientes } from 'src/models/cliente';
import { ModalDismissReasons, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})
export class ConsultaClienteComponent {

  dtOptions: DataTables.Settings = {};
  listCliente: any = {};
  closeResult = '';
  idCliente: number = 0;
  nombreCliente = '';


  constructor(private modalService: NgbModal, private renderer: Renderer2, private router: Router, private clienteServicio: ClienteService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      responsive: true
    };

    this.getListClientes();
  }

  getListClientes(): void {

    this.clienteServicio.getClientes().subscribe(data => {
      this.listCliente = data;

    }, error => {
      this.toast.error(error.error, 'Error!');
    })


  }


  eliminarCliente(cliente: Clientes, content: any): void {

    console.log(cliente)
    this.nombreCliente = cliente.nombre;
    this.idCliente = cliente.id;

    this.open(content);
  }

  confirmarEliminacion(): void {


    this.clienteServicio.eliminarCliente(this.idCliente).subscribe(data => {
      this.toast.info('El cliente ' + this.nombreCliente + ' fue eliminado', 'Eliminar Cliente!');
      this.modalService.dismissAll();
      this.getListClientes();

    }, error => {
      console.log(error.error);
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
