import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var layer: any;
@Component({
  selector: 'app-uploadCoverMap',
  templateUrl: './uploadCoverMap.component.html',
  styleUrls: ['./uploadCoverMap.component.css']
})
export class UploadCoverMapComponent {

  @Input()
  name = "name init";
  @Input()
  imgSrc = "";
  //限制宽度
  @Input()
  width: number;
  //限制高度
  @Input()
  height: number;
  //强制限制图片尺寸开关
  @Input()
  force: boolean = false;
  private file: File[];
  state: boolean = false;
  @Output()
  changeFileEvent: EventEmitter<File[]> = new EventEmitter<File[]>();
  constructor() { }

  filechange(event) {
    //文件限制提示语
    var showMsg = function (itemSize, maxSize) {
      if (itemSize / 1024 >= maxSize) {
        layer.alert("文件大小必须小于" + (maxSize / 1024).toFixed(0) + "M", { icon: 7 });
        return false;
      }
      return true;
    }

    this.file = event.srcElement.files;
    if (!showMsg(this.file[0].size, 1024 * 3)) {
      return;
    }
    let $this = this;
    var reader = new FileReader();

    reader.onload = onLoadFile;
    reader.readAsDataURL(this.file[0]);


    function onLoadFile(event) {
      var img = new Image();
      img.onload = onLoadImage;
      img.src = event.target.result;
    }
    function backFile(result) {
      $this.imgSrc = result;
      $this.changeFileEvent.emit($this.file);
    }
    function onLoadImage() {
      let $thisImg = this;
      if ($this.width && $this.height) {
        if ($this.width != this.width || $this.height != this.height) {
          if ($this.name) {
            $this.name += ">";
          } else {
            $this.name = "";
          }
          //强制限制图片尺寸开关
          if ($this.force == true) {
            layer.alert($this.name + "尺寸必须" + $this.width + "x" + $this.height + "，请注意！", { icon: 7 }, function (index) {
              layer.close(index);
            });
          } else {
            //询问框
            layer.confirm($this.name + "尺寸建议" + $this.width + "x" + $this.height + "，确定上传吗？", {
              btn: ['确定', '取消'],
              cancel: function () {

              }
            }, function (index) {
              layer.close(index);
              backFile($thisImg.src);
            }, function () {

            });
          }
        } else {
          backFile($thisImg.src);
        }
      } else {
        backFile($thisImg.src);
      }
    }
  }

  mouseenter() {
    this.state = true;
  }
  mouseleave() {
    this.state = false;
  }
  delImg() {
    this.imgSrc = "";
  }

}
