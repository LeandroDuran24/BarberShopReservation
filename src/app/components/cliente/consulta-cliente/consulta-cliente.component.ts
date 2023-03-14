import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
   

  }

  getListClientes(): void {

   

  }


}
