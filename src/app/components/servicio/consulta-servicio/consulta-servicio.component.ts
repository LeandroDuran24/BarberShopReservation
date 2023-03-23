import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServicioService } from 'src/app/services/servicio.service';
import { Servicios } from 'src/models/servicio';

@Component({
  selector: 'app-consulta-servicio',
  templateUrl: './consulta-servicio.component.html',
  styleUrls: ['./consulta-servicio.component.css']
})
export class ConsultaServicioComponent {

  dtOptions: DataTables.Settings = {};
  listServicio: any = {};
  closeResult = '';
  idServicio: number = 0;
  nombreServicio = '';

  constructor(private modalService: NgbModal, private renderer: Renderer2, private router: Router, private servicioServicio: ServicioService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      responsive: true
    };

    this.getListServicios();
  }

  getListServicios(): void {

    this.servicioServicio.getServicios().subscribe(data => {
      this.listServicio = data;

    }, error => {
      console.log(error.error);
      this.toast.error(error.error, 'Error!');
    })


  }


  eliminarServicio(servicio: Servicios, content: any): void {


    this.nombreServicio = servicio.nombre;
    this.idServicio = servicio.id;

    this.open(content);
  }

  confirmarEliminacion(): void {


    this.servicioServicio.eliminarServicio(this.idServicio).subscribe(data => {
      this.toast.info('El servicio ' + this.nombreServicio + ' fue eliminado', 'Eliminar Servicio!');
      this.modalService.dismissAll();
      this.getListServicios();

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
