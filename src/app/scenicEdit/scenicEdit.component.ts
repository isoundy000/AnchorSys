import { Component, OnInit } from '@angular/core';
import { ApiService, AddScenicSpotParam } from "app/service/api.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

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
  filechange(event) {
    this.file = event.srcElement.files;
  }
  submit() {
    this.addScenicSpotParam.Id = this.sid;
    this.api.addScenicSpot(this.addScenicSpotParam, this.file).subscribe(res => {
      alert(res.Msg);
      window.history.back();
    });
  }
  cancel() {
    window.history.back();
  }

}
