export class User {
  //id: number;
  nombre: string;
  password: string
  email: string
  rol: string
  //id_equipo: number;

  constructor(name: string, password: string, email: string, rol: string) {
    //this.id = id;
    this.nombre = name;
    this.password = password;
    this.email = email;
    this.rol = rol;
    //this.id_equipo = id_equipo;
  }
  imprimir(){
    console.log('nombre: ' + this.nombre);
    console.log('contrasena: ' + this.password);
    console.log('email: ' + this.email);
    console.log('rol: ' + this.rol);
  }
}
