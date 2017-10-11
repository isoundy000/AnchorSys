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
  sendMsg: string = "发送验证码";
  constructor(
    private router: Router,
    private api: ApiService,
    private ls: LocalStorage
  ) {

  }

  ngOnInit() {
    
  }

  login() {
    if(!this.loginParam.Phone){
      layer.alert("请输入手机号！",{icon:2});
      return;
    }
    if(!this.loginParam.Code){
      layer.alert("请输入验证码！",{icon:2});
      return;
    }
    this.api.login(this.loginParam).subscribe((res: ResponseInfo) => {
      if (res.Value) {
        this.ls.set("GUID", res.Value.Guid);
        this.router.navigate(['albumList',1]);
      }
    });
  }
  sendNumber: number = 60;
  sendCodeClick() {
    if (this.sendNumber != 60) {
      return;
    }
    this.sendNumber--;
    this.sendMsg = `重新发送${this.sendNumber}s`;
    this.api.sendCode(this.loginParam).subscribe(res => {
      layer.msg(res.Msg);
      let tempInterval = setInterval(() => {
        this.sendNumber--;
        this.sendMsg = `重新发送${this.sendNumber}s`;
        if (this.sendNumber == 0) {
          clearInterval(tempInterval);
          this.sendMsg = "发送验证码";
          this.sendNumber = 60;
        }
      }, 1000);
    });
  }
}


