import { Component, OnInit, Renderer2 } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ReservacionService } from 'src/app/services/reservacion.service';
import { Reservacion } from 'src/models/reservacion';

@Component({
  selector: 'app-consulta-reservacion',
  templateUrl: './consulta-reservacion.component.html',
  styleUrls: ['./consulta-reservacion.component.css']
})
export class ConsultaReservacionComponent implements OnInit {


  listReservacion: any = {};
  listReservacionServicios: any[] = [];
  dtOptions: DataTables.Settings = {};
  closeResult = '';
  idReserva: any;
  nombreCliente = '';
  fechaReserva = '';

  constructor(private reservacionServicio: ReservacionService, private toastr: ToastrService, private renderer: Renderer2, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      responsive: true
    };

    this.getListResevaciones();


  }




  getListResevaciones(): void {

    this.reservacionServicio.getReservaciones().subscribe(data => {

      this.listReservacion = data;

    }, error => {

      this.toastr.error(error.error, "Error!");
    })


  }


  getServiciosReserva(id: number): void {

    this.reservacionServicio.getReservacionesServicios(id).subscribe((data: any[]) => {
      this.listReservacionServicios = data;
    }, error => {
      this.toastr.error(error.error, "Error!");
    })
  }



  eliminarReservacion(reserva: any, content: any): void {

    this.idReserva = reserva.id;
    this.nombreCliente = reserva.cliente.nombre + reserva.cliente.apellidos
    this.fechaReserva = reserva.fecha
    this.open(content);
  }


  confirmarEliminacion(): void {


    this.reservacionServicio.eliminarReservacion(this.idReserva).subscribe(data => {
      this.toastr.info('La Reservacion fue eliminada', 'Eliminar Reservacion!');
      this.modalService.dismissAll();
      this.getListResevaciones();

    }, error => {
      this.toastr.error(error.error, 'Error!');
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
