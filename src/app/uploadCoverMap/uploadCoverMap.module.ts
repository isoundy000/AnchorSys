import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadCoverMapComponent } from './uploadCoverMap.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UploadCoverMapComponent],
  bootstrap:[UploadCoverMapComponent],
  exports:[UploadCoverMapComponent]
})
export class UploadCoverMapModule { }