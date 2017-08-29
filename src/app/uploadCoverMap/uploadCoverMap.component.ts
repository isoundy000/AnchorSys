import { Component, Input, Output, EventEmitter } from '@angular/core';
declare var layer: any;
@Component({
  selector: 'app-uploadCoverMap',
  templateUrl: './uploadCoverMap.component.html',
  styleUrls: ['./uploadCoverMap.component.css']
})
export class UploadCoverMapComponent {

  @Input()
  maxFileLength: number = 1;
  @Input()
  name = "name init";
  @Input()
  imgSrc = [];
  //限制宽度
  @Input()
  width: number;
  //限制高度
  @Input()
  height: number;
  //强制限制图片尺寸开关
  @Input()
  force: boolean = false;
  private outfiles: File[]=[];
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

    let files = event.srcElement.files;
    if (!showMsg(files[0].size, 1024 * 3)) {
      return;
    }
    let $this = this;
    var reader = new FileReader();

    reader.onload = onLoadFile;
    reader.readAsDataURL(files[0]);


    function onLoadFile(event) {
      var img = new Image();
      img.onload = onLoadImage;
      img.src = event.target.result;
    }
    function backFile(result) {
      $this.imgSrc.push(result);
      //----------------------------------
      $this.outfiles.push(files[0]);
      $this.changeFileEvent.emit($this.outfiles);
    }
    function onLoadImage() {
      let $thisImg = this;
      if ($this.width && $this.height) {
        if ($this.width != this.width || $this.height != this.height) {
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
  delImg(index) {
    this.imgSrc.splice(index, 1);
    this.outfiles.splice(index, 1);
    this.changeFileEvent.emit(this.outfiles);
  }

}
