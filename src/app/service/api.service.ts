import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { UploadService } from "app/service/upload.service";
declare var layer: any;
@Injectable()
export class ApiService {

    public choiceScenicSpotEvent: EventEmitter<any> = new EventEmitter();

    constructor(private http: Http, private upload: UploadService) { }

    private post(data: ParamData): Observable<ResponseInfo> {
        let host = "/serverH5";
        let bodyObj = {
            cmd: data.cmd,
            param: JSON.stringify(data.param)
        };
        let body = `cmd=${data.cmd}&param=${JSON.stringify(data.param)}`;
        console.log("send infomation : " + body);

        if (data.loadingState) {
            //加载动画
            layer.load();
        }

        if (data.file) {
            return this.upload.makeFileRequest(host, bodyObj, data.file, data.fieldname)
                .map(res => JSON.parse(res))
                .filter((res: ResponseInfo) => {
                    console.log(res);
                    //隐藏加载动画
                    layer.closeAll('loading');
                    switch (res.State) {
                        case 1:
                        case 2:
                            layer.alert(res.Msg, { icon: 2 })
                            break;
                        case 3:
                            layer.alert(res.Msg, { icon: 2 })
                            window.open('/', '_top');
                            break;
                    }
                    return true;
                });
        } else {
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.post(
                host,
                body,
                { headers: myHeaders }
            )
                .map(res => res.json() as ResponseInfo)
                .filter((res: ResponseInfo) => {
                    console.log(res);
                    //隐藏加载动画
                    layer.closeAll('loading');
                    switch (res.State) {
                        case 1:
                        case 2:
                            layer.alert(res.Msg, { icon: 2 })
                            break;
                        case 3:
                            layer.alert(res.Msg, { icon: 2 })
                            window.open('/', '_top');
                            break;
                    }
                    return true;
                });
        }
    }

    //登录
    login(param: LoginParam) {
        return this.post(new ParamData("LoginBySms", param));
    }
    //发送验证码
    sendCode(param: LoginParam) {
        return this.post(new ParamData("SmsULogin", param));
    }
    //获取专辑类型
    getAlbumType() {
        return this.post(new ParamData("AddAlbumTypeList", {}));
    }
    //获取专辑列表
    getAlbumList(param: AlbumListParam) {
        return this.post(new ParamData("H5MyAlbumList", param));
    }
    //添加修改专辑
    editAlbum(param: EditAlbumParam, file?: File[]) {
        return this.post(new ParamData("UserAddAlbum", param, file));
    }
    //获取专辑详情
    getAlbumInfo(param: AlbumInfoParam) {
        return this.post(new ParamData("UserEditGetAlbum", param));
    }
    //添加专辑 搜索地区或景区
    searchAlbum(param: SearchAlbumParam) {
        return this.post(new ParamData("UserAddAlbumSearch", param));
    }
    //获取专辑音频
    getAlbumAudio(param: AudioAlbumParam) {
        return this.post(new ParamData("H5MyAudioByAlbumId", param));
    }
    //获取音频语种
    getLanguage() {
        return this.post(new ParamData("SysLang", {}));
    }
    //用户专辑上传音频
    uploadAlbumAudio(param: UploadAudioParam, file?: File[]) {
        return this.post(new ParamData("UserUpLoadAudio", param, file, "Voices"));
    }
    //根据sid获取景点
    getScenicSpot(param: ScenicSpotParam) {
        return this.post(new ParamData("UserLoadAudioGetScenic", param));
    }
    //根据sid添加景点
    addScenicSpot(param: AddScenicSpotParam, file?: File[]) {
        return this.post(new ParamData("UserAddScenic", param, file));
    }
}
export class ParamData {
    /**
     *
     */
    constructor(
        public cmd: string,
        public param: any,
        public file?: File[],
        public fieldname: string = "default",
        public errorMsg?: boolean,
        public loadingState?: boolean
    ) {
        this.errorMsg = true;
        this.loadingState = true;
    }
}
export class ResponseInfo {
    /**
    *
    */
    constructor(
        public State?: number,
        public Msg?: string,
        public Value?: any,
        public TotalNumber?: number
    ) {
    }
}
export class LoginParam {
    public Phone?: number;
    public Code?: number;
}
export class AlbumListParam {
    public PageIndex: number=1;
    public PageSize: number=10;
    private Guid: string = localStorage["GUID"] || "";
    public CType?: string;
    public Name?: string = "";
}
export class EditAlbumParam {
    public Name: string = "";
    private Guid: string = localStorage["GUID"] || "";
    public Introduce: string;
    public Id: number;
    public Price: string;
    public CTypeId: number;
    public RId: number;
    public RType: number;
}
export class AlbumInfoParam {
    private Guid: string = localStorage["GUID"] || "";
    public Id: number;
}
export class SearchAlbumParam {
    public KeyWord: string;
    public CType: number;
}
export class AudioAlbumParam {
    public AlbumId: number;
    private Guid: string = localStorage["GUID"] || "";
    public PageIndex: number;
    public PageSize: number;
}
export class UploadAudioParam {
    public RId: number;
    private Guid: string = localStorage["GUID"] || "";
    public Id: number;
    public Name: string;
    public Lang: number;
    public SId: number;
}
export class ScenicSpotParam {
    private Guid: string = localStorage["GUID"] || "";
    public SId: number;
    public AlbumId: number;
}
export class AddScenicSpotParam {
    public SName: string;
    private Guid: string = localStorage["GUID"] || "";
    public Introduce: string;
    public Id: number;
}