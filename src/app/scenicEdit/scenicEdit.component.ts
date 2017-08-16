import { Component, OnInit } from '@angular/core';
import { ApiService, AddScenicSpotParam } from "app/service/api.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
declare var layer: any;
@Component({
  selector: 'app-scenicEdit',
  templateUrl: './scenicEdit.component.html',
  styleUrls: ['./scenicEdit.component.css']
})
export class ScenicEditComponent implements OnInit {

  sid: number;
  addScenicSpotParam: AddScenicSpotParam = new AddScenicSpotParam();
  file: File[];
  constructor(
    private api: ApiService,
    private routerInfo: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sid = this.routerInfo.snapshot.params["id"];
  }
  submit() {
    this.addScenicSpotParam.Id = this.sid;
    this.api.addScenicSpot(this.addScenicSpotParam, this.file).subscribe(res => {
      layer.alert(res.Msg);
      window.history.back();
    });
  }
  cancel() {
    window.history.back();
  }

}
