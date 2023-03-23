import { Time } from "@angular/common";
import { timers } from "jquery";
import { timestamp } from "rxjs";

export class Servicios {

    id: number;
    nombre: string;
    precio: number;
    duracion?: Time;
    fechaNacimiento: Date;
    activo?: number;
    usuarioId: number;



    constructor() {
        this.id = 0;
        this.nombre = '';
        this.precio = 0;
        this.fechaNacimiento = new Date();
        this.activo = 0;
        this.usuarioId = 0;
    }


}