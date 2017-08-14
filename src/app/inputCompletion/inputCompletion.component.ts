import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService, SearchAlbumParam } from "app/service/api.service";

@Component({
  selector: 'app-inputCompletion',
  templateUrl: './inputCompletion.component.html',
  styleUrls: ['./inputCompletion.component.css']
})
export class InputCompletionComponent implements OnInit {

  isShow: boolean = false;
  //名称
  @Input()
  name: string = "";
  //提示语
  @Input()
  value: string = "";
  @Input()
  desc: string = "";
  @Input()
  ctype: number;

  searchAlbumParam: SearchAlbumParam = new SearchAlbumParam();
  listData?: any;
  //回掉函数
  @Output()
  notifyEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.listData = {
      array: []
    }
  }

  mouseenter() {
    // this.isShow = true;
  }
  mouseleave() {
    this.isShow = false;
  }
  selectItem(item) {
    this.value = item[this.listData.name];
    this.isShow = false;
    this.notifyEvent.emit(item);
  }
  search() {
    this.searchAlbumParam.KeyWord = this.value;
    this.searchAlbumParam.CType = this.ctype;
    this.api.searchAlbum(this.searchAlbumParam).subscribe((res) => {
      this.listData = {
        id: "Id",
        name: "Name",
        array: res.Value
      }
      this.isShow=true;
    });
  }
}
