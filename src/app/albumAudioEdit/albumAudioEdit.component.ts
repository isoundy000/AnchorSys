import { Component, OnInit, DoCheck } from '@angular/core';
import { ApiService, AlbumInfoParam, AudioAlbumParam, UploadAudioParam } from "app/service/api.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs/Rx";
declare var layer: any;
@Component({
  selector: 'app-albumAudioEdit',
  templateUrl: './albumAudioEdit.component.html',
  styleUrls: ['./albumAudioEdit.component.css']
})
export class AlbumAudioEditComponent implements OnInit {
  private rejectStates = [
    { Id: 1, Name: '审核中', Color: "#f5973b" },
    { Id: 2, Name: '通过', Color: "#48c056" },
    { Id: 3, Name: '驳回', Color: "#EA0000" }
  ];
  rejectStateGet(id) {
    return this.rejectStates.find((item) => item.Id == id);
  }
  albumInfoParam: AlbumInfoParam = new AlbumInfoParam();
  audioAlbumParam: AudioAlbumParam = new AudioAlbumParam();
  uploadAlbumAudioParam: UploadAudioParam;
  albumData: any = {
    array: [],
    id: "Id",
    name: "Name"
  };
  uploadQueues: any[] = [];
  languageData: any = {
    array: [],
    id: "Id",
    name: "Name"
  };
  albumId: number;
  routerChildrenState: boolean = false;
  parentCurrentPage: number = 1;
  constructor(
    private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router
  ) { }
  onActivate(event) {
    console.log(event);
    this.routerChildrenState = true;
  }
  onDeactivate(event) {
    console.log(event);
    this.routerChildrenState = false;
  }
  ngOnInit() {
    this.albumId = this.routerInfo.snapshot.params["id"].split('-')[0];
    this.parentCurrentPage = this.routerInfo.snapshot.params["id"].split('-')[1];
    this.initLanguage();
    this.initAlbumInfo(this.albumId);
    this.initAudioList(this.albumId);
  }
  initAlbumInfo(id: number) {
    this.albumInfoParam.Id = id;
    this.api.getAlbumInfo(this.albumInfoParam).subscribe(res => {
      this.albumData = res.Value;
    });
  }

  initAudioList(id: number) {
    this.audioAlbumParam.AlbumId = id;
    this.audioAlbumParam.PageIndex = 1;
    this.audioAlbumParam.PageSize = 9999;
    this.api.getAlbumAudio(this.audioAlbumParam).subscribe(res => {
      if (!res.Value) {
        return;
      }
      res.Value.forEach(item => {
        this.uploadAlbumAudioParam = new UploadAudioParam();
        this.uploadAlbumAudioParam.Name = item.Name;
        this.uploadAlbumAudioParam.Id = item.Id;
        this.uploadAlbumAudioParam.RId = this.albumId;
        this.uploadAlbumAudioParam.SId = item.SId;
        this.uploadAlbumAudioParam.Lang = item.LId;
        this.uploadQueues.push({
          param: this.uploadAlbumAudioParam,
          oldParamString: JSON.stringify(this.uploadAlbumAudioParam),
          languageData: this.languageData,
          descLang: item.LName,
          sName: item.SName,
          rejectState: item.RejectState
        });
      });
    });
  }
  initLanguage() {
    this.api.getLanguage().subscribe(res => {
      this.languageData = {
        id: "Id",
        name: "Name",
        array: res.Value
      }
    });
  }
  languageClicked(languageItem, item) {
    item.param.Lang = languageItem.Id;
  }
  uploadQueueDel(item, index) {
    this.uploadQueues.splice(index, 1);
  }
  choiceScenicSpot(item) {
    this.router.navigateByUrl(`albumAudioEdit/${this.albumId}-${this.parentCurrentPage}/scenicChoice/${this.albumData.SId}`);
    let subscripion: Subscription = this.api.choiceScenicSpotEvent.subscribe(res => {
      item.sName = res.Name;
      item.param.SId = res.Id;
      subscripion.unsubscribe();
    });
  }
  filechange(event) {
    let files: File[] = event.srcElement.files;
    for (let i = 0; i < files.length; i++) {
      this.uploadAlbumAudioParam = new UploadAudioParam();
      this.uploadAlbumAudioParam.Name = files[i].name.substring(0, files[i].name.lastIndexOf("."));
      this.uploadAlbumAudioParam.RId = this.albumId;
      this.uploadAlbumAudioParam.SId = 0;
      this.uploadAlbumAudioParam.Id = 0;
      this.uploadQueues.push({
        param: this.uploadAlbumAudioParam,
        oldParamString: "",
        file: files[i],
        languageData: this.languageData,
        uploadState: false
      });
    }
  }
  cancel() {
    this.router.navigate(['albumList', this.parentCurrentPage]);
  }
  //上传全部
  uploadAll(index) {
    let item = this.uploadQueues[index];
    if (!item) {
      return;
    }
    if (!item.param.Name) {
      item.Msg = "请填写音频名称";
      return;
    }
    if (this.albumData.AlbumTypeId == 1) {
      if (item.param.SId == 0) {
        item.Msg = "请选择所属景点";
        return;
      }
    }
    if (!item.param.Lang) {
      item.Msg = "请选择音频语种";
      return;
    }
    if (item.file) {
      item.Msg = "正在上传，请勿关闭此页面……"
      this.api.uploadAlbumAudio(item.param, [item.file]).subscribe(res => {
        item.Msg = res.Msg;
        if (res.State == 0) {
          item.param.Id = res.Value;
          item.file = null;
          item.uploadState = true;
          this.uploadAll(index + 1);
        }
      });
    } else {
      if (item.oldParamString != JSON.stringify(item.param)) {
        item.Msg = "正在上传，请勿关闭此页面……"
        this.api.uploadAlbumAudio(item.param).subscribe(res => {
          item.Msg = res.Msg;
          if (res.State == 0) {
            item.param.Id = res.Value;
            item.uploadState = true;
            this.uploadAll(index + 1);
          }
        });
      } else {
        item.uploadState = true;
        this.uploadAll(index + 1);
      }
    }
  }

  tempInterval: any;
  submit() {
    this.uploadAll(0);
    //-------------------------------------------------------------------------------------------
    if (this.tempInterval) {
      clearInterval(this.tempInterval);
    }
    //检查是否全部上传完成
    this.tempInterval = setInterval(() => {
      try {
        var BreakException = {};
        this.uploadQueues.forEach((item, index) => {
          if (!item.uploadState) {
            throw BreakException;
          }
          if (this.uploadQueues.length - 1 == index) {
            clearInterval(this.tempInterval);
            layer.msg("已全部上传成功!");
            this.router.navigate(['albumList', this.parentCurrentPage]);
          }
        });
      } catch (error) {
        if (error !== BreakException) throw error;
      }
    }, 1000);

  }
}
