import { ReservacionDetalle } from "./reservacionDetalle";
import { Servicios } from "./servicio";

export class Reservacion {
    id?: number;
    clienteId: number;
    estilistaId: number;
    fecha: Date;
    hora: string;
    tiempoEstimadoCita: string;

    listReservacionDetalle: ReservacionDetalle[];


    /**
     *
     */
    constructor() {
        this.id = 0;
        this.clienteId = 0;
        this.estilistaId = 0;
        this.fecha = new Date;
        this.hora = '';
        this.tiempoEstimadoCita = '';
        this.listReservacionDetalle = [];
    }
}