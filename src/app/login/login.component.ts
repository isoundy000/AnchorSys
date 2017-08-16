import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService, ParamData, ResponseInfo, LoginParam } from "app/service/api.service";
import { LocalStorage } from "app/service/local.storage";
declare var layer: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginParam: LoginParam = new LoginParam();
  constructor(
    private router: Router,
    private api: ApiService,
    private ls: LocalStorage
  ) {

  }

  ngOnInit() {
    this.loginParam.Phone = 15010156268;
    this.loginParam.Code = 8888;
  }

  login() {
    this.api.login(this.loginParam).subscribe((res: ResponseInfo) => {
      if (res.Value) {
        this.ls.set("GUID", res.Value.Guid);
        this.router.navigate(['albumList']);
      }
    });
  }
  sendCodeClick() {
    this.api.sendCode(this.loginParam).subscribe(res => {
      layer.msg(res.Msg);
    });
  }
}


