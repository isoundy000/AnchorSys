import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-uploadCoverMap',
  templateUrl: './uploadCoverMap.component.html',
  styleUrls: ['./uploadCoverMap.component.css']
})
export class UploadCoverMapComponent implements OnInit {

  @Input()
  name = "name init";
  @Input()
  imgSrc = "";
  
  constructor() { }

  ngOnInit() {
  }

}
