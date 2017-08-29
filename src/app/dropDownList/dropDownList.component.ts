import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropDownList',
  templateUrl: './dropDownList.component.html',
  styleUrls: ['./dropDownList.component.css']
})
export class DropDownListComponent implements OnInit {

  isShow: boolean = false;
  //名称
  @Input()
  name: string = "";
  //提示语
  @Input()
  desc: string;
  //输入数据
  @Input()
  listData: any = {
    array: [],
    id: "Id",
    name: "Name"
  };
  //回掉函数
  @Output()
  notifyEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }

  ngOnInit() {
    // this.listData = {
    //   id: "Id",
    //   name: "Name",
    //   array: [
    //     { Id: 1, Name: "类型1" },
    //     { Id: 2, Name: "类型2" },
    //     { Id: 3, Name: "类型3" },
    //     { Id: 4, Name: "类型4" }
    //   ]
    // }
  }

  mouseenter() {
    if (this.listData.array.length > 0) {
      this.isShow = true;
    }
  }
  mouseleave() {
    this.isShow = false;
  }
  selectItem(item) {
    this.desc = item[this.listData.name];
    this.isShow = false;
    this.notifyEvent.emit(item);
  }
}
