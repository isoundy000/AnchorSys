import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input()
  name = "";
  @Input()
  value = "";
  @Input()
  desc = "";
  @Input()
  maxLength: number = 50;
  @Output()
  changeEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  onchange() {
    this.changeEvent.emit(this.value);
  }

  ngOnInit() {
  }

}
