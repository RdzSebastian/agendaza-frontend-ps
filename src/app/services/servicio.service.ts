import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { REST_SERVER_URL } from 'src/util/configuration';
import { GenericItem, GenericItemEmpresaTipoEvento, GenericItemEmpresaTipoEventoJSON, GenericItemJSON } from '../model/GenericItem';
import { AgendaService } from './agenda.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  servicioId : number = 0

  constructor(private httpClient: HttpClient, private agendaService : AgendaService) {}

  async getServicio(id : number) {
    const item$ = this.httpClient.get<GenericItemEmpresaTipoEventoJSON>(REST_SERVER_URL + '/getServicio/' + id)
    const item = await lastValueFrom(item$)
    return GenericItemEmpresaTipoEvento.fromJson(item)
  }

  async getAllServicioByEmpresaId() {
    const listaItem$ = this.httpClient.get<GenericItemJSON[]>(REST_SERVER_URL + '/getAllServicioByEmpresaId/' + this.agendaService.getEmpresaId())
    const listaItem = await lastValueFrom(listaItem$)
    return listaItem.map((servicio) => GenericItem.fromJson(servicio))
  }

  async getAllServicioByTipoEventoId(tipoEventoId: number) {
    const listaItem$ = this.httpClient.get<GenericItemJSON[]>(REST_SERVER_URL + '/getAllServicioByTipoEventoId/' + tipoEventoId)
    const listaItem = await lastValueFrom(listaItem$)
    return listaItem.map((servicio) => GenericItem.fromJson(servicio))
  }

  async save(genericItem : GenericItemEmpresaTipoEvento) {
    const genericItemEmpresaTipoEvento = new GenericItemEmpresaTipoEvento(genericItem.id, genericItem.nombre, this.agendaService.getEmpresaId(), genericItem.listaTipoEventoId)
    const item$ = this.httpClient.post<GenericItem>(REST_SERVER_URL + '/saveServicio', genericItemEmpresaTipoEvento)
    return await lastValueFrom(item$)
  }

  async delete(id : number) {
    return this.httpClient.delete<GenericItem>(REST_SERVER_URL + '/deleteServicio/' + id)
  }

}
