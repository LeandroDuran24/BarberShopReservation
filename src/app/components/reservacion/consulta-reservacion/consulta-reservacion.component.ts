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
  dtOptions: DataTables.Settings = {};
  closeResult = '';
  reservaId: number = 0;

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
      console.log(data);
    }, error => {

      this.toastr.error(error.error, "Error!");
    })

  }

  eliminarReservacion(reserva: Reservacion, content: any): void {

    //this.reservaId = reserva.id;

    this.open(content);
  }


  confirmarEliminacion(): void {

    /*
        this.reservacionServicio.eliminarCliente(this.idCliente).subscribe(data => {
          this.toast.info('El cliente ' + this.nombreCliente + ' fue eliminado', 'Eliminar Cliente!');
          this.modalService.dismissAll();
          this.getListClientes();
    
        }, error => {
          console.log(error.error);
          this.toast.error(error.error, 'Error!');
        })*/
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
