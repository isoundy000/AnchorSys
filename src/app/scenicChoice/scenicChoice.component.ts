import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, ScenicSpotParam } from "app/service/api.service";

@Component({
  selector: 'app-scenicChoice',
  templateUrl: './scenicChoice.component.html',
  styleUrls: ['./scenicChoice.component.css']
})
export class ScenicChoiceComponent implements OnInit {

  scenicSpotParam: ScenicSpotParam = new ScenicSpotParam();
  listData: any[];
  sid: number;
  albumId: number;
  constructor(
    private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sid = this.routerInfo.snapshot.params["id"];
    let routerCurrent: any = this.router.routerState;
    this.albumId = routerCurrent.parent(this.routerInfo).snapshot.params["id"]
    this.initScenicSpotList(this.sid);
  }
  initScenicSpotList(sid: number) {
    this.scenicSpotParam.SId = sid;
    this.scenicSpotParam.AlbumId = this.albumId;
    this.api.getScenicSpot(this.scenicSpotParam).subscribe(res => {
      this.listData = res.Value;
    });
  }
  selectItem(item) {
    this.api.choiceScenicSpotEvent.emit(item);
    window.history.back();
  }

}
