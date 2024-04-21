import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { REST_SERVER_URL } from 'src/util/configuration';
import { Evento, EventoBuscarFecha, EventoCatering, EventoExtra, EventoHora, EventoJSON, EventoPago, EventoVer } from '../model/Evento';
import { FechaForm } from '../model/FechaForm';
import { GenericItem } from '../model/GenericItem';
import { Cliente, Usuario, UsuarioJSON } from '../model/Usuario';
import { AgendaService } from './agenda.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  eventoId : number = 0
  eventoCodigo : string = ""
  fechaFiltroForAbmEvento : string = ""
  cantidadEventos : number = 0

  constructor(private httpClient : HttpClient, private agendaService : AgendaService, private loginService : LoginService) { }

  async getAllEventoByEmpresaId(pageNumber : number){
    const listaItem$ = this.httpClient.get<EventoJSON[]>(REST_SERVER_URL + '/getAllEventoByEmpresaId/' + this.agendaService.getEmpresaId() + '/' + pageNumber)
    const listaItem = await lastValueFrom(listaItem$)
    return listaItem.map((evento) => Evento.fromJson(evento))

  }

  async cantEventos(){
    const cant$ = this.httpClient.get<number>(REST_SERVER_URL + '/cantEventos/' + this.agendaService.getEmpresaId())
    this.cantidadEventos = await lastValueFrom(cant$)
    return this.cantidadEventos
  }
  async getAllEventoByEmpresaIdAndFechaFiltro(){
    const listaItem$ = this.httpClient.put<EventoJSON[]>(REST_SERVER_URL + '/getAllEventoByEmpresaIdAndFechaFiltro/' + this.agendaService.getEmpresaId(), new Date(this.fechaFiltroForAbmEvento))
    const listaItem = await lastValueFrom(listaItem$)
    this.fechaFiltroForAbmEvento = ""
    return listaItem.map((evento) => Evento.fromJson(evento))
  }

  async buscarClientePorEmail(email : string){
    const usuario$ = this.httpClient.put<Cliente>(REST_SERVER_URL + '/getUsuarioByEmail', email)
    return await lastValueFrom(usuario$)
  }

  async buscarClientePorCelular(celular : number){
    const usuario$ = this.httpClient.put<Cliente>(REST_SERVER_URL + '/getUsuarioByCelular', celular)
    return await lastValueFrom(usuario$)
  }

  async save(evento: Evento) {
    evento.empresaId = this.agendaService.getEmpresaId()
    evento.encargadoId = await this.loginService.getUsuarioId()
    const item$ = this.httpClient.post<Evento>(REST_SERVER_URL + '/saveEvento', evento)
    return await lastValueFrom(item$)
  }

  delete(id: number) {
    return this.httpClient.delete<GenericItem>(REST_SERVER_URL + '/deleteEvento/' + id)
  }

  async getAllEstado() {
    const listaItem$ = this.httpClient.get<string[]>(REST_SERVER_URL + '/getAllEstado')
    return await lastValueFrom(listaItem$)
  }
  
  async getAllEstadoForSaveEvento() {
    const listaItem$ = this.httpClient.get<string[]>(REST_SERVER_URL + '/getAllEstadoForSaveEvento')
    return await lastValueFrom(listaItem$)
  }

  async getEventoPago() {
    const evento$ = this.httpClient.get<EventoPago>(REST_SERVER_URL + '/getEventoPago/' + this.eventoId)
    return await lastValueFrom(evento$)
  }

  async getEventoExtra() {
    const evento$ = this.httpClient.get<EventoExtra>(REST_SERVER_URL + '/getEventoExtra/' + this.eventoId)
    return await lastValueFrom(evento$)
  }

  async getEventoCatering() {
    const evento$ = this.httpClient.get<EventoCatering>(REST_SERVER_URL + '/getEventoCatering/' + this.eventoId)
    return await lastValueFrom(evento$)
  }

  async getEventoHora() {
    const evento$ = this.httpClient.get<EventoHora>(REST_SERVER_URL + '/getEventoHora/' + this.eventoId)
    return await lastValueFrom(evento$)
  }

  async getEventoVer() {
    const evento$ = this.httpClient.get<EventoVer>(REST_SERVER_URL + '/getEventoVer/' + this.eventoId)
    return await lastValueFrom(evento$)
  }

  async getPresupuesto(evento: EventoVer) {
    const presupuesto$ = this.httpClient.get<number>(REST_SERVER_URL + '/getPresupuesto/' + this.eventoId)
    return await lastValueFrom(presupuesto$)
  }

  async editEventoHora(evento : EventoHora) {
    const item$ = this.httpClient.post<EventoHora>(REST_SERVER_URL + '/editEventoHora', evento)
    return await lastValueFrom(item$)
  }

  async editEventoExtra(evento : EventoExtra) {
    const item$ = this.httpClient.post<EventoExtra>(REST_SERVER_URL + '/editEventoExtra', evento)
    return await lastValueFrom(item$)
  }

  async editEventoCatering(evento : EventoCatering) {
    const item$ = this.httpClient.post<EventoCatering>(REST_SERVER_URL + '/editEventoCatering', evento)
    return await lastValueFrom(item$)
  }

  async editEventoAnotaciones(anotacion : string, id : number) {
    const item$ = this.httpClient.post<string>(REST_SERVER_URL + '/editEventoAnotaciones/' + id, anotacion)
    return await lastValueFrom(item$)
  }

  async editEventoCantNinos(eventoVer : EventoVer) {
    const item$ = this.httpClient.post<number>(REST_SERVER_URL + '/editEventoCantidadNinos', eventoVer)
    return await lastValueFrom(item$)
  }

  async editEventoCantAdultos(eventoVer : EventoVer) {
    const item$ = this.httpClient.post<number>(REST_SERVER_URL + '/editEventoCantidadAdultos', eventoVer)
    return await lastValueFrom(item$)
  }

  async editEventoNombre(nombre: string, id: number) {
    const item$ = this.httpClient.post<string>(REST_SERVER_URL + '/editEventoNombre/' + id, nombre)
    return await lastValueFrom(item$)
  }

  async getListaEventoByDiaAndEmpresaId(fecha : FechaForm) {
    const eventoBuscarFecha = new EventoBuscarFecha(this.agendaService.getEmpresaId(), new Date(fecha.year, fecha.mes, fecha.dia), new Date())
    const item$ = this.httpClient.put<Array<string>>(REST_SERVER_URL + '/getListaEventoByDiaAndEmpresaId', eventoBuscarFecha)
    return await lastValueFrom(item$)
  }

  async getHorarioDisponible(evento : Evento){
    const eventoBuscarFecha = new EventoBuscarFecha(this.agendaService.getEmpresaId(), new Date(evento.inicio), new Date(evento.fin))
    const item$ = this.httpClient.put<boolean>(REST_SERVER_URL + '/horarioDisponible', eventoBuscarFecha)
    return await lastValueFrom(item$)
  }

  async reenviarMail(eventoId: number) {
    const item$ = this.httpClient.put<boolean>(REST_SERVER_URL + '/reenviarMail/' + eventoId, this.agendaService.getEmpresaId())
    return await lastValueFrom(item$)
  }

}
