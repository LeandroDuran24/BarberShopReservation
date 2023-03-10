export class Usuario {

    nombre: string;
    apellidos: string;
    nombreUsuario: string;
    password: string;
    fechaCreacion?:Date;

    constructor() {
        this.nombre = '';
        this.apellidos = '';
        this.nombreUsuario = '';
        this.password = '';
        

    }
}