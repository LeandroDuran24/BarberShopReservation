export class Servicios {

    id: number;
    nombre: string;
    precio: number;
    duracion: Date;
    fechaNacimiento: Date;
    activo?: number;
    usuarioId: number;



    constructor() {
        this.id = 0;
        this.nombre = '';
        this.precio = 0;
        this.duracion = new Date();
        this.fechaNacimiento = new Date();
        this.activo = 0;
        this.usuarioId = 0;
    }


}