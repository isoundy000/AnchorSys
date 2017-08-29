import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ApiService, EditAlbumParam, AlbumInfoParam } from "app/service/api.service";
declare var layer: any;
@Component({
  selector: 'app-albumEdit',
  templateUrl: './albumEdit.component.html',
  styleUrls: ['./albumEdit.component.css']
})
export class AlbumEditComponent implements OnInit {

  albumTypeData: any = {
    array: [],
    id: "Id",
    name: "Name"
  };
  file: File[];
  albumImage: any[] = [];
  desc: string;//专辑所属类型描述
  albumDesc: string = "全部";//专辑类型所属描述
  ctype: number;//所属类型Id
  parentCurrentPage: number = 1;
  editAlbumParam: EditAlbumParam = new EditAlbumParam();
  albumInfoParam: AlbumInfoParam = new AlbumInfoParam();
  constructor(
    private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    let id = this.routerInfo.snapshot.params["id"].split('-')[0];
    this.parentCurrentPage = this.routerInfo.snapshot.params["id"].split('-')[1];
    this.editAlbumParam.Id = id;
    if (id != 0) {
      this.initAlbumInfo(id);
    } else {
      this.initAlbumType();
    }
  }
  initAlbumInfo(id: number) {
    this.albumInfoParam.Id = id;
    this.api.getAlbumInfo(this.albumInfoParam).subscribe(res => {
      if (res.State == 0) {
        this.editAlbumParam.Name = res.Value.AlbumName;
        this.editAlbumParam.CTypeId = 0;
        this.editAlbumParam.Id = res.Value.Id;
        this.editAlbumParam.Introduce = res.Value.AlbumIntroduce;
        this.editAlbumParam.Price = res.Value.AudioPrice;
        this.editAlbumParam.RId = 0;
        this.editAlbumParam.RType = 0;
        this.albumImage.push(res.Value.AlbumImage);
        this.desc = res.Value.SName;
        this.albumDesc = res.Value.AlbumTypeName;
        this.ctype = res.Value.BindCType;
      }
    });
  }
  //获取专辑类型
  initAlbumType() {
    this.api.getAlbumType().subscribe(res => {
      if (res.Value) {
        this.albumTypeData = {
          id: "Id",
          name: "LName",
          array: res.Value
        }
      }
    });
  }
  albumTypeClicked(item: any) {
    this.editAlbumParam.CTypeId = item.Id;
    this.ctype = item.BindCType;
    this.desc = item.BindDesc;
  }
  //专辑所属 回调事件
  albumTheClicked(item: any) {
    this.editAlbumParam.RId = item.Id;
    this.editAlbumParam.RType = item.RType;
  }
  submit() {
    if (this.editAlbumParam.CTypeId == undefined) {
      layer.alert("请先选择专辑类型！", { icon: 7 });
      return;
    }
    if (this.editAlbumParam.RType == undefined) {
      layer.alert("请先选择专辑所属！", { icon: 7 });
      return;
    }
    if (!this.editAlbumParam.Name) {
      layer.alert("请填写专辑名称！", { icon: 7 });
      return;
    }
    if (!this.editAlbumParam.Introduce) {
      layer.alert("请填写专辑简介！", { icon: 7 });
      return;
    }
    if (!this.albumImage && !this.file) {
      layer.alert("请选择专辑封面！", { icon: 7 });
      return;
    }
    if (this.editAlbumParam.Price == undefined) {
      layer.alert("请填写声音单价！", { icon: 7 });
      return;
    }


    this.api.editAlbum(this.editAlbumParam, this.file).subscribe(res => {
      if (res.State == 0) {
        layer.msg(res.Msg);
        this.router.navigate(['albumList', this.parentCurrentPage]);
      }
    });
  }
  cancel() {
    this.router.navigate(['albumList', this.parentCurrentPage]);
  }
}
