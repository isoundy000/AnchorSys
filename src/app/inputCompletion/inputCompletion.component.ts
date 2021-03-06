import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService, SearchAlbumParam } from "app/service/api.service";
declare var layer: any;
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
  value = "";
  @Input()
  desc: string = "";
  @Input()
  ctype: number = -88;
  searchAlbumParam: SearchAlbumParam = new SearchAlbumParam();
  listData?: any;
  //回掉函数
  @Output()
  notifyEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private api: ApiService) {

  }

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
    if (this.ctype == -88||this.ctype ==undefined) {
      layer.alert("请先选择专辑类型！", { icon: 7 });
      return;
    }
    this.searchAlbumParam.KeyWord = this.value;
    this.searchAlbumParam.CType = this.ctype;
    this.api.searchAlbum(this.searchAlbumParam).subscribe((res) => {
      if (!res.Value) {
        return;
      }
      this.listData = {
        id: "Id",
        name: "Name",
        array: res.Value
      }
      this.isShow = true;
    });
  }
}
