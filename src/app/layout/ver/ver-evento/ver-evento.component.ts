import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacidad } from 'src/app/model/Capacidad';
import { EventoVer } from 'src/app/model/Evento';
import { ExtraVariable } from 'src/app/model/ExtraVariable';
import { GenericItem } from 'src/app/model/GenericItem';
import { Time } from 'src/app/model/Time';
import { Cliente, UsuarioAbm} from 'src/app/model/Usuario';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EventoService } from 'src/app/services/evento.service';
import { ErrorMensaje, getErrorConMensaje } from 'src/util/errorHandler';

@Component({
  selector: 'app-edit-evento',
  templateUrl: './ver-evento.component.html',
})
export class VerEventoComponent implements OnInit {

  evento : EventoVer = new EventoVer(0,"", "","","", "",new Capacidad(0,0,0),0,
  0,[],[],"",[],[], new Cliente(0,"","","","",0),0, new UsuarioAbm(0,"",""),"","", "")

  inicio : Time = new Time("0","0")
  fin : Time = new Time("0","0")

  extras : boolean = false
  extrasVariables : boolean = false
  extraCatering : boolean = false
  tipoCatering : boolean = false

  eventoReenviarMail : boolean = false
  eventoErrorReenviarMail = new ErrorMensaje(false, '')
  errors = []

  modalEditar = false
  tituloModalEditar=""
  inputEditar! : any
  metodoAceptar! : Function

  modalListar = false
  tituloModalListar="Lista de extras"
  listaModal : Array<GenericItem> = []

  encargadoNombreCompleto : string = ""


  constructor(private eventoService : EventoService, private empresaService : EmpresaService, private router : Router) { }

  async ngOnInit() {
    this.evento = await this.eventoService.getEventoVer()

    this.evento.empresa = (await this.empresaService.getEmpresa()).nombre

    this.inicio.hour = this.evento.inicio.split(":")[0].split("T")[1]
    this.inicio.minute = this.evento.inicio.split(":")[1]

    this.fin.hour = this.evento.fin.split(":")[0].split("T")[1]
    this.fin.minute = this.evento.fin.split(":")[1]

    this.extras = this.evento.listaExtra.length > 0
    this.extrasVariables = this.evento.listaExtraVariable.length > 0
    this.extraCatering = this.evento.listaExtraCateringVariable.length > 0
    this.tipoCatering = this.evento.listaExtraTipoCatering.length > 0

    this.encargadoNombreCompleto = this.evento.encargado.apellido + ", " + this.evento.encargado.nombre
  }

  verCliente(){
    this.router.navigateByUrl("/verCliente")
  }

  editEventoNombreModal(){
    this.tituloModalEditar="Editar nombre del evento"
    this.inputEditar = this.evento.nombre
    this.metodoAceptar = this.editEventoNombre.bind(this)
    this.setModalEditar(!this.modalEditar)
  }

  async editEventoNombre(){
    this.evento.nombre = this.inputEditar
    await this.eventoService.editEventoNombre(this.inputEditar, this.evento.id)
  }

  editCantAdultosModal(){
    this.tituloModalEditar ="Editar cantidad de adultos"
    this.inputEditar = this.evento.capacidad.capacidadAdultos
    this.metodoAceptar = this.editCantAdultos.bind(this)
    this.setModalEditar(!this.modalEditar)
  }

  async editCantAdultos(){
    this.evento.capacidad.capacidadAdultos = this.inputEditar
    await this.eventoService.editEventoCantAdultos(this.evento)
    this.evento.presupuesto = await this.eventoService.getPresupuesto(this.evento)
  }

  editCantNinosModal(){
    this.tituloModalEditar="Editar cantidad de niños"
    this.inputEditar = this.evento.capacidad.capacidadNinos
    this.metodoAceptar = this.editNinos.bind(this)
    this.setModalEditar(!this.modalEditar)
  }

  async editNinos(){
    this.evento.capacidad.capacidadNinos = this.inputEditar
    await this.eventoService.editEventoCantNinos(this.evento)
    this.evento.presupuesto = await this.eventoService.getPresupuesto(this.evento)

  }

  editAnotacionesModal(){
    this.tituloModalEditar="Editar anotaciones"
    this.inputEditar = this.evento.anotaciones
    this.metodoAceptar = this.editAnotaciones.bind(this)
    this.setModalEditar(!this.modalEditar)
  }

  async editAnotaciones(){
    this.evento.anotaciones = this.inputEditar
    await this.eventoService.editEventoAnotaciones(this.inputEditar, this.evento.id)
  }

  setInputEditar(inputEditar : any){
    this.inputEditar = inputEditar
  }

  setListaModal(lista : Array<GenericItem>){
    this.listaModal = lista
    this.setModalListar(!this.modalListar)
  }

  setModalEditar(modal : boolean){
    this.modalEditar = modal
  }

  setModalListar(modal : boolean){
    this.modalListar = modal
  }

  listaExtraVariableToModal(lista : Array<ExtraVariable>){
    return lista.map((extraVariable: ExtraVariable) => new GenericItem(extraVariable.id, extraVariable.nombre))
  }

  volver(){
    this.router.navigateByUrl("/abmEvento")
  }

  descargarComprobante(){
    console.log("TODO")
  }

  async reenviarMail(){
    try{
      this.eventoReenviarMail = await this.eventoService.reenviarMail(this.evento.id)
      this.eventoErrorReenviarMail.condicional = false
    }catch(error: any){
      this.eventoErrorReenviarMail.condicional = true
      this.eventoReenviarMail = false
      this.eventoErrorReenviarMail.mensaje = getErrorConMensaje(error)
    }
  }

}

