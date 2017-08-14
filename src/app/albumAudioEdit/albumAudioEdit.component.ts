import { Component, OnInit } from '@angular/core';
import { ApiService, AlbumInfoParam, AudioAlbumParam, UploadAudioParam } from "app/service/api.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-albumAudioEdit',
  templateUrl: './albumAudioEdit.component.html',
  styleUrls: ['./albumAudioEdit.component.css']
})
export class AlbumAudioEditComponent implements OnInit {
   albumInfoParam: AlbumInfoParam = new AlbumInfoParam();
   audioAlbumParam: AudioAlbumParam = new AudioAlbumParam();
   uploadAlbumAudioParam: UploadAudioParam;
   albumData?: any;
   uploadQueues: any[] = [];
   languageData: any;
   albumId: number;
   routerChildrenState: boolean = false;
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
    this.albumId = this.routerInfo.snapshot.params["id"];
    this.initAlbumInfo(this.albumId);
    this.initAudioList(this.albumId);
    this.initLanguage();
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
      res.Value.forEach(item => {
        this.uploadAlbumAudioParam = new UploadAudioParam();
        this.uploadAlbumAudioParam.Name = item.Name;
        this.uploadAlbumAudioParam.Id = item.Id;
        this.uploadAlbumAudioParam.RId = this.albumId;
        this.uploadAlbumAudioParam.SId = item.SId;
        this.uploadAlbumAudioParam.Lang = item.LId;
        this.uploadQueues.push({
          param: this.uploadAlbumAudioParam,
          languageData: this.languageData,
          descLang: item.LName,
          sName: item.SName
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
    this.router.navigate(['albumAudioEdit/' + this.albumId + '/scenicChoice', this.albumData.SId]);
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
      this.uploadAlbumAudioParam.Name = files[i].name;
      this.uploadAlbumAudioParam.RId = this.albumId;
      this.uploadAlbumAudioParam.SId = 0;
      this.uploadAlbumAudioParam.Id = 0;
      this.uploadQueues.push({
        param: this.uploadAlbumAudioParam,
        file: files[i],
        languageData: this.languageData
      });
    }
  }
  cancel() {
    this.router.navigate(['albumList']);
  }
  submit() {
    this.uploadQueues.forEach((item) => {
      if (item.file) {
        this.api.uploadAlbumAudio(item.param, [item.file]).subscribe(res => {
          item.Msg = res.Msg;
          if (res.State == 0) {
            item.Id = res.Value;
          }
        });
      } else {
        this.api.uploadAlbumAudio(item.param).subscribe(res => {
          item.Msg = res.Msg;
          if (res.State == 0) {
            item.Id = res.Value;
          }
        });
      }
    });
  }
}
