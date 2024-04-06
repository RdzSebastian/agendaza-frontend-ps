import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EventInput } from '@fullcalendar/core'
import { lastValueFrom } from 'rxjs'
import { REST_SERVER_URL } from 'src/util/configuration'
import { CryptoJsImpl } from 'src/util/cryptoJsImpl'
import { AgendaCard, AgendaCardJSON } from '../model/Agenda'


@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private httpClient: HttpClient) {}

  async getListaAgendaByUsuarioId(usuarioId : number) {
    const listaItem$ = this.httpClient.get<AgendaCardJSON[]>(REST_SERVER_URL + '/getListaAgendaByUsuarioId/' + usuarioId)
    const listaItem = await lastValueFrom(listaItem$)
    return listaItem.map((agendaCard) => AgendaCard.fromJson(agendaCard))
  }

  async getAllEventosForAgendaByEmpresaId(empresaId : number) {
    const listaItem$ = this.httpClient.get<EventInput[]>(REST_SERVER_URL + '/getAllEventosForAgendaByEmpresaId/' + empresaId)
    return await lastValueFrom(listaItem$)
  }

  setEmpresaId(empresaId : number){
    const empresaIdEncrypt = CryptoJsImpl.encryptData(empresaId)

    localStorage.setItem('empresa', empresaIdEncrypt)
  }

  getEmpresaId(){
    if(localStorage.getItem('empresa') != null){
      return CryptoJsImpl.decryptData(localStorage.getItem('empresa'))
    }
    return ""
  }

  removeEmpresaId(){
    localStorage.removeItem('empresa')
  }

}
