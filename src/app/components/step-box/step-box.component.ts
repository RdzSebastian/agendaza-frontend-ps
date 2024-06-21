import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StepBox } from 'src/app/model/StepBox';

@Component({
  selector: 'app-step-box',
  templateUrl: './step-box.component.html',
  styleUrls: ['./step-box.component.css']
})
export class StepBoxComponent implements OnInit {

  @Input()
  stepBox! : StepBox
  
  @Input()
  currentStep!: number;

  @Output() 
  outputStep = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  isStep(id :number){
    return this.currentStep == id
  }
  
  isValid(): boolean {
    return (this.stepBox === undefined) ?  true : this.stepBox.valid!
  }

  goToStep(id: number){
    console.log("step to:" + id)
    this.outputStep.emit(id);
  }
}
