import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { REST_SERVER_URL } from 'src/util/configuration';
import { CodigoEmpresaId, Pago, PagoEmpresaEncargado, PagoJSON } from '../model/Pago';
import { AgendaService } from './agenda.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  pagoId : number = 0
  pageNumber : number = 0
  cantidadPagos : number = 0


  constructor(private httpClient: HttpClient, private agendaService : AgendaService, private loginService : LoginService) {}

  async getAllPagoByEmpresaId(pageNumber : number) {
    const listaItem$ = this.httpClient.get<PagoJSON[]>(REST_SERVER_URL + '/getAllPagos/' + this.agendaService.getEmpresaId() + '/' + pageNumber)
    const listaItem = await lastValueFrom(listaItem$)
    return listaItem.map((pago) => Pago.fromJson(pago))
  }
  async getAllPagoByFilter(pageNumber : number, buscar : string) {
    const listaItem$ = this.httpClient.get<PagoJSON[]>(REST_SERVER_URL + '/getAllPagosFilter/' + this.agendaService.getEmpresaId() + '/' + pageNumber + '/' + buscar)
    const listaItem = await lastValueFrom(listaItem$)
    return listaItem.map((pago) => Pago.fromJson(pago))
  }
  async cantPagos(){
    const cant$ = this.httpClient.get<number>(REST_SERVER_URL + '/cantPagos/' + this.agendaService.getEmpresaId())
    this.cantidadPagos = await lastValueFrom(cant$)
    return this.cantidadPagos
  }
  async cantPagosFiltrados(buscar : string){
    const cant$ = this.httpClient.get<number>(REST_SERVER_URL + '/cantPagosFiltrados/' + this.agendaService.getEmpresaId() + '/' + buscar)
    this.cantidadPagos = await lastValueFrom(cant$)
    return this.cantidadPagos
  }

  async getAllMedioDePago() {
    const listaItem$ = this.httpClient.get<string[]>(REST_SERVER_URL + '/getAllMedioDePago')
    return await lastValueFrom(listaItem$)
  }

  async getEventoForPago(codigo: string) {
    const codigoEmpresaId = new CodigoEmpresaId(codigo, this.agendaService.getEmpresaId())
    const listaItem$ = this.httpClient.put<Pago>(REST_SERVER_URL + '/getEventoForPago', codigoEmpresaId)
    return await lastValueFrom(listaItem$)
  }

  async save(pago : Pago) {
    const item$ = this.httpClient.post<Pago>(REST_SERVER_URL + '/savePago', new PagoEmpresaEncargado(pago, this.agendaService.getEmpresaId(), await this.loginService.getUsuarioId()))
    return await lastValueFrom(item$)
  }

  async delete(id : number) {
    return this.httpClient.delete<Pago>(REST_SERVER_URL + '/deletePago/' + id)
  }

}
