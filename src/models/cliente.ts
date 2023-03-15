export class Clientes {

id:number;
nombre:string;
apellidos:string;
tipoIdentificacion:string;
identificacion:string;
sexo:string;
direccion:string;
provincia:string;
celular:string;
email:string;
fechaNacimiento:Date;
activo?:number;
usuarioId:number;

constructor() {
  this.id=0;
  this.nombre='';
  this.apellidos='';
  this.tipoIdentificacion='';
  this.identificacion='';
  this.direccion='';
  this.provincia='';
  this.celular='';
  this.fechaNacimiento=new Date();
  this.email='';
  this.sexo='';
  this.activo=0;
  this.usuarioId=0;
    
}


}