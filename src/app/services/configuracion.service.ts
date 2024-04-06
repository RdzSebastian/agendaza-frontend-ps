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

  constructor(private httpClient: HttpClient, private agendaService : AgendaService, private loginService : LoginService) { }

  async getAllCantidadesConfiguracionByUsuarioIdAndEmpresaId() : Promise<PanelAdmin> {
    const usuarioEmpresa = new UsuarioEmpresa(await this.loginService.getUsuarioId(), this.agendaService.getEmpresaId())
    const configuracion$ = this.httpClient.put<PanelAdmin>(REST_SERVER_URL + '/getAllCantidadesForPanelAdminByUsuarioIdAndEmpresaId', usuarioEmpresa )
    return await lastValueFrom(configuracion$)
  }

}
