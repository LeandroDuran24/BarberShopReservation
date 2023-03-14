export class Clientes {

id:number;
nombre:string;
apellidos:string;
tipoIdentificacion:string;
identificacion:string;
direccion:string;
provincia:string;
celular:string;
fechaNacimiento:Date;
email:string;

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
    
}


}