import { Component, OnInit } from '@angular/core';
import { ApiService, ParamData, AlbumListParam } from "app/service/api.service";
import { LocalStorage } from "app/service/local.storage";
import { UiService } from "app/service/ui.service";
import { flyIn } from "app/animations/fly-In";

@Component({
  selector: 'app-albumList',
  templateUrl: './albumList.component.html',
  styleUrls: ['./albumList.component.css'],
  animations: [flyIn]
})
export class AlbumListComponent implements OnInit {

  constructor(
    private api: ApiService,
    private ui: UiService,
    private ls: LocalStorage
  ) {
  
  }
  albumDesc: string = "";
  albumTypeData: any = {
    array: [],
    id: "Id",
    name: "Name"
  };

  ngOnInit() {
    this.initAlbumType();
    this.listParamsInit();
    this.datalist();
  }

  listParam: AlbumListParam = new AlbumListParam();
  listData: any[];
  listCount: number = 0;
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
  listParamsInit() {
    this.albumDesc = "全部";
    this.listParam.PageIndex = 1;
    this.listParam.PageSize = 10;
    this.listParam.CType = "0";
    this.listParam.Name = "";
  }
  datalist(pageIndex: number = 1) {
    if (pageIndex) {
      this.listParam.PageIndex = pageIndex;
    } else {
      this.listParam.PageIndex = 1;
    }
    this.api.getAlbumList(this.listParam).subscribe(res => {

      this.listCount = res.TotalNumber;
      if (this.listCount == 0) {
        this.listData = [];
      } else {
        this.listData = res.Value;
        if (this.listParam.PageIndex == 1) {
          this.ui.generationPage('listDataPage', this.listCount, this.listParam.PageSize).subscribe(nextPage => {
            this.datalist(nextPage);
          });
        }
      }
    });
  }
  searchList() {
    this.datalist();
  }

  albumTypeClicked(item: any) {
    this.listParam.CType = item.Id;
    this.albumDesc = item.LName;
  }
}

