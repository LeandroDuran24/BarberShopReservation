import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EstilistaService } from 'src/app/services/estilista.service';
import { Estilistas } from 'src/models/estilista';

@Component({
  selector: 'app-consulta-estilista',
  templateUrl: './consulta-estilista.component.html',
  styleUrls: ['./consulta-estilista.component.css']
})
export class ConsultaEstilistaComponent {

  dtOptions: DataTables.Settings = {};
  listEstilista: any = {};
  closeResult = '';
  idEstilista: number = 0;
  nombreEstilista = '';


  constructor(private modalService: NgbModal, private renderer: Renderer2, private router: Router, private estilistaServicio: EstilistaService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      responsive: true
    };

    this.getListEstilistas();
  }

  getListEstilistas(): void {

    this.estilistaServicio.getEstilistas().subscribe(data => {
      this.listEstilista = data;

    }, error => {
      this.toast.error(error.error, 'Error!');
    })


  }


  eliminarEstilista(estilista: Estilistas, content: any): void {


    this.nombreEstilista = estilista.nombre;
    this.idEstilista = estilista.id;

    this.open(content);
  }

  confirmarEliminacion(): void {


    this.estilistaServicio.eliminarEstilista(this.idEstilista).subscribe(data => {
      this.toast.info('El estilista ' + this.nombreEstilista + ' fue eliminado', 'Eliminar Estilista!');
      this.modalService.dismissAll();
      this.getListEstilistas();

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
