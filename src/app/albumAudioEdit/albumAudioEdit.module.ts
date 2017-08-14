import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumAudioEditComponent } from './albumAudioEdit.component';
import { AlbumAudioEditRoutes } from "app/albumAudioEdit/albumAudioEdit.routing";
import { DropDownListModule } from "app/dropDownList/dropDownList.module";
import { InputModule } from "app/input/input.module";
import { InputCompletionModule } from "app/inputCompletion/inputCompletion.module";
import { ButtonModule } from "app/button/button.module";
import { ScenicChoiceComponent } from "app/scenicChoice/scenicChoice.component";
import { ScenicEditComponent } from "app/scenicEdit/scenicEdit.component";
import { TextareaModule } from "app/textarea/textarea.module";
import { UploadCoverMapModule } from "app/uploadCoverMap/uploadCoverMap.module";

@NgModule({
  declarations: [
    AlbumAudioEditComponent,
    ScenicChoiceComponent,
    ScenicEditComponent,
  ],
  imports: [
    CommonModule,
    AlbumAudioEditRoutes,
    DropDownListModule,
    InputModule,
    ButtonModule,
    TextareaModule,
    UploadCoverMapModule
  ]
})
export class AlbumAudioEditModule { }