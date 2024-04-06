import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericItem } from 'src/app/model/GenericItem';

@Component({
  selector: 'app-modal-lista',
  templateUrl: './modal-lista.component.html'
})
export class ModalListaComponent implements OnInit {

  @Input()
  modal = false

  @Input()
  titulo = ""

  @Input()
  listaGeneric : Array<GenericItem> = []

  @Output() 
  outputChangeModal = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

  changeModal(){
    this.modal = !this.modal
    this.outputChangeModal.emit(this.modal)
  }

}
