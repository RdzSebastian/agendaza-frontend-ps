import * as _ from 'lodash'

export type UsuarioLoginJSON = {
  username: string
  password: string
}

export class UsuarioLogin {
  constructor(public username: string, public password: string) {}
      
  static fromJson(usuarioLoginJSON: UsuarioLoginJSON): any {
     return new UsuarioLogin(usuarioLoginJSON.username, usuarioLoginJSON.password)
    }
}

export type UsuarioJSON = {
  id: number
  nombre: string
  apellido: string
	username: string
  password: string
  fechaNacimiento: Date
  sexo: string
  rol: string
  email: string
  habilitado: boolean
}

export class Usuario {

  constructor(public id: number, public nombre: string, public apellido: string, public username: string,
    public password :string, public fechaNacimiento : Date, public sexo : string, public rol : string,
    public email : string, public habilitado : boolean) {}

  static fromJson(usuarioJson : UsuarioJSON) : Usuario{ 
    return  Object.assign(new Usuario(usuarioJson.id, usuarioJson.nombre, usuarioJson.apellido, 
      usuarioJson.username, usuarioJson.password, usuarioJson.fechaNacimiento, usuarioJson.sexo,
      usuarioJson.rol, usuarioJson.email, usuarioJson.habilitado))
  }

  esValido(): boolean {
    return (this.nombre!=='' && this.apellido!=='' && this.username!=='')
  }

  // Se usa en el filtro de header
  contiene(palabra: string): boolean {
    return (this.nombre.toUpperCase() || '').includes(palabra.toUpperCase()) 
    || (this.apellido.toUpperCase() || '').includes(palabra.toUpperCase())
    || (this.username.toUpperCase() || '').includes(palabra.toUpperCase())
  }


  toJSON(): UsuarioJSON {
    return {
      id: this.id,
      nombre : this.nombre,
      apellido : this.apellido,
      username: this.username,
      password: this.password,
      fechaNacimiento: this.fechaNacimiento,
      rol: this.rol,
      sexo: this.sexo,
      email: this.email,
      habilitado: this.habilitado
    }
  }
}
  
export class UsuarioSave {

  constructor(public usuario: Usuario, public empresaId : number, public rol : string ) {}

}

export class UsuarioEditPassword {

  constructor(public id: number, public password: string){}

}

export type UsuarioEmpresaJSON = {
  usuarioId : number
  empresaId : number
}

export class UsuarioEmpresa{

  constructor(public usuarioId: number, public empresaId: number){}
  
  static fromJson(UsuarioEmpresaJSON: UsuarioEmpresaJSON): any {
      return new UsuarioEmpresa(UsuarioEmpresaJSON.usuarioId, UsuarioEmpresaJSON.empresaId)
     }
}

export class Cliente{

  constructor(public id: number, public nombre: string, public apellido: string, 
    public rol : string, public email : string, public celular : number) {}
}

export class UsuarioAbm{

  constructor(public id: number, public nombre: string, public apellido: string) {}
  
  public getNombreCompleto() : string{
    return this.apellido + ", " + this.nombre.toString()
  }
}