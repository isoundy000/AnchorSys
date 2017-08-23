import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
declare var laypage: any, $: any;
@Injectable()
export class UiService {
    /*
               table 生成分页
               id html标签id
               count 数据总数
               pageSize 每页显示数量
               curr 1
           */
    generationPage(id, count, pageSize, curr = 1): Observable<number> {
        return Observable.create(observer => {
            if ($("#" + id).size() > 0) {
                if ($("#" + id)[0].innerHTML && curr != 1) {
                    return;
                }
                //分页控件
                laypage({
                    cont: id,
                    curr: curr,
                    pages: Math.ceil(count / pageSize),//总页数
                    // skip: true, //是否开启跳页
                    skin: '#29bcf5',
                    jump: function (obj, first) {
                        if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                            observer.next(obj.curr);
                            //    observer.complete();
                        }
                    }
                });
            }
        });
    }
}
