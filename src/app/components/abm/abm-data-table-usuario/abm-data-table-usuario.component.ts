import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-abm-data-table-usuario',
  templateUrl: './abm-data-table-usuario.component.html'
})
export class AbmDataTableUsuarioComponent implements OnInit {

  usuarioId : number = 0

  @Input()
  listaItems : Array<any> = []

  @Input()
  listaHeader : Array<String> = []

  @Input()
  currentRegistro : number = 0

  @Input()
  buscar = ''

  @Output() 
  outputEditar = new EventEmitter<number>();

  @Output() 
  outputEditarPassword = new EventEmitter<number>();

  constructor(private loginService : LoginService) { }

  async ngOnInit(): Promise<void> {
    this.usuarioId = await this.loginService.getUsuarioId()
  }

  editar(id : number){
    this.outputEditar.emit(id);
  }

  editarPassword(id : number){
    this.outputEditarPassword.emit(id);
  }

  isUsuarioEditable(item : any){
    // El usuarioId == item.id no anda, seria para editar el usuario que es uno mismo
    return item.username != '' || item.id === this.usuarioId
  }
}
