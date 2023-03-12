export class Usuario {

    id: number;
    nombre: string;
    apellidos: string;
    nombreUsuario: string;
    password: string;
    fechaCreacion?: Date;
    activo?: number;

    constructor() {
        this.id = 0;
        this.nombre = '';
        this.apellidos = '';
        this.nombreUsuario = '';
        this.password = '';



    }
}