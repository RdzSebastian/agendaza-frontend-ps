import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Capacidad } from 'src/app/model/Capacidad';
import { DateUtil, Mes } from 'src/app/model/DateUtil';
import { Evento } from 'src/app/model/Evento';
import { Extra } from 'src/app/model/Extra';
import { ExtraVariable } from 'src/app/model/ExtraVariable';
import { FechaForm } from 'src/app/model/FechaForm';
import { GenericItem } from 'src/app/model/GenericItem';
import { Time } from 'src/app/model/Time';
import { TipoEvento } from 'src/app/model/TipoEvento';
import { Cliente } from 'src/app/model/Usuario';
import { AgendaService } from 'src/app/services/agenda.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EventoService } from 'src/app/services/evento.service';
import { ExtraService } from 'src/app/services/extra.service';
import { LoginService } from 'src/app/services/login.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { TipoEventoService } from 'src/app/services/tipo-evento.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ErrorMensaje, mostrarErrorConMensaje } from 'src/util/errorHandler';

@Component({
  selector: 'app-save-evento',
  templateUrl: './save-evento.component.html',
  styleUrls: ['./save-evento.component.css']
})
export class SaveEventoComponent implements OnInit {
  
  step : number = 1
  listaStepBox : Array<GenericItem> = [
    new GenericItem(1, "Tipo de evento"),
    new GenericItem(2, "Datos del evento"),
    new GenericItem(3, "Cotizacion"),
    new GenericItem(4, "Catering"),
    new GenericItem(5, "Datos de contacto")
  ]
  botonSiguienteFinalizado : string = "Siguiente"
  botonAtrasDisabled = true

  evento : Evento = Evento.getEventoVoid()

  // Tipo de evento
  listaDuracion : Array<string> = []
  listaTipoEvento : Array<TipoEvento> = []
  listaServicio : Array<GenericItem> = []
  duracionSeleccionada : string = "CORTO"

  // Datos del evento
  empresa : GenericItem = new GenericItem(0,"")
  listaDia : Array<number> = []
  listaMes : Array<Mes> = DateUtil.ListaMes
  currentYear = new Date().getFullYear()
  listaYear : Array<number> = [this.currentYear, this.currentYear + 1]
  fechaEvento : FechaForm = new FechaForm(this.currentYear,0,1)
  listaHora : Array<string> = DateUtil.ListaHora
  listaMinuto : Array<string> = DateUtil.ListaMinuto
  inicioTime : Time = new Time("00","00")
  finalTime : Time = new Time("00","00")
  hastaElOtroDiaCheckbox : boolean = false
  listaEvento : Array<string> = []
  horarioDisponible : boolean = true

  // -- Reemplazar por TipoEventoForm
  precioTipoEvento : number = 0
  duracionTipoEvento : Time = new Time("00","00")
  capacidadTipoEvento : Capacidad = new Capacidad(0,0,0)

  // Cotizacion
  listaExtra : Array<Extra> = []
  listaExtraVariable : Array<ExtraVariable> = []
  extraPresupuesto : number = 0
  extraCamarera : ExtraVariable = new ExtraVariable(0,"",0,0)
  extraNino : ExtraVariable = new ExtraVariable(0,"",0,0)
  presupuesto : number = 0

  // Catering
  listaExtraTipoCatering : Array<Extra> = []
  listaExtraCateringVariable : Array<ExtraVariable> = []
  agregarCatering : boolean = false
  cateringOtro : boolean = false
  extraTipoCateringPresupuesto : number = 0
  extraCateringPresupuesto : number = 0
  presupuestoCatering : number = 0

  // Datos del contacto
  listaEstadoEvento : Array<string> = []

  // Errors
  errors = []
  error : ErrorMensaje = new ErrorMensaje(false, '')
  usuarioCondicional : boolean = false
  eventoSaveError : ErrorMensaje = new ErrorMensaje(false, 'Error al crear el Evento, revise los campos cargados')

  // -------------------------- Inicializacion --------------------------------

  constructor(public tipoEventoService : TipoEventoService, public servicioSerice : ServicioService, 
    public empresaService : EmpresaService, public extraService : ExtraService, public usuarioService : UsuarioService,
    public eventoService : EventoService, public loginService : LoginService, public agendaService : AgendaService,
    public router : Router) { }

  async ngOnInit(): Promise<void> {
    // Tipo de evento
    this.listaDuracion = await this.tipoEventoService.getAllDuracion()
    this.empresa = await this.empresaService.getEmpresa()
    this.filterTipoEventoByDuracion()

    // Datos del evento
    this.listaDia = DateUtil.getAllDaysOfMonth(this.currentYear, 0)

    // Datos del contacto
    this.listaEstadoEvento = await this.eventoService.getAllEstadoForSaveEvento()
  }

  // ---------------------------------------------------------------------------

  // ------------------------ Datos del Evento ---------------------------------

  async filterTipoEventoByDuracion(){
    // Tipo de evento
    this.listaTipoEvento = await this.tipoEventoService.getAllTipoEventoByEmpresaIdAndDuracion(this.duracionSeleccionada)
    
    this.listaServicio =[]

    // Cotizacion
    this.listaExtra = []
    this.listaExtraVariable = []
    
    // Catering
    this.listaExtraTipoCatering = []
    this.listaExtraCateringVariable = []

    this.cleanEvento()
  }

  async inicializarByTipoEventoId(){

    // Datos del evento
    this.cleanEvento()
    this.duracionTipoEvento = await this.tipoEventoService.getDuracionByTipoEventoId(this.evento.tipoEventoId)
    this.capacidadTipoEvento = await this.tipoEventoService.getCapacidadByTipoEventoId(this.evento.tipoEventoId)
    
    // Cotizacion
    this.extraCamarera = await this.tipoEventoService.findExtraCamareraByTipoEventoId(this.evento.tipoEventoId)
    this.extraNino = await this.tipoEventoService.findExtraNinoByTipoEventoId(this.evento.tipoEventoId)

    this.changeTime()
    this.changeDate()

    // Tipo de evento
    this.listaServicio = await this.servicioSerice.getAllServicioByTipoEventoId(this.evento.tipoEventoId)

    this.setListasExtra()

    this.changeCapacidadAdultos()
    this.changeCapacidadNinos()
  }

  getAllDaysOfMonth(year : number, mes: number){
    this.listaDia = DateUtil.getAllDaysOfMonth(year, mes)
  }

  async changeDate(){
    this.precioTipoEvento = await this.tipoEventoService.getPrecioByTipoEventoIdAndFecha(this.evento.tipoEventoId, this.fechaEvento)
    this.setListasExtra()
    this.sumPresupuesto()
    this.buscarListaEventoByDiaAndEmpresaId()
  }

  async changeDay(){
    this.buscarListaEventoByDiaAndEmpresaId()
  }

  async buscarListaEventoByDiaAndEmpresaId(){
    this.setFechaInicioAndFin()
    this.horarioDisponible = await this.eventoService.getHorarioDisponible(this.evento)
    this.listaEvento = await this.eventoService.getListaEventoByDiaAndEmpresaId(this.fechaEvento)
  }

  async changeTime(){
    this.finalTime = await this.tipoEventoService.getTimeEndByTipoEventoIdAndTimeStart(this.evento.tipoEventoId, this.inicioTime)
    this.hastaElOtroDiaCheckbox = Number(this.finalTime.hour) < Number(this.inicioTime.hour)
    this.buscarListaEventoByDiaAndEmpresaId()
  }

  setFechaInicioAndFin(){
    this.evento.inicio =  new Date(this.fechaEvento.year, this.fechaEvento.mes, this.fechaEvento.dia, (Number(this.inicioTime.hour) - 3), Number(this.inicioTime.minute)).toISOString()
    var fechaFinal =  new Date(this.fechaEvento.year, this.fechaEvento.mes, this.fechaEvento.dia, (Number(this.finalTime.hour) - 3), Number(this.finalTime.minute))

    if(this.hastaElOtroDiaCheckbox){
      fechaFinal.setDate(fechaFinal.getDate() + 1)
    }

    this.evento.fin = fechaFinal.toISOString()
  }

  cleanEvento(){
    this.evento = new Evento(0,this.evento.nombre, "", this.evento.inicio, this.evento.fin, 
      this.evento.tipoEventoId, this.evento.capacidad, this.evento.empresaId,0,0,[],[],0,"",[],[], 
      this.evento.cliente,this.evento.encargadoId, "COTIZADO", "")
  }

  async changeCapacidadAdultos(){
    this.sumCateringPresupuesto()

    // Extra Camarera
    const capacidad = this.evento.capacidad.capacidadAdultos - this.capacidadTipoEvento.capacidadAdultos
    
    const extraCamareraInAgregados = this.evento.listaExtraVariable.find(i => i.id === this.extraCamarera.id)
    const extraCamareraInLista = this.listaExtraVariable.find(i => i.id === this.extraCamarera.id)

    // Por cada 10 adultos de mas se agrega una camarera
    if(capacidad >= 10){

      const cantidadCamareras = Math.trunc(capacidad / 10)
      
      // Si aun no esta en el array se agrega, sino nada mas se le setea la cantidad correcta
      if(extraCamareraInAgregados == null){
        extraCamareraInLista!!.cantidad = cantidadCamareras
        this.evento.listaExtraVariable.push(extraCamareraInLista!!)
      }else{
        const index = this.evento.listaExtraVariable.indexOf(extraCamareraInAgregados)
        this.evento.listaExtraVariable[index].cantidad = cantidadCamareras
      }
    }else{
      if(extraCamareraInAgregados != null){
        extraCamareraInAgregados.cantidad = 0
        _.pull(this.evento.listaExtraVariable, extraCamareraInAgregados)
      }
    }

  }

  async changeCapacidadNinos(){
    // Extra Ninos
    const capacidad = this.evento.capacidad.capacidadNinos - this.capacidadTipoEvento.capacidadNinos

    const extraNinoInAgregados = this.evento.listaExtraVariable.find(i => i.id === this.extraNino.id)
    const extraNinoInLista = this.listaExtraVariable.find(i => i.id === this.extraNino.id)

    // Por cada nino de mas se agrega un extra nino
    if(capacidad >= 1){

      // Si aun no esta en el array se agrega, sino nada mas se le setea la cantidad correcta
      if(extraNinoInAgregados == null){
        extraNinoInLista!!.cantidad = capacidad
        this.evento.listaExtraVariable.push(extraNinoInLista!!)
      }else{
        const index = this.evento.listaExtraVariable.indexOf(extraNinoInAgregados)
        this.evento.listaExtraVariable[index].cantidad = capacidad
      }
    }else{
      if(extraNinoInAgregados != null){
        extraNinoInAgregados!!.cantidad = 0
        _.pull(this.evento.listaExtraVariable, extraNinoInAgregados)
      }
    }
  }

  // -------------------------------------------------------------------------
  
  // --------------------------- Cotizacion ----------------------------------

  async setListasExtra(){

    // Cotizacion
    this.listaExtra = await this.extraService.getAllExtraEventoByTipoEventoIdAndFecha(this.evento.tipoEventoId, this.fechaEvento)
    this.listaExtraVariable = await this.extraService.getAllExtraEventoVariableByTipoEventoIdAndFecha(this.evento.tipoEventoId, this.fechaEvento)

    // Catering
    this.listaExtraTipoCatering = await this.extraService.getAllTipoCateringByTipoEventoIdAndFecha(this.evento.tipoEventoId, this.fechaEvento)
    this.listaExtraCateringVariable = await this.extraService.getAllCateringExtraByTipoEventoIdAndFecha(this.evento.tipoEventoId, this.fechaEvento)
  }

  sumExtraPresupuesto(extraPrecio : number){
    this.extraPresupuesto += extraPrecio
    this.sumPresupuesto()
  }

  sumPresupuesto(){
    this.presupuesto = this.precioTipoEvento + this.extraPresupuesto + this.evento.extraOtro

    if(this.evento.descuento != 0){
      this.presupuesto -= this.presupuesto * (this.evento.descuento / 100)
    }
  }

  // ---------------------------------------------------------------------------

  // ----------------------------- Catering ---------------------------------

  sumExtraTipoCatering(extraPrecio : number){
    this.extraTipoCateringPresupuesto += extraPrecio * this.evento.capacidad.capacidadAdultos
    this.sumCateringPresupuesto()
  }

  cleanTipoCateringForCateringOtro(){
    if(this.cateringOtro){
      this.evento.listaExtraTipoCatering.splice(0)
      this.extraTipoCateringPresupuesto = 0
      this.sumExtraTipoCatering(0)
    }
  }

  cleanExtraOtroCheckbox(){
    this.cateringOtro = false
    this.evento.cateringOtro = 0
    this.evento.cateringOtroDescripcion = ""
    this.sumCateringPresupuesto()
  }

  sumExtraCatering(extraPrecio : number){
    this.extraCateringPresupuesto += extraPrecio
    this.sumCateringPresupuesto()
  }

  sumCateringPresupuesto(){
    if(this.cateringOtro){
      this.presupuestoCatering = this.extraCateringPresupuesto + this.evento.cateringOtro * this.evento.capacidad.capacidadAdultos
    }else{
      this.presupuestoCatering = this.extraCateringPresupuesto + this.extraTipoCateringPresupuesto
    }
  }

  // ---------------------------------------------------------------------------

  // --------------------------- Datos de contacto -----------------------------

  async buscarClientePorEmail(){
    try {
      this.evento.cliente = await this.eventoService.buscarClientePorEmail(this.evento.cliente.email)
      this.usuarioEncontrado()
    } catch (error) {
      this.evento.cliente = new Cliente(0, "", "", "CLIENTE", this.evento.cliente.email, 0)
      this.usuarioNoEncontrado(error)
    }
  }

  async buscarClientePorCelular(){
    try {
      this.evento.cliente = await this.eventoService.buscarClientePorCelular(this.evento.cliente.celular)
      this.usuarioEncontrado()
    } catch (error) {
      this.evento.cliente = new Cliente(0, "", "", "CLIENTE", "", this.evento.cliente.celular)
      this.usuarioNoEncontrado(error)

    }
  }

  usuarioEncontrado(){
    this.error.condicional = false
    this.usuarioCondicional = true
  }
  
  usuarioNoEncontrado(error : any){
    this.error.condicional = true
    this.usuarioCondicional = false

    mostrarErrorConMensaje(this, error)
    this.errors.forEach(error => { this.error.mensaje = error })
  }

  // --------------------------------------------------------------------------

  // --------------------------- Stepper functions ----------------------------

  isStep(step : number) : boolean{
    return this.step == step
  }

  get myIsStep() {
    return this.isStep.bind(this);
  }

  async siguiente(){

    this.botonAtrasDisabled= false

    if(this.step == 4 || this.step == 5){
      this.botonSiguienteFinalizado = "Finalizar"
    }else{
      this.botonSiguienteFinalizado = "Siguiente"
    }

    if(this.step == 5){
      this.eventoSaveError.condicional = false

      // Setea la fecha
      this.setFechaInicioAndFin()

      try{
        await this.eventoService.save(this.evento)
        this.router.navigateByUrl('/agenda')
      }catch(error){
        this.eventoSaveError.condicional = true
      }
    }

    if(this.step >= 1 && this.step < 5){
      this.step = this.step + 1
    }

  }
  
  atras(){
    this.botonSiguienteFinalizado = "Siguiente"
    this.eventoSaveError.condicional = false

    if(this.step > 1 && this.step <= 5){
      this.step = this.step - 1
    }

    if(this.step == 1){
      this.botonAtrasDisabled = true
    }
  }

  // ---------------------------------------------------------------------------

}
