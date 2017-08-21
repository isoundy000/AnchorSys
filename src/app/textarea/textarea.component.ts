import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {

  constructor() { }

  @Input()
  name: string = "";
  @Input()
  value = "";
  @Input()
  maxLength: number = 300;
  @Output()
  changeEvent: EventEmitter<any> = new EventEmitter<any>();

  onchange() {
    this.changeEvent.emit(this.value);
  }

  ngOnInit() {
  }

}
