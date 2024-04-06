import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom, map } from 'rxjs'
import { Usuario, UsuarioJSON, UsuarioLoginJSON } from '../model/Usuario'
import { REST_SERVER_URL } from 'src/util/configuration'
import { CryptoJsImpl } from 'src/util/cryptoJsImpl'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  async login(usuarioLoginJson: UsuarioLoginJSON) {

    const credentials = this.httpClient.post(REST_SERVER_URL + '/login', usuarioLoginJson, {
      observe: 'response'
    }).pipe(map(async (response: HttpResponse<any>) => {
      const headers = response.headers

      const username = CryptoJsImpl.encryptData(usuarioLoginJson.username)
      localStorage.setItem('session', username)

      const bearerToken = headers.get("Authorization")!
      const token = bearerToken.replace('Bearer ', '')

      localStorage.setItem('token', token)
    }))
    return credentials
  }

  logout(){
    localStorage.clear()
  }

  getToken(){
    return localStorage.getItem('token')
  }

  static getToken(){
    return localStorage.getItem('token')
  }

  async getUsuarioId() {
    const username = CryptoJsImpl.decryptData(localStorage.getItem('session'))
    const usuario$ = this.httpClient.put<number>(REST_SERVER_URL + '/getUsuarioIdByUsername', username)
    return await lastValueFrom(usuario$)
  }

  async getUsuarioLogueado() {
    const usuario$ = this.httpClient.get<UsuarioJSON>(REST_SERVER_URL + '/getUsuario/' + this.getUsuarioId())
    return Usuario.fromJson(await lastValueFrom(usuario$))
  }

}
