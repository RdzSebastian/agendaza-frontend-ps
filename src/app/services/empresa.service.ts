import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { REST_SERVER_URL } from 'src/util/configuration';
import { Empresa } from '../model/Empresa';
import { GenericItem, GenericItemJSON } from '../model/GenericItem';
import { AgendaService } from './agenda.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empresaId = 0

  constructor(private httpClient: HttpClient, private agendaService : AgendaService, private loginService : LoginService) {}

  async getEmpresa(){
    const item$ = this.httpClient.get<GenericItem>(REST_SERVER_URL + '/getEmpresa/' + await this.agendaService.getEmpresaId())
    return await lastValueFrom(item$)
  }

  async getAllEmpresaByUsuarioId() {
    const listaItem$ = this.httpClient.get<GenericItemJSON[]>(REST_SERVER_URL + '/getAllEmpresaByUsuarioId/' + await this.loginService.getUsuarioId())
    const listaItem = await lastValueFrom(listaItem$)
    return listaItem.map((empresa) => GenericItem.fromJson(empresa))
  }

  async save(empresa : Empresa) {
    const item$ = this.httpClient.post<GenericItem>(REST_SERVER_URL + '/saveServicio', empresa)
    return await lastValueFrom(item$)
  }

  async delete(id : number) {
    return this.httpClient.delete<GenericItem>(REST_SERVER_URL + '/deleteServicio/' + id)
  }

}
