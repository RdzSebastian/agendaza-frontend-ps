import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { REST_SERVER_URL } from 'src/util/configuration';
import { PanelAdmin } from '../model/Configuracion';
import { UsuarioEmpresa } from '../model/Usuario';
import { AgendaService } from './agenda.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor(private httpClient: HttpClient, private agendaService : AgendaService) { }

  async getAllCantidadesForPanelAdminByEmpresaId() : Promise<PanelAdmin> {
    const configuracion$ = this.httpClient.get<PanelAdmin>(REST_SERVER_URL + '/getAllCantidadesForPanelAdminByEmpresaId/' + this.agendaService.getEmpresaId())
    return await lastValueFrom(configuracion$)
  }

}
